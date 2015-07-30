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
var fetcher = new Fetcher();
fetcher
  .get('https://github.com/')
  .then(function(response) { return response.text(); })
  .then(function(body) { console.log(body); });
```

## Middleware
stackable-fetcher is easily extended via middleware stack.

### Specs
- A middleware is a constructor function that takes an application and options
- A middleware instance has `#call(request)` property that returns a promise

### Example
This is a small example that defines logger middlewares.

```js
var RequestLogger = function (application) {
  this.application = application;
};
RequestLogger.prototype.call = function (environment) {
  console.log(environment.method);
  return this.application.call(environment);
};

var ResponseLogger = function (application) {
  this.application = application;
};
ResponseLogger.prototype.call = function (environment) {
  return this.application.call(environment).then(function (response) {
    console.log(response.status);
  });
};

var Fetcher = require('stackable-fetcher');
var fetcher = new Fetcher();
fetcher.use(RequestLogger);
fetcher.use(ResponseLogger);
fetcher.get('https://github.com');
```
