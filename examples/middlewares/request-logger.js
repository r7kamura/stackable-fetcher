var RequestLogger = function (application) {
  this.application = application;
};

RequestLogger.prototype.call = function (environment) {
  console.log(environment);
  return this.application.call(environment);
};

module.exports = RequestLogger;
