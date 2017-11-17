const Stage = require('.')

const info = require('../../package')
const os = require('os')

const firstname = info.name.charAt(0).toUpperCase() + info.name.slice(1)

module.exports = class StartUpStage extends Stage {
  get expressions () {
    return this.buildExpressions(super.expressions, {
      version: `Version ${info.version.replace(/\./g, ' dot ')}.`,
      acronyms: [
        'The Expert in Such Situations'
      ],
      hello: [
        `Hello, I'm ${firstname}.`,
        `Hey, ${firstname} here!`,
        `Yo ${os.userInfo().username}, I'm ${firstname}.`
      ],
      startup: () => [
        this.getExpression('hello'),
        this.getExpression('acronyms').concat('.'),
        this.getExpression('version')
      ].join(' ')
    })
  }

  start () {
    this.say('startup')
  }
}
