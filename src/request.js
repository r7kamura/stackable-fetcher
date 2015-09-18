import urlParser from 'url'

/**
 * @class A set of information about an HTTP request
 * @property {Array.<object>}
 * @property {String=} body
 * @property {Object=} headers
 * @property {String} method
 * @property {Object=} parameters
 * @property {String} url
 */
export default class Request {
  constructor({ body, headers = {}, method, parameters = {}, url }) {
    this.body = body;
    this.headers = headers;
    this.method = method;
    this.parameters = parameters;
    this.urlString = url;
  }

  /**
   * @return {String}
   */
  buildUrl() {
    const urlObject = urlParser.parse(this.urlString);
    urlObject.search = null;
    urlObject.query = {};
    Object.keys(this.parameters).forEach((key) => {
      urlObject.query[key] = this.parameters[key];
    });
    return urlParser.format(urlObject);
  }

  raw() {
    return {
      body: this.body,
      headers: this.headers,
      method: this.method,
      url: this.buildUrl()
    };
  }
}
