const BinaryStage = require('./Binary')

module.exports = class EvenStage extends BinaryStage {
  get expressions () {
    return this.buildExpressions(super.expressions, {
      request: [
        'Is the last digit an even number?',
        'What about the last digit: is it even?'
      ]
    })
  }

  done () {
    super.done()
    return { even: this.boolean }
  }
}
