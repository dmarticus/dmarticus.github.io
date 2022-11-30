---
title: "Announcing circle: a Haskell client for Circle's REST API"
layout: post
tags: [haskell, aeson, types, APIs, functional programming, library, announcement, cryptocurrency]
post_summary: "Announcing my first Haskell package: circle!  This package implements a Haskell client for Circle's REST API.  It supports all V1 endpoints to let users create and manage accounts, wallets, and users; and send fiat and cryptocurrency between them.  Hopefully this makes building a Haskell application that uses Circle's REST API much easier!"
---

I'm stoked to announce the initial release of `circle`, an unofficial but feature-complete Haskell client for [Circle's REST API](https://developers.circle.com/developer/v1/docs/introducing-circle-apis).  This library (and usage guide) is available [on Github](https://github.com/dmarticus/circle) and [on Hackage](https://hackage.haskell.org/package/circle).  

`circle` supports calling all of the V1 endpoints enumerated in the [Circle documentation](https://developers.circle.com/developer/v1/docs), and it will support all Circle's [V1.1 features]((https://developers.circle.com/developer/docs)) in the next release (Circle launched their V1.1 API as I was finishing this project, lol).  This project is experimental, please download it and try it out if you're curious, and feel free to reach out to me via email or via the [Github issues](https://github.com/dmarticus/circle/issues) if you spot anything amiss :)

## Usage

You'll need to set the environment variable `CIRCLE_API_KEY` (or something like that) to connect to Circle's sandbox (or production) environments.  Get your keys [here](https://developers.circle.com/docs/api-keys).

```hs
import Circle.Client
import Circle.Types
import Network.HTTP.Client (newManager)
import Network.HTTP.Client.TLS (tlsManagerSettings)
--
main :: IO ()
main = do
  manager <- newManager tlsManagerSettings
  config <- sandboxEnvConfig "CIRCLE_API_KEY"
  result <- circle config manager getConfigurationInfo
  case result of
    Right CircleResponseBody b -> print bs
    Left CircleError e -> print e
```

More documentation on how to use this library can be found on [Github](https://github.com/dmarticus/circle#readme)

## Motivation

At my old job, we considered building a crypto off-ramp for our customers to convert USDC to Fiat currency, and one of the stablecoin APIs we considered for this integration was Circle.  Their REST API documentation was great, but integrating with it would require writing our own library to call it, since there weren't any existing open-source libraries for Circle's API that were written in Haskell (a classic conundrum in the Haskell ecosystem).  Around that time, I got the idea that such a library could be written and open-sourced and hopefully be useful to folks beyond my coworkers.  

Then, after all that, the crypto off-ramp project was shelved, other priorities took over, and I never ended up getting the chance to work on this API client.  However, now that I've had more time on my hands during this little career sabbatical, one of the things I wanted to do during this time off was to make this vision a reality.  I know API clients aren't the most "hard-core" of engineering projects, but building this was a lot of fun, and I hope future Haskell users find it useful.

## Acknowledgements

I wanted to shout out a few people that were instrumental in me getting this project done (some of whom probably didn't even know it).  

First off, I was heavily inspired by the following libraries with respect to how they implemented their API clients, and I used a similar design for mine:

* (my old coworker) Alexey Zabelin's [shipwire](https://www.shipwire.com/) API wrapper: [ballast](https://github.com/alexeyzab/ballast)
* David Johnson's [stripe](https://github.com/dmjio/stripe) API wrapper (from which I'm pretty sure Alexey drew his inspiration).

Next, I wanted to shout out [janus](https://lobste.rs/u/janus) from Lobste.rs for recommending that I try using [autodocodec](https://github.com/NorfairKing/autodocodec#readme) for writing my JSON serialization instances (and I also want to thank [NorfairKing](https://github.com/NorfairKing/) for writing that library!)

Lastly, I wanted to shout out (another old coworker) Vaibhav Sagar for giving me a hand uploading this package to Hackage.