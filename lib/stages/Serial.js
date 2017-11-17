const Stage = require('.')
const expressions = require('./expressions')
const alphabet = require('../../alphabet')

module.exports = class extends Stage {
  constructor () {
    this.serial = ''
  }

  request () {
    this.say(expressions.request)
  }

  async gatherInformation () {
    const { entities } = await this.understand()
    if (entities.alphabet === undefined) return
    this.serial = entities.alphabet.reduce((serial, { value }) => {
      return serial + (alphabet[value] || value[0])
    }, '').substring(0, 5)
  }

  fulfilled () {
    const fulfilled = /^[a-z0-9]{4}\d$/.test(this.serial)
    if (this.serial.length < 5) this.say(expressions.rejections.tooShort)
    else if (/[a-z]/.test(this.serial.slice(-1))) this.say(expressions.rejections.endingWithLetter)
    return fulfilled
  }

  solve () {
    this.vowel = /[aeiouy]/.test(this.serial)
    this.even = !(parseInt(this.serial.slice(-1), 10) % 2)
  }

  done () {
    this.say(expressions.solution, this.serial)
  }
}
