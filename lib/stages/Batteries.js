const Stage = require('.')

module.exports = class BatteriesStage extends Stage {
  get expressions () {
    return this.buildExpressions(super.expressions, {
      request: 'How many batteries?',
      rejection: 'Come on, just give me a number.'
    })
  }

  async gatherInformation () {
    const { entities } = await this.understand()
    if (entities.number === undefined) return
    this.batteries = entities.number[0].value
  }

  fulfilled () {
    const fulfilled = this.batteries >= 0
    if (!fulfilled) this.say('rejection')
    return fulfilled
  }

  done () {
    return { batteries: this.batteries }
  }
}
