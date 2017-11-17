const BinaryStage = require('./Binary')

module.exports = class FRKStage extends BinaryStage {
  get expressions () {
    return this.buildExpressions(super.expressions, {
      request: [
        'Do you see the F.R.K indicator?'
      ]
    })
  }

  done () {
    super.done()
    return { frk: this.boolean }
  }
}
