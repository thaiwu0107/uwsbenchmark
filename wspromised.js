const WebSocket = require('websocket-as-promised');
const BufferPlus = require('buffer-plus');
const W3CWebSocket = require('websocket').w3cwebsocket;

const NS_PER_SEC = 1e9;
const MS_PER_NS = 1e-6;
let start;
let end;
const testTimes = 1000000;
const endTime = testTimes - 1;

const client = new WebSocket('ws://127.0.0.1:9001', {
    createWebSocket: url => new W3CWebSocket(url)
});
let c = 0;

const sent = (number) => {
    const rep = BufferPlus.create(10);
    rep.writeUInt8(number);
    client.send(rep.toBuffer());
};

client.open()
  .then(() => {
    console.log('W3Cwebsocket client start...');
    start = process.hrtime();
    for (let index = 0; index < testTimes; index++) {
        sent(0);
    }
});
client.onMessage.addListener((message) => {
    c++;
    if (c === endTime) {
        sent(0x2);
        end = process.hrtime(start);
        console.log('W3Cwebsocket client done');
        const ops = Number(c / ((end[0] * NS_PER_SEC + end[1]) * MS_PER_NS) * 1000.0).toFixed(2);
        console.log(`Avg. message/sec: ${ops}/s`);
        console.log(`Benchmark ${testTimes} messages took ${(end[0] * NS_PER_SEC + end[1]) * MS_PER_NS} milliseconds`);
        process.exit(0);
    }
});
// client.on('error', (error) => {
//     console.error('error', error);
// });
// client.on('close', (close) => {
//     console.error('close', close);
// });