const Stage = require('.')

module.exports = class WiresStage extends Stage {
  get expressions () {
    return this.buildExpressions(super.expressions, {
      request: [
        'Give me the wires\' colors from top to bottom.'
      ],
      missingWires: 'You gave me less than 3 colors. I need more.',
      tooManyWires: 'Whoa whoa whoa, that\'s too many wires. Please repeat.',
      ordinal: digit => {
        const digitToOrdinalIndicator = { 1: 'st', 2: 'nd', 3: 'rd' }
        return `${digit}${digitToOrdinalIndicator[digit] || 'th'}`
      },
      solution: () => `Cut the ${this.getExpression('ordinal', this.cut.number)} wire, it's ${this.cut.color}.`
    })
  }

  async gatherInformation () {
    const { entities } = await this.understand()
    if (entities.color === undefined) return
    this.colors = entities.color.map(({ value }) => value)
  }

  fulfilled () {
    if (this.colors.length < 3) {
      this.say('missingWires')
      return false
    }
    if (this.colors.length > 6) {
      this.say('tooManyWires')
      return false
    }
    return true
  }

  count (color) {
    const monochrome = this.colors.filter(c => c === color)
    return (monochrome && monochrome.length) || 0
  }

  cut (number) {
    return { number, color: this.colors[number - 1] }
  }

  last (color) {
    return this.colors.lastIndexOf(color) + 1
  }

  solve () {
    const last = this.colors.length
    const counts = ['black', 'blue', 'red', 'white', 'yellow'].reduce((c, color) => {
      c[color] = this.count(color)
      return c
    }, {})

    const numberToFunction = {
      3: () => {
        if (counts['red'] === 0) return this.cut(2)
        if (this.colors[last] === 'white') return this.cut(last)
        if (counts['blue'] > 1) return this.cut(this.last('blue'))
        return this.cut(last)
      },
      4: () => {
        if (counts['red'] > 1 && !this.data.even) return this.cut(this.last('red'))
        if (this.colors[last] === 'yellow' && counts['red'] === 0) return this.cut(1)
        if (counts['blue'] === 1) return this.cut(1)
        if (counts['yellow'] > 1) return this.cut(last)
        return this.cut(2)
      },
      5: () => {
        if (this.colors[last] === 'black' && !this.data.even) return this.cut(4)
        if (counts['red'] === 1 && counts['yellow'] > 1) return this.cut(1)
        if (counts['black'] === 0) return this.cut(2)
        return this.cut(1)
      },
      6: () => {
        if (counts['yellow'] === 0 && !this.data.even) return this.cut(3)
        if (counts['yellow'] === 1 && counts['white'] > 1) return this.cut(4)
        if (counts['red'] === 0) return this.cut(last)
        return this.cut(4)
      }
    }

    this.cut = numberToFunction[this.colors.length]()
  }

  done () {
    this.say('solution')
  }
}
