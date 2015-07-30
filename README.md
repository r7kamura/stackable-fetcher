# stackable-fetcher
A middleware-based HTTP client library.

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
var Fetcher = require('stackable-fetcher');
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

### Example
See [examples](/examples) for example middlewares.

```js
new Fetcher();
  .use(RequestLogger)
  .use(ResponseLogger)
  .get('https://api.github.com/users/r7kamura')
```
