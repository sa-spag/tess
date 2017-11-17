const Stage = require('.')

module.exports = class extends Stage {
  start () {
    this.say(expressions.request)
  }

  async getModules () {
    const wit = await this.listen()
    const { modules } = wit.entities
    if (!modules) return
    return modules.entities.number[0]
  }

  async getTime () {
    return getInformation ({

    })
  }

  async getInformation (expectations) {
    const information = await this.listen()
  }

  * process () {
  }

  done () {
  }
}
