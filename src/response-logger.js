export default class ResponseLogger {
  constructor(application) {
    this.application = application;
  }

  call(environment) {
    return this.application.call(environment).then(function (response) {
      console.log(
        {
          headers: response.headers.raw(),
          status: response.status,
        }
      );
      return response;
    });
  }
}
