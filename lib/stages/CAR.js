const BinaryStage = require('./Binary')

module.exports = class CARStage extends BinaryStage {
  get expressions () {
    return this.buildExpressions(super.expressions, {
      request: [
        'And what about C.A.R?'
      ]
    })
  }

  done () {
    super.done()
    return { car: this.boolean }
  }
}
