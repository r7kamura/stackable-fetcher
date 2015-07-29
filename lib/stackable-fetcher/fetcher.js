var fetch = require('node-fetch');

var Fetcher = function() {};

Fetcher.prototype.delete = function(url, params, headers) {
  return this._fetch('DELETE', params, headers);
};

Fetcher.prototype.get = function(url, params, headers) {
  return this._fetch('GET', url, params, headers);
};

Fetcher.prototype.head = function(url, params, headers) {
  return this._fetch('HEAD', params, headers);
};

Fetcher.prototype.options = function(url, params, headers) {
  return this._fetch('OPTIONS', params, headers);
};

Fetcher.prototype.patch = function(url, params, headers) {
  return this._fetch('PATCH', params, headers);
};

Fetcher.prototype.post = function(url, params, headers) {
  return this._fetch('POST', params, headers);
};

Fetcher.prototype.put = function(url, params, headers) {
  return this._fetch('PUT', params, headers);
};

Fetcher.prototype._fetch = function(httpMethod, url, params, headers) {
  return fetch(
    url,
    {
      headers: headers,
      method: httpMethod
    }
  );
};

module.exports = Fetcher;
