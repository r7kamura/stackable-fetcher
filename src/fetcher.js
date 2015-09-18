import DefaultAdapter from './default_adapter'
import Request from './request'

/**
 * @class An HTTP Client
 * @property {Object} adapter
 * @property {Array.<object>} middlewares
 * @example
 *   new Fetcher().get('https://github.com').then(function (response) {
 *     console.log(response.status);
 *     return response;
 *   });
 */
export default class Fetcher {
  /**
   * @param {Object=} options
   */
  constructor(options = {}) {
    this.adapter = options.adapter || new DefaultAdapter();
    this.middlewares = options.middlewares || [];
  }

  /**
   * @return {Application}
   */
  get application() {
    if (!this._application) {
      this._application = this.buildApplication();
    }
    return this._application;
  }

  /**
   * @return {Application}
   */
  buildApplication() {
    return this.middlewares.reverse().reduce(
      (application, { middleware, options }) => {
        return new middleware(application, options);
      },
      this.adapter
    );
  }

  /**
   * @param {String}
   * @param {Object=}
   * @param {Object=}
   * @return {Promise}
   */
  delete(url, parameters, headers) {
    return this.process('DELETE', url, null, headers, parameters);
  }

  /**
   * @param {String}
   * @param {Object=}
   * @param {Object=}
   * @return {Promise}
   */
  get(url, parameters, headers) {
    return this.process('GET', url, null, headers, parameters);
  }

  /**
   * @param {String}
   * @param {Object=}
   * @param {Object=}
   * @return {Promise}
   */
  head(url, parameters, headers) {
    return this.process('HEAD', url, null, headers, parameters);
  }

  /**
   * @param {String}
   * @param {*=}
   * @param {Object=}
   * @return {Promise}
   */
  options(url, body, headers) {
    return this.process('OPTIONS', url, body, headers);
  }

  /**
   * @param {String}
   * @param {*=}
   * @param {Object=}
   * @return {Promise}
   */
  patch(url, body, headers) {
    return this.process('PATCH', url, body, headers);
  }

  /**
   * @param {String}
   * @param {*=}
   * @param {Object=}
   * @return {Promise}
   */
  post(url, body, headers) {
    return this.process('POST', url, body, headers);
  }

  /**
   * @param {String}
   * @param {String}
   * @param {String=}
   * @param {Object=}
   * @param {Object=}
   * @return {Promise}
   */
  process(method, url, body, headers, parameters) {
    return this.application.call(
      new Request(
        {
          body,
          headers,
          method,
          parameters,
          url
        }
      ).toEnvironment()
    );
  }

  /**
   * @param {String}
   * @param {*=}
   * @param {Object=}
   * @return {Promise}
   */
  put(url, body, headers) {
    return this.process('PUT', url, body, headers);
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
}
