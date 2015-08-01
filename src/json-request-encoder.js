var JsonRequestEncoder = function (application) {
  this.application = application;
};

JsonRequestEncoder.prototype.call = function (environment) {
  if (environment.body && typeof environment.body !== 'string') {
    environment.body = JSON.stringify(environment.body);
    environment.headers['Content-Type'] = 'application/json';
  }
  return this.application.call(environment);
};

module.exports = JsonRequestEncoder;
