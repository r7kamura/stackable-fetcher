var crypto = require('crypto');
var url = require('url');

/**
 * @class
 * @property {string} accessKeyId
 * @property {string} body
 * @property {object} headers
 * @property {string} method
 * @property {string} region
 * @property {string} secretAccessKey
 * @property {string} url
 */
var Sign = function (configuration) {
  this.accessKeyId = configuration.accessKeyId;
  this.body = configuration.body;
  this.headers = configuration.headers;
  this.method = configuration.method;
  this.region = configuration.region;
  this.secretAccessKey = configuration.secretAccessKey;
  this.url = configuration.url;
};

/**
 * @return {string}
 */
Sign.prototype.toString = function () {
  return [
    this._getCredential(),
    this._getSignedHeaders(),
    this._getSignature()
  ].join(', ');
};

/**
 * @return {string}
 */
Sign.prototype._getCanonicalHeaders = function () {
  var self = this;
  return Object.keys(this.headers).map(function (key) {
    return [key.toLowerCase(), self.headers[key].replace(/^\s+|\s+$/g, '')].join(':');
  }).sort().join('\n') + '\n';
};

/**
 * @return {string}
 */
Sign.prototype._getCanonicalHeaderKeys = function () {
  return Object.keys(this.headers).map(function (key) {
    return key.toLowerCase();
  }).sort().join(';')
};

/**
 * @return {string}
 */
Sign.prototype._getCanonicalRequest = function () {
  return [
    this.method,
    this._getPath(),
    this._getQuery(),
    this._getCanonicalHeaders(),
    this._getCanonicalHeaderKeys(),
    this._hexdigest(this.body || '')
  ].join('\n');
};

/**
 * @return {string}
 */
Sign.prototype._getCredential = function () {
  return 'AWS4-HMAC-SHA256 Credential=' + this.accessKeyId + '/' + this._getCredentialString();
};

/**
 * @return {string}
 */
Sign.prototype._getCredentialString = function () {
  return [
    this._getDateInShortString(),
    this.region,
    this._getService(),
    'aws4_request'
  ].join('/');
};

/**
 * @return {Date}
 */
Sign.prototype._getDate = function () {
  var dateHeader = this._getDateHeader();
  if (dateHeader) {
    return new Date(dateHeader);
  } else {
    return new Date();
  }
};

/**
 * @return {string, undefined}
 */
Sign.prototype._getDateHeader = function () {
  return this.headers['X-Amz-Date'] || this.headers['x-amz-date'] || this.headers['X-AMZ-DATE'] ||
    this.headers.Date || this.headers.date || this.headers.DATE;
};

/**
 * @return {string}
 */
Sign.prototype._getDateInString = function () {
  return this._getDate().toISOString().replace(/[:\-]|\.\d{3}/g, '');
};

/**
 * @return {string}
 */
Sign.prototype._getDateInShortString = function () {
  return this._getDateInString().substr(0, 8);
};

/**
 * @return {string}
 */
Sign.prototype._getPath = function () {
  return url.parse(this.url).path;
};

/**
 * @return {string}
 */
Sign.prototype._getQuery = function () {
  return url.parse(this.url).search || '';
};

/**
 * @return {string}
 */
Sign.prototype._getService = function () {
  return url.parse(this.url).host.split('.', 2)[0];
};

/**
 * @return {string}
 */
Sign.prototype._getSignature = function () {
  kDate = this._hmac('AWS4' + this.secretAccessKey, this._getDateInShortString());
  kRegion = this._hmac(kDate, this.region);
  kService = this._hmac(kRegion, this._getService());
  kCredentials = this._hmac(kService, 'aws4_request');
  signature = this._hexhmac(kCredentials, this._getStringToSign());
  return 'Signature=' + signature;
};

/**
 * @return {string}
 */
Sign.prototype._getSignedHeaders = function () {
  return 'SignedHeaders=' + this._getCanonicalHeaderKeys();
};

/**
 * @return {string}
 */
Sign.prototype._getStringToSign = function () {
  return [
    'AWS4-HMAC-SHA256',
    this._getDateInString(),
    this._getCredentialString(),
    this._hexdigest(this._getCanonicalRequest())
  ].join('\n');
};

/**
 * @return {string}
 */
Sign.prototype._hmac = function (key, value) {
  return crypto.createHmac('sha256', key).update(value).digest('binary');
};

/**
 * @return {string}
 */
Sign.prototype._hexdigest = function (key) {
  return crypto.createHash('sha256').update(key).digest('hex');
};

/**
 * @return {string}
 */
Sign.prototype._hexhmac = function (key, value) {
  return crypto.createHmac('sha256', key).update(value).digest('hex');
};

module.exports = Sign;
