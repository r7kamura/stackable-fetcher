import { Fetcher } from '../src/index.js'

describe('Fetcher', () => {
  let fetcher = new Fetcher();

  describe('#get', () => {
    it('sends GET request and returns Promise', (done) => {
      fetcher.get('http://example.com').then((response) => {
        done();
      });
    });
  });
});
