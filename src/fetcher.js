var fetch = require('node-fetch');

/**
 * @class An HTTP Client
 * @property {Array.<object>}
 * @example
 * new Fetcher().get('https://github.com').then(function (response) {
 *   console.log(response.status);
 * });
 */
var Fetcher = function() {
  this.middlewares = [];
};

/**
 * @param {string}
 * @param {*=}
 * @param {object=}
 * @return {Promise}
 */
Fetcher.prototype.delete = function(url, body, headers) {
  return this._process('DELETE', url, body, headers);
};

/**
 * @param {string}
 * @param {*=}
 * @param {object=}
 * @return {Promise}
 */
Fetcher.prototype.get = function(url, body, headers) {
  return this._process('GET', url, body, headers);
};

/**
 * @param {string}
 * @param {*=}
 * @param {object=}
 * @return {Promise}
 */
Fetcher.prototype.head = function(url, body, headers) {
  return this._process('HEAD', url, body, headers);
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

/**
 * @private
 * @param {object}
 * @return {Promise}
 */
Fetcher.prototype._fetch = function(request) {
  return fetch(
    request.url,
    {
      headers: request.headers,
      method: request.method
    }
  );
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
 * @return {object}
 */
Fetcher.prototype._getRootApplication = function() {
  var self = this;
  return {
    call: function(request) {
      return self._fetch(request);
    }
  };
};

/**
 * @private
 * @param {string}
 * @param {string}
 * @param {*=}
 * @param {object=}
 * @return {Promise}
 */
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
