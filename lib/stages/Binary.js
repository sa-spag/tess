const Stage = require('.')

module.exports = class BinaryStage extends Stage {
  get expressions () {
    return this.buildExpressions(super.expressions, {
      reject: [
        'What? Just say yes or no!',
        'Take your time and give me a clearer answer.',
        'It\'s either yes or no. How can it be simpler?'
      ]
    })
  }

  async gatherInformation () {
    const { entities } = await this.understand()
    if (entities.boolean === undefined) return
    this.boolean = entities.boolean[0].value === 'true'
  }

  fulfilled () {
    if (this.boolean === true || this.boolean === false) return true
    this.say('reject')
    return false
  }

  done () {
    this.say('understood')
  }
}
