import fetch from 'node-fetch'
import Request from './request'

/**
 * @class An HTTP Client
 * @property {Object} adapter
 * @property {Array.<object>} middlewares
 * @example
 * new Fetcher().get('https://github.com').then(function (response) {
 *   console.log(response.status);
 *   return response;
 * });
 */
export default class Fetcher {
  /**
   * @param {Object=} options
   */
  constructor(options) {
    this.adapter = (options || {}).adapter || {
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
    this.middlewares = (options || {}).middlewares || [];
  }

  /**
   * @param {String}
   * @param {Object=}
   * @param {Object=}
   * @return {Promise}
   */
  delete(url, parameters, headers) {
    return this._process('DELETE', url, null, headers, parameters);
  }

  /**
   * @param {String}
   * @param {Object=}
   * @param {Object=}
   * @return {Promise}
   */
  get(url, parameters, headers) {
    return this._process('GET', url, null, headers, parameters);
  }

  /**
   * @param {String}
   * @param {Object=}
   * @param {Object=}
   * @return {Promise}
   */
  head(url, parameters, headers) {
    return this._process('HEAD', url, null, headers, parameters);
  }

  /**
   * @param {String}
   * @param {*=}
   * @param {Object=}
   * @return {Promise}
   */
  options(url, body, headers) {
    return this._process('OPTIONS', url, body, headers);
  }

  /**
   * @param {String}
   * @param {*=}
   * @param {Object=}
   * @return {Promise}
   */
  patch(url, body, headers) {
    return this._process('PATCH', url, body, headers);
  }

  /**
   * @param {String}
   * @param {*=}
   * @param {Object=}
   * @return {Promise}
   */
  post(url, body, headers) {
    return this._process('POST', url, body, headers);
  }

  /**
   * @param {String}
   * @param {*=}
   * @param {Object=}
   * @return {Promise}
   */
  put(url, body, headers) {
    return this._process('PUT', url, body, headers);
  }

  /**
   * @param {Middleware}
   * @param {Object=}
   * @return {Fetcher}
   */
  use(middleware, options) {
    return new this.constructor({
      adapter: this.adapter,
      middlewares: this.middlewares.concat({
        middleware: middleware,
        options: options
      })
    });
  }

  /**
   * @private
   * @param {Object}
   * @return {Object}
   */
  _buildApplication(request) {
    let application = this.adapter;
    let i = this.middlewares.length;
    while (i--) {
      application = new this.middlewares[i].middleware(
        application,
        this.middlewares[i].options
      );
    }
    return application;
  }

  /**
   * @private
   * @return {Object}
   */
  _getApplication() {
    this._application = this._application || this._buildApplication();
    return this._application;
  }

  /**
   * @private
   * @param {String}
   * @param {String}
   * @param {String=}
   * @param {Object=}
   * @param {Object=}
   * @return {Promise}
   */
  _process(method, url, body, headers, parameters) {
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
  }
}
