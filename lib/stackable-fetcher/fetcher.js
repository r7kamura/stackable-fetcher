var fetch = require('node-fetch');

var Fetcher = function() {};

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

Fetcher.prototype._fetch = function(request) {
  return fetch(
    request.url,
    {
      headers: request.headers,
      method: request.method
    }
  );
};

Fetcher.prototype._process = function(method, url, body, headers) {
  return this._fetch(
    {
      headers: headers,
      method: method,
      body: body,
      url: url
    }
  );
};

module.exports = Fetcher;
