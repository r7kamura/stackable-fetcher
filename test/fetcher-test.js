import assert from 'assert'
import { Fetcher, RequestLogger } from '../src/index.js'

describe('Fetcher', () => {
  const fetcher = new Fetcher();

  describe('#get', () => {
    it('sends GET request and returns Promise', (done) => {
      fetcher.get('http://example.com').then((response) => {
        done();
      });
    });
  });

  describe('#use', () => {
    it('returns a new Fetcher instance', () => {
      assert(fetcher.use(RequestLogger) !== fetcher);
    });
  });
});
