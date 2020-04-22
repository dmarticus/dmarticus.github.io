---
layout: post
---
# Putting Finite-State Machines to Work: on writing Hangman in Functional Scala

TODO HEADER PIC OF MY CONSOLE

I was inspired to write a game after learning about a concept known as a [finite-State machine](https://en.wikipedia.org/wiki/Finite-state_machine) (FSM).  In system architecture terms, a finite-state machine is the process of expressing simple subsets of the system as predefined states and inputs that let your state transition from one state to another. It's a popular model for modeling computation, and also serves as an excellent mechanism for expression sequential game logic.  

When combined with the concept of [Algebraic Data Types](https://en.wikipedia.org/wiki/Algebraic_data_type) (ADTs), which are a useful model of expressing composite types of data (such as a singly linked list), we have in our programming toolkit two simple building blocks that can give us the tools for building relatively robust games. In this post, I want to talk about how I wrote a game of Hangman using FP Scala libraries and building on the concepts of FSM and ADTs as my foundation.


## High-level Design

Our game might look something like this.

TODO UML DIAGRAM

Where the dark dots represent the start (left) and end (right) nodes, squares express game states, and lines symbolise inputs.

## Primitives

To start working on the problem, we first need to define some general rules that will form the foundation of our ADTs. Let’s start by defining some game *primitives*.  Now, *primitive* is a term thrown around a lot in programming lingo, but at its core a *primitive* is a single, distinct, and meaningful element, which means that by definition, it can’t be empty (because empty values are not distinct).  [Cats](https://typelevel.org/cats/) gives us some useful tools for representing primitives, so let’s express some of ours using the [NonEmptyList](https://typelevel.org/cats/datatypes/nel.html) type.

```scala
type Letter = Char
type Word = NonEmptyList[Letter]
```

Since Hangman involves the user guessing these letters and word, we need to also express the concept of guessing in this game, which can again be modeled using an ADT since guesses compose of letters and words.

```scala
case class Guesses(
  letters: Option[NonEmptySet[Letter]], 
  words: Option[NonEmptySet[Word]]
)
```

Another aspect of Hangman is the idea of losing because of too many wrong guesses.  In a game, these types of losses can be modeled as how many "lives" a player may have, so for my game I also wanted to include this concept.  In our case, here's how we modeled the concept of "lives" in code.

```scala
object Lives {
  type Lives = Int
  val MAX = 10
  val MIN = 1
// when you run out of lives, you lose
  def sub(lives: Lives): Option[Lives] = if(lives - 1 > 0) {
    Some(lives - 1)
  } else None
   val max: Lives = MAX
   val min: Lives = MIN
   val avg: Lives = (MAX + MIN) / 2
}
```

This concept of lives can be tied into the difficulty of the game, since one way to measure difficulty is to measure how many lives you have to work with when solving the game (another way is to use more complex or hard-to-guess words, but that's not a problem I tackled in this implementation).  Here's the ADT that represents difficulty.

```scala
sealed trait DifficultyLevel {
  def lives: Lives
}
case object Easy extends DifficultyLevel {
  val lives: Lives = Lives.max
}
case object Medium extends DifficultyLevel {
  val lives: Lives = Lives.avg
}
case object Hard extends DifficultyLevel {
  val lives: Lives = Lives.min
}
```

## Adding additional building blocks

To enable gameplay, we need to have a a way to get new words, display the game on the console, parse the inputs from the user, and decode these inputs to the program.  Since these actions all represent side-effect free functions, we can model this using a [Tagless](https://scalac.io/tagless-final-pattern-for-scala-code/) (meaning we can declare this gameplay as a generic, type-safe DSL) approach.  These actions can be modeled with the following ADTs in Scala.

```scala
trait WordService[F[_]] {
  def getWord: F[Word]
}
trait Console[F[_]] {
  def readLine: F[String]
  def printLine(text: String): F[Unit]
}
trait Encoder[T] { // to parse inputs from the user
  def encode(value: T): String
}
trait Decoder[T] { // to decode user inputs to the program
  def decode(value: String): Option[T]
}
```

Now, to model this service as an *FSM* (which requires states and inputs to run), we need to introduce the concepts of need *GameStates* and *Inputs*.

*Game States* can be expressed as a sealed trait (remember, we're trying to write a DSL) of all possible *states*.

```scala
sealed trait GameState
case object Init extends GameState
case object Exit extends GameState
case class Game(lives: Lives, word: Word, guesses: Guesses) extends GameState
case class Win(word: Word) extends GameState
case class Lose(word: Word, guesses: Guesses) extends GameState
```

*Game Inputs* can be expressed as a sealed trait of all *inputs* with the assumption that *game-related inputs* are another subset.

```scala
sealed trait Input
case object ExitGame extends Input
case class Restart(difficulty: DifficultyLevel) extends Input
sealed trait GameInput extends Input
case class GuessWord(guess: Word) extends GameInput
case class GuessLetter(guess: Letter) extends GameInput
```

## Dealing with complex mechanics

So as demonstrated, it wasn't too complex to model most of the game states with pretty straightforward data structures.  However, the one input that we need to handle that is more complex than the other types of inputs in the concept of modeling *Guesses*.  Here's an exmaple of how to model guessing:

```scala
object Guesses {
  // simple way to create an empty instance
  val empty = Guesses(None, None)
  
  def apply(letter: Letter): Guesses = Guesses(Some(NonEmptySet.of(letter)), None)
  
  def apply(word: Word): Guesses = Guesses(None, Some(NonEmptySet.of(word)))
  
  def addLetter(guesses: Guesses, letter: Letter): Guesses =
    guesses.copy(letters = guesses.letters.map(_.add(letter))
      .orElse(Some(NonEmptySet.of(letter))))
    
  def addWord(guesses: Guesses, word: Word): Guesses =
    guesses.copy(words = guesses.words.map(_.add(word))
      .orElse(Some(NonEmptySet.of(word))))
    
  // by adding a letter do the letter we have form a word we are looking for
  def isWordGuessedCorrectly(word: Word, letter: Letter, guesses: Guesses): Boolean = 
    word.toNes.toSortedSet.subsetOf(guesses.letters.map(_.add(letter))
    .getOrElse(NonEmptySet.of(letter)).toSortedSet)
    
  def alreadyContains(guesses: Guesses, letter: Letter): Boolean = 
    guesses.letters.exists(_.exists(_ == letter))
  
  def alreadyContains(guesses: Guesses, word: Word): Boolean = 
    guesses.words.exists(_.exists(_ == word))

  def alreadyContains(guesses: Guesses, gameInput: GameInput): Boolean = gameInput match {
    case GuessLetter(letter) => alreadyContains(guesses, letter)
    case GuessWord(word) => alreadyContains(guesses, word)
  }
}
```

## Game Logic

Finally, with all of our inputs and states taken care of, we can start working on the game logic that takes in the inputs and transitions through the various states.  To do this, we need a simple way to combine *State* and *Input*.  By using the FSM of this game as the model, we can say that the fundamentals of this game can be described as `(GameState, Input) => F[GameState]` , where `F` is a context that holds information about `WordService`/`Console`.  In addition, we can take this a little further, as two types of gameplay that are modeled by `F` can be separated into two subsets. In the case of Hangman, we have an `outerGame` (the process of choosing to start, restart, or exit the game) and the `innerGame` (the process of playing a game of Hangman).  These two game subsets can be modeled this:

```scala
def outerGame[F[_] : Applicative : WordService]: PartialFunction[(GameState, Input), F[GameState]] = {
  // loads new word from `WordService` and starts a new game with selected difficulty
  case (_, Restart(difficulty)) => WordService[F].getWord.map(Game(difficulty.lives, _, Guesses.empty))
  // exits the game by setting the state to `Exit`
  case (_, ExitGame) => Applicative[F].pure(Exit)
}
```

and

```scala
val innerGame: PartialFunction[(GameState, Input), GameState] = {
  // when user guesses unguessed symbol or word then run
  case (game@Game(lives, word, guesses), input: GameInput) if !Guesses.alreadyContains(guesses, input) => input match {
    // winning the game
    case GuessWord(guessWord) if word == guessWord => Win(word)
    case GuessLetter(letter) if Guesses.isWordGuessedCorrectly(word, letter, guesses) => Win(word)
    
    // guessing words
    case GuessWord(guessWord) if word != guessWord && Lives.sub(lives).isDefined => 
      game.copy(lives = Lives.sub(lives).get, guesses = Guesses.addWord(guesses, guessWord))
      
    case GuessWord(guessWord) if word != guessWord && Lives.sub(lives).isEmpty => 
      Lose(word, guesses = Guesses.addWord(guesses, guessWord))
    
    // guessing letters
    case GuessLetter(letter) if !word.toNes.contains(letter) && Lives.sub(lives).isDefined => 
      game.copy(lives = Lives.sub(lives).get, guesses = Guesses.addLetter(guesses, letter))
    
    case GuessLetter(letter) if !word.toNes.contains(letter) && Lives.sub(lives).isEmpty => 
      Lose(word, Guesses.addLetter(guesses, letter))
    
    case GuessLetter(letter) if word.toNes.contains(letter) => 
      game.copy(guesses = Guesses.addLetter(guesses, letter))
  }
}
```

Finally, we need to combine these two layers:

```scala
def hangmanFSM[F[_] : Applicative : WordService](state: GameState, input: Input): F[GameState] =
  outerGame orElse (innerGame andThen Applicative[F].pure) applyOrElse (
     (state, input), 
     (_: (GameState, Input)) => Applicative[F].pure(state)
  )
    
def hangmanFSM[F[_] : Applicative : WordService](state: GameState, inputText: String): F[GameState] =
  Decoder[Input].decode(inputText)
    .map(input => hangmanFSM(state, input))
    .getOrElse(Applicative[F].pure(state))
```

and represent our game loop:

```scala
def run[F[_] : Monad : WordService](implicit console: Console[F]): F[ExitCode] = {
  import console._
  def transition(state: GameState): F[GameState] = {
    (for {
      _ <- printLine(state.encode)
      gameInput <- readLine
      currentGameState <- hangmanFSM(state, gameInput)
    } yield currentGameState).tailRecM(_.map(game =>
      if (game == Exit)
        Right(game)
      else
        Left(transition(game))
    ))
  }
  transition(Init).map(_ => ExitCode.Success)
}
```

(Note, I've only described the fundamentals of the game operation here, for the other TypeClasses that I used to model some of necessary components that make this game Hangman, you can check out them out in this project's [Github repository](https://github.com/dmarticus/scala-games/tree/master/src/main/scala/games/typeClasses))

## Conclusion

As you can see, Finite State Machines and Algebraic Data Types are a match made in heaven when implementing games. The graphical model can be easily transferred to the code just by transforming States and Inputs to their own ADTs and adding the missing dynamic rules.  If you want to see all of the code implemented in it's meaty glory, check out the full project on [Github](https://github.com/dmarticus/scala-games/tree/master/src/main/scala/games/Hangman).  