const Stage = require('.')

module.exports = class ButtonStripStage extends Stage {
  get expressions () {
    return this.buildExpressions(super.expressions, {
      request: [
        'The strip on the right should show you a color. Tell me what is it.'
      ],
      reject: [
        'I was not expecting that response. Can you repeat?',
        'Come on, I want you to give me a color.',
        'If the bomb explodes, it will be because of your bad pronouciation skills.'
      ],
      solution: [
        `You have to release the button when the countdown shows a ${this.digit}.`
      ]
    })
  }

  async gatherInformation () {
    const { entities } = await this.understand()
    if (entities.color) this.color = entities.color[0].value
  }

  fulfilled () {
    if (this.color) return true
    this.say('reject')
    return false
  }

  solve () {
    const colorToDigit = {
      blue: 4,
      white: 1,
      yellow: 5
    }
    this.digit = colorToDigit[this.color] || 1
  }

  done () {
    this.say('solution')
  }
}
