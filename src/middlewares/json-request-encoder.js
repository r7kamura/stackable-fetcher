export default class JsonRequestEncoder {
  constructor(application) {
    this.application = application;
  }

  call(environment) {
    if (environment.body && typeof environment.body !== 'string') {
      environment.body = JSON.stringify(environment.body);
      environment.headers['Content-Type'] = 'application/json';
    }
    return this.application.call(environment);
  }
}
