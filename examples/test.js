var RequestLogger = require('./middlewares/request-logger');
var ResponseLogger = require('./middlewares/response-logger');
var Fetcher = require('../index.js');

var fetcher = new Fetcher();
fetcher
  .use(RequestLogger)
  .use(ResponseLogger)
  .get('https://api.github.com/users/r7kamura')
  .then(function (response) {
    return response.json();
  }).then(function (json) {
    console.log(json);
  });
