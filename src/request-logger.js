export default class RequestLogger {
  constructor(application) {
    this.application = application;
  }

  call(environment) {
    console.log(environment);
    return this.application.call(environment);
  }
}
