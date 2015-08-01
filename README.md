# stackable-fetcher
A middleware-based HTTP client library based on [node-fetch](https://github.com/bitinn/node-fetch).

- [Install](#install)
- [Usage](#usage)
- [Middleware](#middleware)
  - [Specs](#specs)
  - [Example](#example)

## Install
```
npm install --save-dev stackable-fetcher
```

## Usage
See [docs](http://r7kamura.github.io/stackable-fetcher/) for more details.

```js
var Fetcher = require('stackable-fetcher').Fetcher;
new Fetcher()
  .get('https://github.com/')
  .then(function(response) { return response.text(); })
  .then(function(body) { console.log(body); });
```

## Middleware
stackable-fetcher is easily extended via middleware stack.

### Specs
- A middleware is a constructor function that takes an application and options
- A middleware instance has `#call(environment)` property that returns a promise

### Example middlewares
- [JsonRequestEncoder](/src/json-request-encoder.js)
- [JsonResponseDecoder](/src/json-response-decoder.js)
- [RequestLogger](/src/request-logger.js)
- [ResponseLogger](/src/response-logger.js)
- [AwsSignerV4](https://github.com/r7kamura/aws-signer-v4)

### Example usage
```js
var stackableFetcher = require('stackable-fetcher');
var Fetcher = stackableFetcher.Fetcher;
var RequestLogger = stackableFetcher.RequestLogger;
var ResponseLogger = stackableFetcher.ResponseLogger;

new Fetcher().
  use(RequestLogger).
  use(ResponseLogger).
  get('https://api.github.com/users/r7kamura');
```
