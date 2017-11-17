const BinaryStage = require('./Binary')

module.exports = class DisarmStage extends BinaryStage {
  get expressions () {
    return this.buildExpressions(super.expressions, {
      request: [
        'You got it right?',
        'Is it disarmed?',
        'Are you still alive?',
        'Was it the solution? I was not so sure.'
      ],
      moveOn: [
        'Here we go!',
        'Yeah, I knew I got it right.',
        'EZ.',
        '👍'
      ],
      restart: [
        'Woops.'
      ]
    })
  }

  get next () {
    return this.boolean
  }

  done () {
    this.say(this.boolean ? 'moveOn' : 'restart')
  }
}
