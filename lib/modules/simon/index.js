module.exports = class SimonModule {
  constructor (serialHasVowel, strikes = 0) {
    this.solution = []
    this.strikes = strikes
    this.serialHasVowel = serialHasVowel
  }

  flashToButton (color) {
    const colorToPress = {
      true: [ // With vowel
        ['blue', 'red', 'yellow', 'green'],
        ['yellow', 'green', 'blue', 'red'],
        ['green', 'red', 'yellow', 'blue']
      ],
      false: [ // Without vowel
        ['blue', 'yellow', 'green', 'red'],
        ['red', 'blue', 'yellow', 'green'],
        ['yellow', 'green', 'blue', 'red']
      ]
    }
    return colorToPress[this.serialHasVowel][this.strikes][['red', 'blue', 'green', 'yellow'].indexOf(color)]
  }

  solve (...colors) {
    if (colors.length > 1) this.solution = []
    this.solution = this.solution.concat(colors.map(color => this.flashToButton(color)))
    return this.solution
  }

  get stage () {
    return this.solution.length
  }

  strike () {
    this.strikes += 1
  }
}
