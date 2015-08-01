var RejectLogger = function (application) {
  this.application = application;
};

RejectLogger.prototype.call = function (environment) {
  return this.application.call(environment).catch(function (error) {
    console.log(error);
    return error;
  });
};

module.exports = RejectLogger;
