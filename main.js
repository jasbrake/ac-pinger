const Pinger = require('./pinger')
const server = '62.210.131.155'
const port = 1999 + 1
// const server = '81.4.107.119'
// const port = 5501

Pinger.sendStandard(server, port)
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(e => console.error(e))

Pinger.sendExtended(server, port)
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(e => console.error(e))

module.exports = {Pinger}
