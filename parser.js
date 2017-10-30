class Parser {
  constructor (buffer) {
    this.buffer = buffer
    this.index = 0
  }

  hasMore () {
    return this.index < this.buffer.length
  }

  readUInt () {
    const currentByte = this.buffer[this.index]

    if (currentByte === 0x80) {
      const uInt16 = this.buffer.readUInt16LE(++this.index)
      this.index += 2
      return uInt16
    } else if (currentByte === 0x81) {
      const uInt32 = this.buffer.readUInt32LE(++this.index)
      this.index += 4
      return uInt32
    }
    return this.buffer.readUInt8(this.index++)
  }

  readString () {
    const start = this.index

    while (this.hasMore()) {
      if (this.buffer.readUIntLE(this.index++, 1) === 0) break
    }
    return this.buffer.toString('utf8', start, this.index - 1)
  }
}

module.exports = {Parser}
