const BinaryStage = require('./Binary')

module.exports = class RecapStage extends BinaryStage {
  get expressions () {
    return this.buildExpressions(super.expressions, {
      request: 'Can you please confirm my dear?',
      recap: () => {
        const { vowel, even, frk, car, batteries } = this.data
        const recap = [
          vowel ? 'As I understood the serial number contains a vowel' : 'So we have a consonants only serial number',
          `with an ${even ? 'even' : 'odd'} number at the end`
        ]
        if (frk) recap.push('F.R.K indicator is on')
        if (car) recap.push('C.A.R is on')
        recap.push(`and the bomb has ${batteries} batter${batteries > 1 ? 'ies' : 'y'}`)
        return recap.join(', ').concat('.')
      },
      restart: [
        'Damn, okay. We\'ll start over.'
      ]
    })
  }

  request () {
    this.say('recap')
    super.request()
  }

  get next () {
    return this.boolean
  }

  done () {
    this.say(this.boolean ? 'moveOn' : 'restart')
  }
}
