class Parser {
  constructor (buffer) {
    this.buffer = buffer
    this.index = 0
  }

  hasMore () {
    return this.index < this.buffer.length
  }

  readInt () {
    const currentByte = this.buffer[this.index]

    if (currentByte === 0x80) {
      const int16 = this.buffer.readInt16LE(++this.index)
      this.index += 2
      return int16
    } else if (currentByte === 0x81) {
      const int32 = this.buffer.readInt32LE(++this.index)
      this.index += 4
      return int32
    }
    return this.buffer.readInt8(this.index++)
  }

  readUInt () {
    const currentByte = this.buffer[this.index]

    if (currentByte === 0x80) {
      const int16 = this.buffer.readUInt16LE(++this.index)
      this.index += 2
      return int16
    } else if (currentByte === 0x81) {
      const int32 = this.buffer.readUInt32LE(++this.index)
      this.index += 4
      return int32
    }
    return this.buffer.readUInt8(this.index++)
  }

  readString () {
    const start = this.index

    while (this.hasMore()) {
      if (this.buffer.readInt8(this.index++, 1) === 0) break
    }
    return this.buffer.toString('utf8', start, this.index - 1)
  }
}

module.exports = {Parser}
