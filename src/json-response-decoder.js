var JsonResponseDecoder = function (application) {
  this.application = application;
};

JsonResponseDecoder.prototype.call = function (environment) {
  return this.application.call(environment).then(function (response) {
    var contentType = response.headers.get('content-type');
    if (contentType && contentType.indexOf('json') > -1) {
      if (response.headers.get('content-length') === '0') {
        return null;
      } else {
        return response.json();
      }
    } else {
      return response;
    }
  });
};

module.exports = JsonResponseDecoder;
