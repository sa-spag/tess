const BinaryStage = require('./Binary')

module.exports = class VowelStage extends BinaryStage {
  get expressions () {
    return this.buildExpressions(super.expressions, {
      request: [
        'Does the serial number contains a vowel?',
        'Do you see any vowel in the serial number?'
      ]
    })
  }

  done () {
    super.done()
    return { vowel: this.boolean }
  }
}
