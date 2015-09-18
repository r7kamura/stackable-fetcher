import { Headers, Response } from 'node-fetch'
import stream from 'stream'

export default class Mock {
  constructor(application, configuration) {
    this.application = application;
    this.body = configuration.body;
    this.headers = configuration.headers;
    this.size = configuration.size;
    this.status = configuration.status;
    this.timeout = configuration.timeout;
  }

  call(environment) {
    return Promise.resolve(
      new Response(
        this._buildReadableStream(),
        {
          headers: this._getHeaders(),
          size: this.size,
          status: this._getStatus(),
          timeout: this.timeout
        }
      )
    );
  }

  /**
   * @return {stream.Readable}
   */
  _buildReadableStream() {
    let readableStream = new stream.Readable();
    readableStream._read = () => {};
    readableStream.push(this.body);
    readableStream.push(null);
    return readableStream;
  }

  /**
   * @return {fetch.Headers}
   */
  _getHeaders() {
    let headers = new Headers(this.headers || {});
    if (headers.has('Content-Length')) {
      headers.set('Content-Length', this.body.length);
    }
    return headers;
  }

  /**
   * @return {Integer}
   */
  _getStatus() {
    return this.status || 200;
  }
}
