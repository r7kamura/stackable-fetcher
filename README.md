# stackable-fetcher
A middleware-based HTTP client library.

## Install
```
npm install stackable-fetcher
```

## Usage
```js
var Fetcher = require('stackable-fetcher');
var fetcher = new Fetcher();
fetcher
  .get('https://github.com/')
  .then(function(response) { return response.text(); })
  .then(function(body) { console.log(body); });
```

## API
- `new Fetcher()`
- `Fetcher#delete(url, body, headers) -> Promise`
- `Fetcher#get(url, body, headers) -> Promise`
- `Fetcher#head(url, body, headers) -> Promise`
- `Fetcher#options(url, body, headers) -> Promise`
- `Fetcher#patch(url, body, headers) -> Promise`
- `Fetcher#post(url, body, headers) -> Promise`
- `Fetcher#put(url, body, headers) -> Promise`
- `Fetcher#use(middleware, options) -> Fetcher`

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
RequestLogger.prototype.call = function (request) {
  console.log(request.method);
  return this.application.call(request);
};

var ResponseLogger = function (application) {
  this.application = application;
};
ResponseLogger.prototype.call = function (request) {
  return this.application.call(request).then(function (response) {
    console.log(response.status);
  });
};

var Fetcher = require('stackable-fetcher');
var fetcher = new Fetcher();
fetcher.use(RequestLogger);
fetcher.use(ResponseLogger);
fetcher.get('https://github.com');
```
