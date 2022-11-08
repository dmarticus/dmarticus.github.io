---
title: "Improving the experience of JSON in Haskell with autodocodec and bifunctors"
layout: post
tags: [haskell, aeson, types, APIs, functional programming, autodocodec, JSON,validation, code tutorials]
post_summary: "Libraries and techniques for improving the developer experience of working with JSON in Haskell"
---
## Introduction

In my [last post](http://www.dylanamartin.com/2022/10/31/use-newtypes-for-typesafe-data-validation-with-aeson.html), I talked about how Haskell `newtypes` are great tools for modeling JSON data when writing API clients in Haskell, and I included some examples on how to write custom `ToJSON` and `FromJSON` methods that incorporated these `newtypes`.  That post generated [some discussion on Lobsters](https://lobste.rs/s/ulqssr/data_validation_haskell_with_newtypes), from which I learned about this interesting library called [autodocodec](https://github.com/NorfairKing/autodocodec#readme).  Given the advantages laid out in that discussion, I decided to give that library a try on my project's codebase, and it worked so well that, so I ended up refactoring basically all of my types to use autodocodec to generate JSON parsers for my types.  In fact, I enjoyed the experience of using autodocodec so much that I thought it was worth blogging about.  

The subsequent code examples will probably make more sense if you have some familiarity with Haskell, JSON, and [aeson](https://hackage.haskell.org/package/aeson).


## Rewriting Haskell types with autodocodec

As [janus mentioned](https://lobste.rs/s/ulqssr/data_validation_haskell_with_newtypes#c_nhn8oj), the big benefit of autodocodec is that it generates _bidirectional_ parsers; rather than requiring the user to write both `ToJSON` and `FromJSON` instances, autodocodec lets you specify a single `HasCodec` instance for a given type, and then you can generate `ToJSON` and `FromJSON` instances from that type through the [DerivingVia](https://ghc.gitlab.haskell.org/ghc/doc/users_guide/exts/deriving_via.html) language extension.  This feature let me rewrite code that looks like this:

```hs
data CreatePayment = CreatePayment
  { createPaymentIdempotencyKey :: !UUID,
    createPaymentKeyId :: !UUID,
    createPaymentMetadata :: !CreatePaymentMetadata,
    createPaymentAmount :: !MoneyAmount,
    createPaymentAutoCapture :: !(Maybe Bool),
    createPaymentVerification :: !VerificationType,
    createPaymentVerificationSuccessUrl :: !(Maybe URI),
    createPaymentVerificationFailureUrl :: !(Maybe URI),
    createPaymentSource :: !PaymentSource,
    createPaymentDescription :: !(Maybe Text),
    createPaymentEncryptedData :: !(Maybe EncryptedData),
    createPaymentChannel :: !(Maybe Text)
  }
  deriving (Eq, Show)

instance FromJSON CreatePayment where
  parseJSON = withObject "CreatePayment" parse
    where
      parse o =
        CreatePayment
          <$> o .: "idempotencyKey"
          <*> o .: "keyId" 
          <*> o .: "metadata" 
          <*> o .: "amount" 
          <*> o .:? "autoCapture" 
          <*> o .: "verification" 
          <*> o .:? "verificationSuccessfulUrl" 
          <*> o .:? "verificationFailureUrl" 
          <*> o .: "source" 
          <*> o .:? "description" 
          <*> o .:? "encryptedData" 
          <*> o .:? "channel"

instance ToJSON CreatePayment where
  toJSON CreatePayment {..} = 
    omitNulls [
      "idempotencyKey" .= createPaymentIdempotencyKey,
      "keyId" .= createPaymentKeyId,
      "metadata" .= createPaymentMetadata, 
      "amount" .= createPaymentAmount, 
      "autoCapture" .= createPaymentAutoCapture,
      "verification" .= createPaymentVerification,
      "verificationSuccessfulUrl" .= createPaymentSuccessfulUrl,
      "verificationFailureUrl" .= createPaymentFailureUrl,
      "source" .= createPaymentSource,
      "description" .= createPaymentDescription,
      "encryptedData" .= createPaymentEncryptedData, 
      "channel" .= createPaymentChannel,
    ]
```

into this:

```hs
data CreatePayment = CreatePayment
  { createPaymentIdempotencyKey :: !UUID,
    createPaymentKeyId :: !UUID,
    createPaymentMetadata :: !CreatePaymentMetadata,
    createPaymentAmount :: !MoneyAmount,
    createPaymentAutoCapture :: !(Maybe Bool),
    createPaymentVerification :: !VerificationType,
    createPaymentVerificationSuccessUrl :: !(Maybe URI),
    createPaymentVerificationFailureUrl :: !(Maybe URI),
    createPaymentSource :: !PaymentSource,
    createPaymentDescription :: !(Maybe Text),
    createPaymentEncryptedData :: !(Maybe EncryptedData),
    createPaymentChannel :: !(Maybe Text)
  }
  deriving (Eq, Show)
  deriving
    ( FromJSON,
      ToJSON
    )
    via (Autodocodec CreatePayment)

instance HasCodec CreatePayment where
  codec =
    object "CreatePayment" $
      CreatePayment
        <$> requiredField' "idempotencyKey" .= createPaymentIdempotencyKey
        <*> requiredField' "keyId" .= createPaymentKeyId
        <*> requiredField' "metadata" .= createPaymentMetadata
        <*> requiredField' "amount" .= createPaymentAmount
        <*> optionalField' "autoCapture" .= createPaymentAutoCapture
        <*> requiredField' "verification" .= createPaymentVerification
        <*> optionalField' "verificationSuccessfulUrl" .= createPaymentVerificationSuccessUrl
        <*> optionalField' "verificationFailureUrl" .= createPaymentVerificationFailureUrl
        <*> requiredField' "source" .= createPaymentSource
        <*> optionalField' "description" .= createPaymentDescription
        <*> optionalField' "encryptedData" .= createPaymentEncryptedData
        <*> optionalField' "channel" .= createPaymentChannel
```

15 fewer lines of code, with no loss of functionality!  And, [as mentioned by danidiaz](https://lobste.rs/s/ulqssr/data_validation_haskell_with_newtypes#c_jzco7g), I don't have to worry about forgetting a constructor.  I also enjoyed the type hints for matching the type of my `codec` to my original type:

![autodocodec constructor error](../../../media/autodocodec_constructor_error.png){:width="740px"}

In addition to `object`, autodocodec has many other methods to generate JSON without needing to hand-write the derivations.  One such example is `shownBoundedEnumCodec`, which lets you generate a codec for a bounded enum type that just takes advantage of existing encoding and decoding behavior provided by a `Show` instance.  Here's how that code looks:

```hs
data SupportedCurrencies = USD | EUR | BTC | ETH
  deriving (Eq, Show, Enum, Bounded)
  deriving
    ( FromJSON,
      ToJSON
    )
    via (Autodocodec SupportedCurrencies)

instance HasCodec SupportedCurrencies where
  codec = shownBoundedEnumCodec
```

(NB: given the the `SupportedCurrencies` type just uses the default `Show` encodings, I could've also just derived a `ToJSON` and `FromJSON` instance for it instead of deriving `ToJSON` and `FromJSON` from the `HasCodec` instance.  However, since many of my other types use the `SupportedCurrencies` type, I need to define a `HasCodec` instance for `SupportedCurrencies` so that I can then define `HasCodec` for the types that _use_ `SupportedCurrencies`.)

(Finally, I just want to note that while I only am working with JSON (via aeson) in my example, autodocodec also supports OpenAPI, Swagger, JSON Schema, and YAML.  It's a great library; thanks [NorfairKing](https://github.com/NorfairKing)!)

## Bifunctor types for parsing more complex JSON types

In addition to taking advantage of various encodings that autodocodec gives me, I also implemented a few other helpers to work with JSON, inspired by my time at [Mercury](https://mercury.com/) (we worked with JSON a lot there and wrote a ton of aeson utilities to make life easier).  I can't remember all of the utils that we wrote a Mercury, but I'd saved one specific type[^bignote] from my time there (I remember saving it the day I learned about it since I enjoyed it so much!) that I reused in my library: `ThisOrThat`

`ThisOrThat` is defined thusly

```hs
-- | Similar to 'Either' but with different 'ToJSON' and 'FromJSON' instances.
-- 'ToJSON' will serialize the payload without adding any kind of tag.
-- 'FromJSON' will first attempt to parse JSON as the first type parameter,
-- and if that fails will then attempt to parse as the second type parameter.
--
-- NB: The order of type parameters make a huge difference!
-- In @'ThisOrThat' A B@, if @A@ is structurally a subtype of @B@, then the
-- parser can never produce a 'That' result! For example, with types
--
-- @
--   data A = A {foo :: String, bar :: Scientific}
--   data B = B {foo :: String, bar :: Scientific, baz :: Bool}
-- @
--
-- @'FromJSON' ('ThisOrThat' A B)@ can never parse a @B@. Any JSON object
-- that includes properties @foo: <string>@ and @bar: <number>@ will parse
-- as an @A@, whether or not the property @baz: <boolean>@ is present. You
-- can fix this by instead using @'ThisOrThat' B A@.
data ThisOrThat a b = This a | That b
  deriving stock (Eq)

instance (ToJSON a, ToJSON b) => ToJSON (ThisOrThat a b) where
  toJSON (This a) = toJSON a
  toJSON (That b) = toJSON b
  toEncoding (This a) = toEncoding a
  toEncoding (That b) = toEncoding b

instance (FromJSON a, FromJSON b) => FromJSON (ThisOrThat a b) where
  parseJSON val = do
    let parsedA = fromJSON val
        parsedB = fromJSON val
    case (parsedA, parsedB) of
      (Success a, _) -> pure $ This a
      (_, Success b) -> pure $ That b
      (Error thisError, Error thatError) ->
        fail $
          fold
            [ "Failed when parsing a ThisOrThat from JSON.\n",
              "Error on the This: " <> thisError <> "\n",
              "Error on the That: " <> thatError
            ]

instance Bifunctor ThisOrThat where
  bimap f _ (This a) = This (f a)
  bimap _ g (That b) = That (g b)
```

Once defined, I can then use to model JSON data that could be an `Either`, only without needing to pattern match against that behavior.

```hs
data TransferData = TransferData
  { transferDataId :: !UUID,
    transferDataSource :: !(ThisOrThat SourceWallet SourceBlockchain),
    transferDataDestination :: !(ThisOrThat DestinationWallet DestinationBlockchain),
    transferDataAmount :: !MoneyAmount,
    transferDataFees :: !MoneyAmount,
    transferDataTransactionHash :: !(Maybe HexString),
    transferDataStatus :: !Status,
    transferDataTransferErrorCode :: !(Maybe TransferErrorCode),
    transferDataCreateDate :: !(Maybe UTCTime)
  }
  deriving (Eq, Show)

-- NB: this doesn't use autodocodec for deriving ToJSON and FromJSON since I'm using the hand-rolled
-- ThisOrThat helper for smartly parsing types.
instance FromJSON TransferData where
  parseJSON = withObject "TransferData" parse
    where
      parse o =
        TransferData
          <$> o .: "id"
          <*> o .: "source"
          <*> o .: "destination"
          <*> o .: "amount"
          <*> o .: "fees"
          <*> o .:? "transactionHash"
          <*> o .: "status"
          <*> o .:? "errorCode"
          <*> o .:? "riskEvaluation"
          <*> o .:? "createDate"
```

Okay, so it's relatively straightforward, but I think it's neat.  The parser errors you get when working with it are pretty great, too.

## Future Work

I'd love to figure out how to get this custom `ThisOrThat` type working with autodocodec so that I can replace this

```hs
instance (ToJSON a, ToJSON b) => ToJSON (ThisOrThat a b) where
  toJSON (This a) = toJSON a
  toJSON (That b) = toJSON b
  toEncoding (This a) = toEncoding a
  toEncoding (That b) = toEncoding b

instance (FromJSON a, FromJSON b) => FromJSON (ThisOrThat a b) where
  parseJSON val = do
    let parsedA = fromJSON val
        parsedB = fromJSON val
    case (parsedA, parsedB) of
      (Success a, _) -> pure $ This a
      (_, Success b) -> pure $ That b
      (Error thisError, Error thatError) ->
        fail $
          fold
            [ "Failed when parsing a ThisOrThat from JSON.\n",
              "Error on the This: " <> thisError <> "\n",
              "Error on the That: " <> thatError
            ]
```

and any hand-rolled aeson parsers that reference types that use `ThisOrThat` (such as `TransferData`) with an approach that uses codecs instead.  However, I tried it once, coded myself into a circle, and then Gave Up to work on more pressing stuff.  If anyone has defined `HasCodec` instances for a bifunctor before, let me know if you have opinions on how to do this!

## Final Note

If you're wondering what all this JSON parsing is for, stay tuned for a library announcement dropping next week!  I'm almost done with the project that uses all of this code and I hope to throw it up on Hackage once I'm done.  It'll have an accompanying blog post, too :)

[^bignote]: Please don't sue me for saving this, Mercury legal.  There's no business logic in the code and this kind of bifunctor instance already exists all over Github.
