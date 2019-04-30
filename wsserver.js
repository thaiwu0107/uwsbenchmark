/* Non-SSL is simply App() */
const path = require('path');
const uWS = require('uWebSockets.js/uws.js');
const BufferPlus = require('buffer-plus');

Promise.resolve().then(() => {
  return uWS.App();
}).then((wss) => {
  wss.ws('/*', {
    compression: 0,
    maxPayloadLength: 1024 * 1024,
    idleTimeout: 60,
    drain: () => {
    },
    close: (ws, code, message) => {
    },
    open: (ws, req) => {
    },
    message: (ws, message, isBinary) => {
      const req = BufferPlus.from(message);
      if (req.readUInt8() > 0) {
        uWS.us_listen_socket_close(this.wssListenSocket);
        this.wssListenSocket = null;
        process.exit(0);
      } else {
        ws.send(message, isBinary);
      }
    }

  }).listen(9001, (listenSocket) => {

    this.wssListenSocket = listenSocket;
    const wssUrl = `ws://127.0.0.1:9001`;
    if (listenSocket) {
    } else {
    }
  });
});