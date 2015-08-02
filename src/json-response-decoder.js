export default class JsonResponseDecoder {
  constructor(application) {
    this.application = application;
  }

  call(environment) {
    return this.application.call(environment).then(function (response) {
      var contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('json') > -1) {
        if (response.headers.get('content-length') === '0') {
          return null;
        } else {
          return response.json();
        }
      } else {
        return response;
      }
    });
  }
}
