---
layout: post
---

# Setting up a Functional Scala REPL with Ammonite

One of my favorite tools in the Scala ecosystem is [Li Haoyi's](https://www.lihaoyi.com/) [Ammonite](https://github.com/lihaoyi/Ammonite), which is a tool that enable first-class
scripting support in Scala.  You can use Ammonite to run Scala code in the REPL, as scripts, or even as a system-level shell as a replacement to something like Bash.  It's a great 
tool and one I use daily when writing Scala.  My favorite thing to use it for is for advanced REPL support -- Scala is my favorite language and Ammonite lets me whip up little Scala
scripts and run them in the command line as I used to do with Python or Node.  

However, as I've been venturing into the functional programming world of Scala, one the challenges I ran into
when running functional scripts in Ammonite was that I constantly had to import Cats, ScalaCheck, ZIO, Monix, etc.  What I wanted was a way to preload all of my relevant FP libraries into 
Ammonite so that each time I ran my code it would recognize the imports.
support.

## Enter Ammonite Predefs

Fortunately, Li Haoyi thought of this use case, and designed Ammonite-REPL to support the concept of a "[predef](https://github.com/lihaoyi/Ammonite/blob/master/internals-docs/predef.md)", 
which is code that Ammonite can run _before_ entering the REPL.  Predefs enable all sorts of useful things, such as:
* Importing implicits that are needed by the REPL to run (such as pretty-printing, type definitions, or library imports)
* Loading common modules if you want them availabel at REPL runtime
* Initialize any common definitions that you may want to use each time the REPL is opened

Ammonite predefs are also dirt-simple to use: all you need to do is create a _predef file_, name it `~/.ammonite/predef.sc`, and add all the relevant imports into it.  For example, 
if you want to use Cats and ZIO in your predef file, you can just add them like such:
```scala
import $ivy.`org.typelevel::cats-core:2.1.1`, cats._, cats.implicits._
import $ivy.`dev.zio::zio:1.0.0-RC18`
...
```

## Usage Example

Once these predefs have been added, you'll be able to initialize a REPL by running `amm` (or whatever your ammonite alias is, `amm` is just the default) and all of the imports will be loaded 
for you before you run any code.  Here's an example of how it changed my workflow.

Before adding predefs:
```scala
github.com/dmarticus » amm
Loading...
Welcome to the Ammonite Repl 1.6.9
(Scala 2.12.8 Java 12.0.2)
If you like Ammonite, please support our development at www.patreon.com/lihaoyi
@ val optionString = "string".some
cmd0.sc:1: value some is not a member of String
val optionString = "string".some
                            ^
Compilation Failed

// RAGE RAGE RAGE

@ import $ivy.`org.typelevel::cats-core:2.1.1`, cats._, cats.implicits._
import $ivy.$                               , cats._, cats.implicits._

@ val optionString = "string".some
optionString: Option[String] = Some("string")
```

After created a `predef` file:
```scala
github.com/dmarticus » amm
Loading...
Compiling /Users/dmarticus/.ammonite/predef.sc
Welcome to the Ammonite Repl 1.6.9
(Scala 2.12.8 Java 12.0.2)
If you like Ammonite, please support our development at www.patreon.com/lihaoyi
@ val optionString = "string".some
optionString: Option[String] = Some("string")
```

 Pretty cool!  

## Conclusion

This is a short post, but hopefully it'll help provide insights into the best way of avoiding manual imports of useful code every time you want to use the Ammonite REPL.  Also, if you want to see
an example of my `~/.ammonite/predef.sc` file, I'll provide it here:
```scala
import $ivy.`org.typelevel::cats-core:2.1.1`, cats._, cats.implicits._
import $ivy.`org.scalatest::scalatest:3.0.8`,org.scalatest._
import $ivy.`org.scalacheck::scalacheck:1.14.0`
import $ivy.`io.monix::monix:3.1.0`
import $ivy.`dev.zio::zio:1.0.0-RC18`
import $ivy.`org.typelevel::cats-effect:2.1.2`
import $ivy.`com.github.chocpanda::scalacheck-magnolia:0.3.1`
import $ivy.`io.chrisdavenport::cats-scalacheck:0.2.0`
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.duration._
import scala.concurrent.Future
import scala.util.{Failure, Success}
import scala.concurrent.Await
import org.scalacheck.{Arbitrary, Gen}
import org.scalacheck.magnolia._
def randomObj[T: Arbitrary] = implicitly[Arbitrary[T]].arbitrary.sample.get
```

I also have my `predef` file saved as a [gist](https://gist.github.com/dmarticus/c31102dfd39d32fb492eb06a84080941).  I hope this helps somebody!