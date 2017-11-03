const dgram = require('dgram')
const {PongParser} = require('./pong-parser')

// const TIMEOUT_MS = 5000
const STD_MSG = Buffer.from([0x01])
const EXT_MSG = Buffer.from([0x00, 0x01, 0xFF])

const sendStandard = async (server, port) => {
  return new Promise((resolve, reject) => {
    const client = dgram.createSocket('udp4')

    client.on('error', (err) => {
      reject(err)
    })

    client.on('message', (message, remote) => {
      console.log(`Message from ${remote.address}:${remote.port}:`)
      console.log(message)
      console.log(message.toString())
      client.close()
      const data = new PongParser(message.slice(STD_MSG.length)).parseStandardPong()
      resolve(data)
    })

    client.send(STD_MSG, 0, STD_MSG.length, port, server, (err) => {
      if (err) reject(err)
      console.log(`Sent <${STD_MSG.toString('hex').match(/.{1,2}/g).join(' ')}> to ${server}:${port}`)
    })
  })
}

const sendExtended = async (server, port) => {
  return new Promise((resolve, reject) => {
    const client = dgram.createSocket('udp4')

    client.on('error', (err) => {
      reject(err)
    })

    client.on('message', (message, remote) => {
      console.log(`Message from ${remote.address}:${remote.port}:`)
      console.log(message)
      console.log(message.toString())
      client.close()
      const data = new PongParser(message.slice(EXT_MSG.length)).parseExtendedPong()
      resolve(data)
    })

    client.send(EXT_MSG, 0, EXT_MSG.length, port, server, (err) => {
      if (err) reject(err)
      console.log(`Sent <${EXT_MSG.toString('hex').match(/.{1,2}/g).join(' ')}> to ${server}:${port}`)
    })
  })
}

module.exports = {sendStandard, sendExtended}
