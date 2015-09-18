import fetch from 'node-fetch'

export default class DefaultAdapter {
  call(environment) {
    return fetch(
      environment.url,
      {
        body: environment.body,
        headers: environment.headers,
        method: environment.method
      }
    ).then((response) => {
      return response.text().then((body) => {
        return {
          body,
          headers: response.headers,
          status: response.status
        };
      });
    });
  }
}
