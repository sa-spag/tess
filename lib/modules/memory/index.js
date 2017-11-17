module.exports = class MemoryModule {
  constructor () {
    this.solution = ''
    this.history = []
  }

  solve (display, buttons) {
    if (this.done) return null

    const stages = [
      [ buttons[1], buttons[1], buttons[2], buttons[3] ],
      [ '4', buttons[this.history[0]], buttons[0], buttons[this.history[0]] ],
      [ this.solution[1], this.solution[0], buttons[2], '4' ],
      [ buttons[this.history[0]], buttons[0], buttons[this.history[1]], buttons[this.history[1]] ],
      [ this.solution[0], this.solution[1], this.solution[3], this.solution[2] ]
    ]

    const label = stages[this.stage][parseInt(display, 10) - 1]
    this.solution += label
    this.history.push(buttons.indexOf(label))
    return label
  }

  strike () {
    this.solution = ''
    this.history = []
  }

  get stage () {
    return this.solution.length
  }

  get done () {
    return this.stage === 5
  }
}
