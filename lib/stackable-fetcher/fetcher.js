var fetch = require('node-fetch');

var Fetcher = function() {
  this.middlewares = [];
};

Fetcher.prototype.delete = function(url, body, headers) {
  return this._process('DELETE', body, headers);
};

Fetcher.prototype.get = function(url, body, headers) {
  return this._process('GET', url, body, headers);
};

Fetcher.prototype.head = function(url, body, headers) {
  return this._process('HEAD', body, headers);
};

Fetcher.prototype.options = function(url, body, headers) {
  return this._process('OPTIONS', body, headers);
};

Fetcher.prototype.patch = function(url, body, headers) {
  return this._process('PATCH', body, headers);
};

Fetcher.prototype.post = function(url, body, headers) {
  return this._process('POST', body, headers);
};

Fetcher.prototype.put = function(url, body, headers) {
  return this._process('PUT', body, headers);
};

Fetcher.prototype.use = function(middleware, options) {
  this.middlewares.push({ middleware: middleware, options: options });
  return this;
};

Fetcher.prototype._buildApplication = function(request) {
  var application = this._getRootApplication();
  var i = this.middlewares.length;
  while (i--) {
    application = new this.middlewares[i].middleware(
      application,
      this.middlewares[i].options
    );
  }
  return application;
};

Fetcher.prototype._fetch = function(request) {
  return fetch(
    request.url,
    {
      headers: request.headers,
      method: request.method
    }
  );
};

Fetcher.prototype._getApplication = function() {
  this._application = this._application || this._buildApplication();
  return this._application;
};

Fetcher.prototype._getRootApplication = function() {
  var self = this;
  return {
    call: function(request) {
      return self._fetch(request);
    }
  };
};

Fetcher.prototype._process = function(method, url, body, headers) {
  return this._getApplication().call(
    {
      headers: headers,
      method: method,
      body: body,
      url: url
    }
  );
};

module.exports = Fetcher;
