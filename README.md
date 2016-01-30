# stackable-fetcher
A middleware-based HTTP client library based on [node-fetch](https://github.com/bitinn/node-fetch).

- [Install](#install)
- [Usage](#usage)
- [Middleware](#middleware)
  - [Specs](#specs)
  - [Example](#example)

## Install
```
npm install stackable-fetcher
```

## Usage
`stackable-fetcher` provides `Fetcher` class.
This class has `#get`, `#post`, `#delete` and other HTTP methods that return `Promise`.

```js
import Fetcher from 'stackable-fetcher'

const fetcher = new Fetcher();
fetcher.get('https://github.com/').then(({ body, headers, status }) => {
  console.log(body);
});
```

## Middleware
stackable-fetcher is easily extended via middleware stack.

### Specs
- A middleware is a constructor function that takes an application and options
- A middleware instance has `#call(request)` property that returns a promise

### Example middlewares
- [JsonRequestEncoder](/src/middlewares/json-request-encoder.js)
- [JsonResponseDecoder](/src/middlewares/json-response-decoder.js)
- [Mock](/src/middlewares/mock.js)
- [RejectLogger](/src/middlewares/reject-logger.js)
- [RequestLogger](/src/middlewares/request-logger.js)
- [ResponseLogger](/src/middlewares/response-logger.js)
- [AwsSignerV4](https://github.com/r7kamura/stackable-fetcher-aws-signer-v4)

### Example usage
```js
import { Fetcher, RequestLogger, ResponseLogger } from 'stackable-fetcher'

new Fetcher()
  .use(RequestLogger)
  .use(ResponseLogger)
  .get('https://api.github.com/users/r7kamura');
```
