import url from 'url'

/**
 * @class A set of information about an HTTP request
 * @property {Array.<object>}
 * @property {string=} body
 * @property {object=} headers
 * @property {string} method
 * @property {object=} parameters
 * @property {object} url
 */
export default class Request {
  constructor(properties) {
    this._body = properties.body;
    this._headers = properties.headers || {};
    this._method = properties.method;
    this._parameters = properties.parameters || {};
    this._url = properties.url;
  }

  /**
   * @return {object}
   */
  toEnvironment() {
    return {
      body: this._body,
      headers: this._headers,
      method: this._method,
      url: this._getUrl()
    };
  }

  /**
   * @private
   * @return {string}
   */
  _getUrl() {
    let urlObject = url.parse(this._url);
    urlObject.search = null;
    urlObject.query = {};
    let self = this;
    Object.keys(this._parameters).forEach(function (key) {
      urlObject.query[key] = self._parameters[key];
    });
    return url.format(urlObject);
  }
}
