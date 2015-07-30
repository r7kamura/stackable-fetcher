var url = require('url');

/**
 * @class A set of information about an HTTP request
 * @property {Array.<object>}
 * @property {string=} body
 * @property {object=} headers
 * @property {string} method
 * @property {object=} parameters
 * @property {object} url
 */
var Request = function(properties) {
  this._body = properties.body;
  this._headers = properties.headers || {};
  this._method = properties.method;
  this._parameters = properties.parameters || {};
  this._url = properties.url;
};

/**
 * @return {object}
 */
Request.prototype.toEnvironment = function () {
  return {
    body: this._body,
    headers: this._headers,
    method: this._method,
    url: this._getUrl()
  };
};

/**
 * @return {string}
 */
Request.prototype._getUrl = function () {
  var urlObject = url.parse(this._url);
  urlObject.search = null;
  urlObject.query = {};
  var self = this;
  Object.keys(this._parameters).forEach(function (key) {
    urlObject.query[key] = self._parameters[key];
  });
  return url.format(urlObject);
};

module.exports = Request;
