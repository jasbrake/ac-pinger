const dgram = require('dgram');
const {PongParser} = require('./pong-parser')

const TIMEOUT_MS = 5000
const STD_MSG = Buffer.from([0x01, ])

class Pinger {
  constructor (server, port, msg) {
    this.server = server
    this.port = port
    this.client = dgram.createSocket('udp4');

    this.client.on('error', (err) => {
      console.error(err)
    })

    this.client.on('message', (message, remote) => {
      console.log(`Message from ${remote.address}:${remote.port}:`);
      console.log(message);
      console.log(message.toString());
      this.client.close()
      return new PongParser(message.slice(msg.length))
    });

    function _initTimeoutHandler () {
      setTimeout(() => {
        try {
          this.client.close()
          console.info(`${server}:${port} timed out.`)
        } catch (e) {
          if (e.message !== 'Not running')
            console.error(e)
        }
      }, TIMEOUT_MS)
    }

    function send() {
      this.client.send(msg, 0, msg.length, port, server, (err) => {
        if (err) throw err;
        console.log(`Sent <${msg.toString('hex').match(/.{1,2}/g).join(' ')}> to ${server}:${port}`);
        _initTimeoutHandler()
      });
    }
  }

  sendStandard() {
    const msg =
  }
}

module.exports = {Pinger}
