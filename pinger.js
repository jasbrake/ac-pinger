const dgram = require('dgram')
const {PongParser} = require('./pong-parser')
const EventEmitter = require('events')

const STD_MSG = Buffer.from([0x01])
const EXT_MSG = Buffer.from([0x00, 0x01, 0xFF])

class Pinger extends EventEmitter {
  constructor () {
    super()
    this.client = dgram.createSocket('udp4')

    this.client.on('message', (message, remote) => {
      console.log(message)
      const data = new PongParser(message).parse()
      if (data.player) {
        this.emit('player', data, remote)
      } else {
        this.emit('message', data, remote)
      }
    })
  }

  sendStandard (server, port) {
    this._send(server, port, STD_MSG)
  }

  sendExtended (server, port) {
    this._send(server, port, EXT_MSG)
  }

  _send (server, port, message) {
    this.client.send(message, 0, message.length, port + 1, server, (err) => {
      if (err) throw (err)
      console.log(`Sent <${message.toString('hex').match(/.{1,2}/g).join(' ')}> to ${server}:${port}`)
    })
  }
}

module.exports = {Pinger}
