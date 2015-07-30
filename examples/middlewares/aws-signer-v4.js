var Sign = require('aws-signer-v4')
var url = require('url');

/**
 * @class
 * @property {object} application
 * @property {string} accessKeyId
 * @property {string} region
 * @property {string} secretAccessKey
 */
var AwsSignerV4 = function (application, options) {
  this.accessKeyId = options.accessKeyId;
  this.application = application;
  this.region = options.region;
  this.secretAccessKey = options.secretAccessKey;
};

/**
 * @param {object} environment
 * @return {Promise}
 */
AwsSignerV4.prototype.call = function (environment) {
  environment.headers.Host = environment.headers.Host || url.parse(environment.url).host;
  environment.headers.Date = environment.headers.Date || new Date().toISOString();
  environment.headers.Authorization = new Sign(
    {
      accessKeyId: this.accessKeyId,
      body: environment.body,
      headers: environment.headers,
      method: environment.method,
      region: this.region,
      secretAccessKey: this.secretAccessKey,
      url: environment.url
    }
  ).toString();
  return this.application.call(environment);
};

module.exports = AwsSignerV4;
