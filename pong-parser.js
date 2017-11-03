const {Parser} = require('./parser')

class PongParser extends Parser {
  constructor (buffer) {
    super(buffer)
    this.data = {}
  }

  parseStandardPong (buffer) {
    this.data.protocol = this.readUInt() // 1202
    this.data.mode = this.readUInt()
    this.data.playerCount = this.readUInt()
    this.data.minutesRemaining = this.readUInt()
    this.data.currentMap = this.readString()
    this.data.description = this.readString()
    this.data.maxClients = this.readUInt()
    this.data.pongFlags = this.readUInt() // 0?

    return this.data
  }

  parseExtendedPong (buffer) {
    this.data.ack = this.readUInt() // should be -1
    this.data.ack = this.readUInt() // should be 104
    this._parseExtendedPlayerStats()

    return this.data
  }

  _parseExtendedPlayerStats () {
    this.data.error = this.readUInt() // should be 0
    this.data.playerStatResponseId = this.readUInt() // should be -10
    this.data.playerCount = this.readUInt()
  }
}

module.exports = {PongParser}
