const Stage = require('.')

module.exports = class SelectStage extends Stage {
  get expressions () {
    return this.buildExpressions(super.expressions, {
      request: [
        'Watcha want to do?',
        'Hurry up, give me a module name!',
        'Shout a module name to me so I can find it in the manual.',
        'Time is running out, we have to disarm a module. Tell me which.'
      ],
      reject: [
        'You know I want you to pick a module, right?',
        () => `What did you say?! \\"${this.getExpression('lastPhrase')}\\"?`,
        () => `\\"${this.getExpression('lastPhrase')}\\" is not a module that I know of.`
      ]
    })
  }

  async gatherInformation () {
    const { entities } = await this.understand()
    if (entities.module_name === undefined) return
    this.moduleName = entities.module_name[0].value
  }

  fulfilled () {
    if (this.moduleName) return true
    this.say('reject')
    return false
  }
}
