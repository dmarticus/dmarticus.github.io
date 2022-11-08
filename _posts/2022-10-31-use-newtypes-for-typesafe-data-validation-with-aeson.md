---
title: "Data validation in Haskell with newtypes, smart constructors, and aeson"
layout: post
tags: [haskell, aeson, types, APIs, functional programming, validation, code tutorials]
post_summary: "I'm working on a library that is wrapping an HTTP API, and I'm heavily leveraging aeson for working with the JSON returned and sent to that API. This post describes how I implemented field validation on the type level using Haskell newtypes and hand-rolled ToJSON and FromJSON instances."
---

This post assumes some familiarity with Haskell, JSON, and [aeson](https://hackage.haskell.org/package/aeson).

## Introduction

Haskell is one of my favorite programming languages, and one of the reasons I like it so much is how nicely it supports modeling string-like data with `newtypes` when doing web programming. Much of web development involves dealing with strings (idk why exactly but I imagine mostly because JavaScript and the fact that most web communication protocols use strings as primitives), but not all strings are created equal!  Strings can be emails, or addresses, or routing numbers, or can be a range of possible enums, and just using type `String` to capture all of the variance is a poor data model: it doesn't have the granularity needed to distinguish between different use cases.

This is where using [`newtypes`](https://wiki.haskell.org/Newtype) can help.  Using `newtypes` (and their associated [smart constructors](https://wiki.haskell.org/Smart_constructors)) to model string-like data is a nice approach for adding granularity to strings to help differentiate string-like types from each other.  Furthermore, the enhanced data modeling provided by newtypes can be extended (via aeson) all the way to JSON parsing, which makes it possible to write a JSON API client in Haskell that provides a type-safe parsing experience with ergonomic errors and a high degree of confidence with respect to data validation.  It's even easy to write tests!  To explain more about what I mean, let's dive into an example of some data modeling I'm doing for an upcoming project that takes advantage of `newtypes` smart constructors, and custom JSON parsing with aeson.

## How I use newtypes and smart constructors

There's a bunch of prior art on newtypes and smart constructors that's worth reading (like [this one](https://www.parsonsmatt.org/2017/10/11/type_safety_back_and_forth.html) from Matt Parsons), but that's outside the scope of my example. In my case, when I talk about `newtypes` and smart constructors, I'm talking about doing something like this:

```hs
newtype RoutingNumber = RoutingNumber {unRoutingNumber :: Text}
```

and then this

```hs
-- constraints on routing numbers
routingNumberRegex :: Regex
routingNumberRegex = [re|^[0-9]{9}$|]

-- smart constructor that makes it impossible 
-- to create routing numbers that don't follow the constraints
mkRoutingNumber :: Text -> Maybe RoutingNumber
mkRoutingNumber t =
  if t =~ routingNumberRegex
    then Just (RoutingNumber t)
    else Nothing
```

Now, I can ensure that any instance of `RoutingNumber` types must obey the routing number constraints.  Using this approach, I can take an API that sends a response body that looks like this:

```hs
data BeneficiaryBankDetails = BeneficiaryBankDetails
  { beneficiaryBankDetailsName :: Text,
    beneficiaryBankDetailsSwiftCode :: Text,
    beneficiaryBankDetailsRoutingNumber :: Text,
    beneficiaryBankDetailsAccountNumber :: Text,
    beneficiaryBankDetailsCurrency :: Text,
    beneficiaryBankDetailsAddress :: Text,
    beneficiaryBankDetailsCity :: Text,
    beneficiaryBankDetailsPostalCode :: Text,
    beneficiaryBankDetailsCountry :: Text
  }
```

and model it like this

```hs
data BeneficiaryBankDetails = BeneficiaryBankDetails
  { beneficiaryBankDetailsName :: Text,
    beneficiaryBankDetailsSwiftCode :: SwiftCode,
    beneficiaryBankDetailsRoutingNumber :: RoutingNumber,
    beneficiaryBankDetailsAccountNumber :: AccountNumber,
    beneficiaryBankDetailsCurrency :: AllowedCurrencies,
    beneficiaryBankDetailsAddress :: AddressLine,
    beneficiaryBankDetailsCity :: City,
    beneficiaryBankDetailsPostalCode :: PostalCode,
    beneficiaryBankDetailsCountry :: Country
  }
```

by adding similar constraints to the other fields. This approach lets me modes the data in a way that is both more readable and type-safe, and any subsequent instance of me using these types in my code will require to me obey these constraints, which will make it harder for me to write bugs. As someone who enjoys guardrails in programming because I'm dumb, this is awesome.

(Aside: For [`Quasiquotation`](https://wiki.haskell.org/Quasiquotation) fans, I can even write cool helper methods that let me write literal IDs that type-check at compile time, in case I want to use my types in tests later and avoid something unsafe like `fromJust`):

```hs
compileRoutingNumber :: QuasiQuoter
compileRoutingNumber =
  QuasiQuoter
    { quoteExp = compileRoutingNumber',
      quotePat = error "RoutingNumber is not a pattern; use routingNumberToText instead",
      quoteDec = error "routingNumber is not supported at top-level",
      quoteType = error "routingNumber is not supported as a type"
    }
  where
    compileRoutingNumber' :: String -> Q Exp
    compileRoutingNumber' s = case mkRoutingNumber (T.pack s) of
      Nothing -> fail ("Invalid RoutingNumber: " ++ s ++ ". Must be nine digits, with no other characters.")
      Just routingNumber -> [|routingNumber|]

-- and then

testWireAccountDetails :: WireAccountBodyParams
testWireAccountDetails =
  WireAccountBodyParams
    (UUID "e553417d-fe7a-4b7a-8d06-ff4de80a0d65")
    [compileAccountNumber|446043103366|]
    [compileRoutingNumber|021000021|]
    ( BillingDetails
        "Test Recipient"
        (City "Snoqualmie")
        (ISO3166Alpha2 unitedStatesOfAmerica)
        (AddressLine "6501 Railroad Avenue SE")
        (Just (AddressLine "Room 315"))
        (Just (District "WA"))
        (PostalCode "85283")
    )
    ( BankAddress
        (Just "Test Bank")
        (Just (City "Snoqualmie"))
        (Just (ISO3166Alpha2 unitedStatesOfAmerica))
        (Just (AddressLine "6501 Railroad Avenue SE"))
        (Just (AddressLine "Room 315"))
        (Just (District "WA"))
    )
```

Okay, so this is all well and good for writing application code, but since I'm writing a JSON API and these types represent information that is going to be passed over the wire as JSON, I also want to take advantage of this type safety to when converting this data to and from JSON.  Fortunately, aeson provides extensible parser methods to make this experience excellent.

## Combining newtypes and smart constructors with aeson

Again, there's great prior art on aeson that's worth reading (I liked [this post](https://williamyaoh.com/posts/2019-10-19-a-cheatsheet-to-json-handling.html) from William Yao), but in my example the main benefit of using aeson to interface with JSON APIs in Haskell is that it supports writing custom `ToJSON` and `FromJSON` instances for fine-tuned parsing.  In my case, I have a string enum that looks like this:

```hs
data PayoutErrorCode
  = InsufficientFunds
  | TransactionDenied
  | TransactionFailed
  | TransactionReturned
  | BankTransactionError
  | FiatAccountLimitExceeded
  | InvalidBankAccountNumber
  | InvalidACHRoutingTransitNumber
  | InvalidWireRoutingTransitNumber
  | VendorInactive
  deriving (Eq, Show)
```

If I were derive a default `ToJSON` instance for this type, it would encode thusly

```shell
$ encode TransactionDenied
>>> "\"TransactionDenied\""
```

However, the JSON API I'm working with uses snake case for their enums, so I'd need to write a custom parser to make sure that the `ToJSON` and `FromJSON` parsers work correctly.  Fortunately, I can just extend those methods thusly be writing custom instances of them for my custom types

```hs
instance ToJSON PayoutErrorCode where
  toJSON InsufficientFunds = String "insufficient_funds"
  toJSON TransactionDenied = String "transaction_denied"
  toJSON TransactionFailed = String "transaction_failed"
  toJSON TransactionReturned = String "transaction_returned"
  toJSON BankTransactionError = String "bank_transaction_error"
  toJSON FiatAccountLimitExceeded = String "fiat_account_limit_exceeded"
  toJSON InvalidBankAccountNumber = String "invalid_bank_account_number"
  toJSON InvalidACHRoutingTransitNumber = String "invalid_ach_rtn"
  toJSON InvalidWireRoutingTransitNumber = String "invalid_wire_rtn"
  toJSON VendorInactive = String "vendor_inactive"

instance FromJSON PayoutErrorCode where
  parseJSON (String s) = case T.unpack s of
    "insufficient_funds" -> return InsufficientFunds
    "transaction_denied" -> return TransactionDenied
    "transaction_failed" -> return TransactionFailed
    "transaction_returned" -> return TransactionReturned
    "bank_transaction_error" -> return BankTransactionError
    "fiat_account_limit_exceeded" -> return FiatAccountLimitExceeded
    "invalid_bank_account_number" -> return InvalidBankAccountNumber
    "invalid_ach_rtn" -> return InvalidACHRoutingTransitNumber
    "invalid_wire_rtn" -> return InvalidWireRoutingTransitNumber
    "vendor_inactive" -> return VendorInactive
    _ -> fail "JSON format not expected"
  parseJSON _ = fail "JSON format not expected"
```

Now that we've established that aeson lets me write custom instances of its core methods for my custom types, so it makes sense that I can take advantage of my newtypes and smart constructors to write something like this

```hs
instance FromJSON RoutingNumber where
  parseJSON = withText "RoutingNumber" $ \t ->
    case mkRoutingNumber t of
      Nothing -> fail $ "Invalid RoutingNumber: " ++ T.unpack t
      Just routingNumber -> pure routingNumber
```

Now, my smart constructor for `RoutingNumber`s not only applies to instances in code, but also applies to parsing JSON!  Going back to my original example, I can have a request body like this

```hs
data BeneficiaryBankDetails = BeneficiaryBankDetails
  { beneficiaryBankDetailsName :: Text,
    beneficiaryBankDetailsSwiftCode :: SwiftCode,
    beneficiaryBankDetailsRoutingNumber :: RoutingNumber,
    beneficiaryBankDetailsAccountNumber :: AccountNumber,
    beneficiaryBankDetailsCurrency :: AllowedCurrencies,
    beneficiaryBankDetailsAddress :: AddressLine,
    beneficiaryBankDetailsCity :: City,
    beneficiaryBankDetailsPostalCode :: PostalCode,
    beneficiaryBankDetailsCountry :: Country
  }
```

and when I smart constructors and custom ToJSON and FromJSON instances for every type in that payload, I ensure that not only can I have type safety when using this type in code, but I can have smart JSON parsing for every field in the response!

## Extra benefit: pre-parsed JSON data makes testing easy

As I mentioned in the intro, a nice benefit of this type of data modeling is that it make writing integration tests for this API easy.  Once I've modeled all of my data, I can write a test like this

```hs
it "gets configuration info" $ do
  beneficiaryBankDetails <- integrationTest config manager getBeneficiaryBankDetails
  let Right APIResponse {..} = configurationInfo
```

and _know_ that my API response was parsed correctly; if anything came back from the API that didn't obey the my various type constraints, the request would fail with a `Left`.  My takeaway here is that spending the time modeling the data upfront makes for both increased confidence in functionality _and_ for easy testing.

## Last words

I don't have any sort of deep wisdom to impart here, I mostly just wanted to demonstrate the value of using newtypes, smart constructors, and aeson to write type-safe API client libraries in Haskell.  I think it's worth mentioning that `newtypes` are not perfect tools for type-safe data modeling, as outlined by [John de Goes](https://degoes.net/articles/newtypes-suck) and [Alexis King](https://lexi-lambda.github.io/blog/2020/11/01/names-are-not-type-safety/) (and others, I'm sure), but I do think this approach feel ergonomic and safe.
