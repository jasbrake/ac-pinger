const dgram = require('dgram');
const {PongParser} = require('./pong-parser')
const {Pinger} = require('./pinger')
// const server = '62.210.131.155';
// const port = 2000;
const server = '81.4.107.119';
const port = 5501;

// const message = Buffer.from([0x01, 0x02, 0x65, 0x6E]);
// const message2 = Buffer.from([0x00, 0x01, 0xFF]);

// const msg = Buffer.from([0x01, 0x02, 0x65, 0x6E])
const msg = Buffer.from([0x01, 0x65, 0x6e])


const pinger = new Pinger(server, port, msg)

module.exports = {Pinger}
