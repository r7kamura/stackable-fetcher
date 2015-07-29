var fetch = require('node-fetch');

var Fetcher = function() {};

Fetcher.prototype.delete = function(url, params, headers) {
  return this._process('DELETE', params, headers);
};

Fetcher.prototype.get = function(url, params, headers) {
  return this._process('GET', url, params, headers);
};

Fetcher.prototype.head = function(url, params, headers) {
  return this._process('HEAD', params, headers);
};

Fetcher.prototype.options = function(url, params, headers) {
  return this._process('OPTIONS', params, headers);
};

Fetcher.prototype.patch = function(url, params, headers) {
  return this._process('PATCH', params, headers);
};

Fetcher.prototype.post = function(url, params, headers) {
  return this._process('POST', params, headers);
};

Fetcher.prototype.put = function(url, params, headers) {
  return this._process('PUT', params, headers);
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

Fetcher.prototype._process = function(method, url, params, headers) {
  return this._fetch(
    {
      headers: headers,
      method: method,
      params: params,
      url: url
    }
  );
};

module.exports = Fetcher;
