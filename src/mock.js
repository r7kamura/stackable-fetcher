var fetch = require('node-fetch');
var Headers = fetch.Headers;
var Response = fetch.Response;
var stream = require('stream');

var Mock = function (application, configuration) {
  this.application = application;
  this.body = configuration.body;
  this.headers = configuration.headers;
  this.size = configuration.size;
  this.status = configuration.status;
  this.timeout = configuration.timeout;
};

Mock.prototype.call = function (environment) {
  return Promise.resolve(
    new Response(
      this._buildReadableStream(),
      {
        headers: this._getHeaders(),
        size: this.size,
        status: this._getStatus(),
        timeout: this.timeout
      }
    )
  );
};

/**
 * @return {stream.Readable}
 */
Mock.prototype._buildReadableStream = function () {
  var readableStream = new stream.Readable();
  readableStream._read = function () {};
  readableStream.push(this.body);
  readableStream.push(null);
  return readableStream;
};

/**
 * @return {fetch.Headers}
 */
Mock.prototype._getHeaders = function () {
  var headers = new Headers(this.headers || {});
  if (headers.has('Content-Length')) {
    headers.set('Content-Length', this.body.length);
  }
  return headers;
};

/**
 * @return {Integer}
 */
Mock.prototype._getStatus = function () {
  return this.status || 200;
};

module.exports = Mock;
