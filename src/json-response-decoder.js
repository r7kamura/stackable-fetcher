var JsonResponseDecoder = function (application) {
  this.application = application;
};

JsonResponseDecoder.prototype.call = function (environment) {
  return this.application.call(environment).then(function (response) {
    if (response.headers.get('content-type') && response.headers.get('content-type').indexOf('json') > -1) {
      return response.json();
    } else {
      return Promise.reject('The response does not have JSON Content-Type');
    }
  });
};

module.exports = JsonResponseDecoder;
