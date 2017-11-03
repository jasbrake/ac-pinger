const {Parser} = require('./parser')

class PongParser extends Parser {
  constructor (buffer) {
    super(buffer)
    this.data = {}
    this.debug = {}
  }

  parse () {
    if (this.buffer[0] === 0) {
      this.index += 3
    } else {
      this.index++
    }
    const msgType = this.readInt()
    switch (msgType) {
      case 1201:
        this._parseStandardPong()
        break
      case -1:
        this._parseExtendedPong()
        break
      default:
        throw new Error(`Invalid message type: ${msgType}`)
    }
    return this.data
  }

  _parseStandardPong (buffer) {
    // this.data.protocol = this.readInt() // 1202
    this.data.mode = this.readInt()
    this.data.playerCount = this.readInt()
    this.data.minutesRemaining = this.readInt()
    this.data.currentMap = this.readString()
    this.data.description = this.readString()
    this.data.maxClients = this.readInt()
    this.debug.flags = this.readInt()
    this.data.mastermode = this.debug.flags >> 6
    this.data.password = (this.debug.flags & 1) === 1
  }

  _parseExtendedPong (buffer) {
    this.debug.extVersion = this.readInt() // should be 104
    this.debug.error = this.readInt() // should be 0
    this.debug.playerStatResponseId = this.readInt() // -10 for cns, -11 for player info

    if (this.debug.playerStatResponseId === -11) {
      this._parsePlayer()
      return
    }
    this.data.playerCount = 0
    while (this.hasMore()) {
      this.readInt()
      this.data.playerCount++
    }
  }

  _parsePlayer () {
    const player = {}
    player.cn = this.readInt()
    player.ping = this.readInt()
    player.name = this.readString()
    player.team = this.readString()
    player.frags = this.readInt()
    player.flags = this.readInt()
    player.deaths = this.readInt()
    player.teamkills = this.readInt()
    player.accuracy = this.readInt()
    player.health = this.readInt()
    player.armour = this.readInt()
    player.gun = this.readInt()
    player.role = this.readInt()
    player.state = this.readInt()
    player.ip = `${this.readUInt()}.${this.readUInt()}.${this.readUInt()}.x`

    this.data.player = player
  }
}

module.exports = {PongParser}
