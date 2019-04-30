/* Non-SSL is simply App() */
const path = require('path');
const uWS = require('uWebSockets.js/uws.js');
const BufferPlus = require('buffer-plus');

const rep = BufferPlus.create(10);
rep.writeUInt8(0);

Promise.resolve().then(() => {
  return uWS.App();
}).then((wss) => {
  wss.get('/*', (res, req) => {
    res.onAborted(() => {
        res.aborted = true;
    });
    if (!res.aborted) {
        res.experimental_cork(() => {
            res.writeHeader('Content-Type', 'application/json');
            res.end(rep.toBuffer());
        });
    }
  }).listen(9900, (listenSocket) => {
    this.wssListenSocket = listenSocket;
    const wssUrl = `http://127.0.0.1:9900`;
    if (listenSocket) {
        console.warn('記得殺掉 9900 port, 正常 20秒後我會幫你殺掉');
        setTimeout(() => {
            process.exit(0);
        }, 20000)
    } else {
    }
  });
});