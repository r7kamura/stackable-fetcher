var fetch = require('node-fetch');

var Fetcher = function() {};

Fetcher.prototype.delete = function(url, params, headers) {
  return this.fetch('DELETE', params, headers);
};

Fetcher.prototype.fetch = function(httpMethod, url, params, headers) {
  return fetch(
    url,
    {
      headers: headers,
      method: httpMethod
    }
  );
};

Fetcher.prototype.get = function(url, params, headers) {
  return this.fetch('GET', url, params, headers);
};

Fetcher.prototype.head = function(url, params, headers) {
  return this.fetch('HEAD', params, headers);
};

Fetcher.prototype.options = function(url, params, headers) {
  return this.fetch('OPTIONS', params, headers);
};

Fetcher.prototype.patch = function(url, params, headers) {
  return this.fetch('PATCH', params, headers);
};

Fetcher.prototype.post = function(url, params, headers) {
  return this.fetch('POST', params, headers);
};

Fetcher.prototype.put = function(url, params, headers) {
  return this.fetch('PUT', params, headers);
};

Fetcher.prototype.use = function(middleware, options) {
  return this;
};

module.exports = Fetcher;
