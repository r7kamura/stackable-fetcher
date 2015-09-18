export default class JsonResponseDecoder {
  constructor(application) {
    this.application = application;
  }

  call(environment) {
    return this.application.call(environment).then((response) => {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('json') > -1) {
        if (response.headers.get('content-length') === '0') {
          response.body = null;
        } else {
          response.body = JSON.parse(response.body);
        }
      }
      return response;
    });
  }
}
