const getExpression = require('../getExpression')
const record = require('node-record-lpcm16')
const { client } = require('../wit')
const { execSync } = require('child_process')
const ora = require('ora')

module.exports = class Stage {
  constructor (data) {
    this.data = data
    this.conversation = []
  }

  buildExpressions (parent, expressions) {
    return Object.assign({}, parent, expressions)
  }

  get expressions () {
    return {
      request: '',
      understood: [
        'Got it.',
        'Copy.',
        'Understood.',
        'Roger.',
        'Roger that.'
      ],
      moveOn: [
        'Great! Let\'s move on!',
        'Cool! Let\'s defuse that shit.',
        'Now the tough part begins.'
      ],
      lastPhrase: () => this.conversation.slice(-1)[0] || '',
      error: [
        'TypeError: Sleeping is not a Solution. Repeat.',
        'Sorry, I was distracted. Say that again.',
        'I wasn\'t paying attention sorry. What did you say?'
      ]
    }
  }

  getExpression (key, ...variables) {
    return getExpression(this.expressions[key], ...variables)
  }

  start () {}
  request () {
    this.say('request')
  }

  listen () {
    return record.start({
      // Options from https://github.com/gillesdemey/node-record-lpcm16#options
      sampleRate: 16000,
      threshold: 0.8,
      thresholdStart: null,
      thresholdEnd: null,
      silence: '1.0',
      // verbose: true,
      recordProgram: 'rec',
      device: null
    })
  }

  async evaluate (speech) {
    return speech.pipe(client({
      url: '/speech',
      method: 'POST',
      headers: { 'Content-Type': 'audio/wav' }
    }))
  }

  async understand () {
    try {
      const spinner = ora({ color: 'red', text: 'Tess is waiting for an answer' }) // Eh oui, j'ai changé la couleur :B
      spinner.start()
      const response = await this.evaluate(this.listen())
      spinner.stop()
      this.conversation.push(response._text)
      return response
    } catch (e) {
      this.say('error')
      return this.understand()
    }
  }

  say (key, ...variables) {
    const selected = this.getExpression(key, ...variables)
    if (selected !== '') execSync(`say -i -r 220 -v Ava "${selected}"`, { stdio: [0, 1, 2] })
    return selected
  }

  gatherInformation () {}
  fulfilled () { return true }
  solve () {}

  async process () {
    this.request()
    do {
      await this.gatherInformation()
    } while (!this.fulfilled())
    this.solve()
  }

  next () {}
  done () {}
}
