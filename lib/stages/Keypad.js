const Stage = require('.')

module.exports = class Keypad extends Stage {
  get expressions () {
    return this.buildExpressions(super.expressions, {
      request: [
        'What the ...? Are you nuts?! You told me you would pick another bomb for the demo. I don\'t know how to disarm this module. I can\'t help you, sorry. Ask someone in the audience. I\'m out. Bye! 👋'
      ]
    })
  }
}
