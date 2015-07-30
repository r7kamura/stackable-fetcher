var ResponseLogger = function (application) {
  this.application = application;
};

ResponseLogger.prototype.call = function (environment) {
  return this.application.call(environment).then(function (response) {
    console.log(
      {
        headers: response.headers.raw(),
        status: response.status,
      }
    );
    return response;
  });
};

module.exports = ResponseLogger;
