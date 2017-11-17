const Stage = require('.')

module.exports = class extends Stage {
  async gatherInformation () {
    const { entities } = await this.understand()
    if (entities.indicator === undefined) return
    this.indicators = entities.indicator.map(({ value }) => value)
  }

  done () {
    this.say('indicators')
  }
}
