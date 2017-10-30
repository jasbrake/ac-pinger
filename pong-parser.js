const {Parser} = require('./parser')

class PongParser extends Parser {
  constructor (buffer) {
    super(buffer)
    this.data = {}

    if (this.buffer[0] == 0xFF) {
      console.log('extended mode')
    } else {
      this.data.protocol = this.readUInt()
      this.data.mode = this.readUInt()
      this.data.playerCount = this.readUInt()
      this.data.minutesRemaining = this.readUInt()
      this.data.currentMap = this.readString()
      this.data.description = this.readString()
      this.data.maxClients = this.readUInt()
      this.data.pongFlags = this.readUInt()
    }


    console.log(JSON.stringify(this.data, null, 2))
  }
}

module.exports = {PongParser}