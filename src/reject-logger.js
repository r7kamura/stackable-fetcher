export default class RejectLogger {
  constructor(application) {
    this.application = application;
  }

  call(environment) {
    return this.application.call(environment).catch(function (error) {
      console.log(error);
      return Promise.reject(error);
    });
  }
}
