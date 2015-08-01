var RejectLogger = function (application) {
  this.application = application;
};

RejectLogger.prototype.call = function (environment) {
  return this.application.call(environment).catch(function (error) {
    console.log(error);
    return Promise.reject(error);
  });
};

module.exports = RejectLogger;
