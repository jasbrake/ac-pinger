const {Pinger} = require('./pinger')

const servers = [
  {ip: '62.210.131.155', port: 1999},
  {ip: '62.210.131.155', port: 2999},
  {ip: '62.210.131.155', port: 3999},
  {ip: '62.210.131.155', port: 4999},
  {ip: '81.4.107.119', port: 5500},
  {ip: '81.4.107.119', port: 5555}
]

const data = {}

const pinger = new Pinger()

pinger.on('message', (message, remote) => {
  const remoteKey = `${remote.address}:${remote.port - 1}`

  data[remoteKey] = data[remoteKey] || {}

  Object.keys(message).forEach(key => {
    if (data[remoteKey][key] !== message[key]) {
      data[remoteKey][key] = message[key]
    }
  })
})

pinger.on('player', (message, remote) => {
  const remoteKey = `${remote.address}:${remote.port - 1}`

  data[remoteKey].players = data[remoteKey].players || []
  data[remoteKey].players.push(message.player)
})

pinger.on('error', (err) => {
  console.error(err)
})

servers.forEach((server) => {
  pinger.sendStandard(server.ip, server.port)
  pinger.sendExtended(server.ip, server.port)
})

setTimeout(() => {
  console.log(JSON.stringify(data, null, 2))
  pinger.client.close()
}, 1000)

module.exports = {Pinger}
