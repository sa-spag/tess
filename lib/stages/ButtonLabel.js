const Stage = require('.')

module.exports = class ButtonLabelStage extends Stage {
  get expressions () {
    return this.buildExpressions(super.expressions, {
      request: [
        'Okay, be careful. Gently open the button cover and tell me its color and what\'s written on it.'
      ],
      rejectLabel: [
        'Articulate. Please.',
        () => `Did you really say \\"${this.getExpression('lastPhrase')}\\"? Because it's not on my button labels list.`,
        'As you shout some random stuff, we\'re losing time.'
      ],
      rejectColor: [
        'I didn\'t get the color.',
        'Did you tell me a color? Because I did not catch it.',
        `I am pretty sure this was not a color.`
      ],
      press: 'The manual advices to \\"press and release immediately.\\"',
      hold: 'Okay, hold the button.'
    })
  }

  async gatherInformation () {
    const { entities } = await this.understand()
    if (entities.button_label) this.label = entities.button_label[0].value
    if (entities.color) this.color = entities.color[0].value
  }

  fulfilled () {
    const fulfilled = !!(this.label && this.color)
    if (!this.label) this.say('rejectLabel')
    if (!this.color) this.say('rejectColor')
    return fulfilled
  }

  solve () {
    this.hold = false
    if (this.color === 'blue' && this.label === 'abort') {
    } else if (this.data.batteries > 1 && this.label === 'detonate') return
    else if (this.color === 'white' && this.data.car === true) {
    } else if (this.data.batteries > 2 && this.frk === true) return
    else if (this.color === 'yellow') {
    } else if (this.color === 'red' && this.label === 'hold') return
    this.hold = true
  }

  done () {
    this.say(this.hold ? 'hold' : 'press')
    return { hold: this.hold }
  }
}
