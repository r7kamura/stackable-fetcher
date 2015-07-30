var fetch = require('node-fetch');
var Request = require('./request')

/**
 * @class An HTTP Client
 * @property {object} adapter
 * @property {Array.<object>} middlewares
 * @example
 * new Fetcher().get('https://github.com').then(function (response) {
 *   console.log(response.status);
 * });
 */
var Fetcher = function() {
  this.adapter = {
    call: function (environment) {
      return fetch(
        environment.url,
        {
          body: environment.body,
          headers: environment.headers,
          method: environment.method
        }
      );
    }
  };
  this.middlewares = [];
};

/**
 * @param {string}
 * @param {object=}
 * @param {object=}
 * @return {Promise}
 */
Fetcher.prototype.delete = function(url, parameters, headers) {
  return this._process('DELETE', url, null, headers, parameters);
};

/**
 * @param {string}
 * @param {object=}
 * @param {object=}
 * @return {Promise}
 */
Fetcher.prototype.get = function(url, parameters, headers) {
  return this._process('GET', url, null, headers, parameters);
};

/**
 * @param {string}
 * @param {object=}
 * @param {object=}
 * @return {Promise}
 */
Fetcher.prototype.head = function(url, parameters, headers) {
  return this._process('HEAD', url, null, headers, parameters);
};

/**
 * @param {string}
 * @param {*=}
 * @param {object=}
 * @return {Promise}
 */
Fetcher.prototype.options = function(url, body, headers) {
  return this._process('OPTIONS', url, body, headers);
};

/**
 * @param {string}
 * @param {*=}
 * @param {object=}
 * @return {Promise}
 */
Fetcher.prototype.patch = function(url, body, headers) {
  return this._process('PATCH', url, body, headers);
};

/**
 * @param {string}
 * @param {*=}
 * @param {object=}
 * @return {Promise}
 */
Fetcher.prototype.post = function(url, body, headers) {
  return this._process('POST', url, body, headers);
};

/**
 * @param {string}
 * @param {*=}
 * @param {object=}
 * @return {Promise}
 */
Fetcher.prototype.put = function(url, body, headers) {
  return this._process('PUT', url, body, headers);
};

/**
 * @param {Middleware}
 * @param {object=}
 * @return {Fetcher}
 */
Fetcher.prototype.use = function(middleware, options) {
  this.middlewares.push({ middleware: middleware, options: options });
  return this;
};

/**
 * @private
 * @param {object}
 * @return {object}
 */
Fetcher.prototype._buildApplication = function(request) {
  var application = this.adapter;
  var i = this.middlewares.length;
  while (i--) {
    application = new this.middlewares[i].middleware(
      application,
      this.middlewares[i].options
    );
  }
  return application;
};

/**
 * @private
 * @return {object}
 */
Fetcher.prototype._getApplication = function() {
  this._application = this._application || this._buildApplication();
  return this._application;
};

/**
 * @private
 * @param {string}
 * @param {string}
 * @param {string=}
 * @param {object=}
 * @param {object=}
 * @return {Promise}
 */
Fetcher.prototype._process = function(method, url, body, headers, parameters) {
  return this._getApplication().call(
    new Request(
      {
        body: body,
        headers: headers,
        method: method,
        parameters: parameters,
        url: url
      }
    ).toEnvironment()
  );
};

module.exports = Fetcher;
