module.exports = class complicatedWiresModule {
  constructor (lastDigitIsEven, hasParallelPort, batteriesNumber) {
    this.solution = true

    this.lastDigitIsEven = lastDigitIsEven
    this.hasParallelPort = hasParallelPort
    this.hasTwoOrMoreBatt = batteriesNumber >= 2
  }

  c (combination) {
    const cutTheWire = [
      {
        led: false,
        colors: ['white', ''],
        star: false
      },
      {
        led: false,
        colors: ['white', ''],
        star: true
      },
      {
        led: false,
        colors: ['red'],
        star: true
      }
    ]
    if
  }

  solve (led, colors, star) {
  }
}
