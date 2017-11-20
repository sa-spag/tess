module.exports = class Module {
  /**
   * Create a module.
   * @param {number} [strikes = 0] - Number of strikes.
   * @param {setup} [setup] - Bomb's setup.
   * @param {number} [setup.batteries] - Number of batteries.
   * @param {boolean} [setup.even] - Whether or not the serial number ends with an even number.
   * @param {boolean} [setup.vowel] - Whether or not the serial number contains a vowel.
   * @param {Array<string>} [setup.indicators] - Lit indicators.
   * @return {Module}
   */
  constructor (strikes = 0, { batteries, even, vowel, indicators = [] } = {}) {
    this.strikes = strikes
    this.even = even
    this.vowel = vowel
    this.batteries = batteries
    this.indicators = indicators
  }

  /**
   * Whether or not there is a lit indicator with label "CAR".
   * @type {boolean}
   */
  get car () {
    return this.indicators.includes('car')
  }

  /**
   * Whether or not there is a lit indicator with label "FRK".
   * @type {boolean}
   */
  get frk () {
    return this.indicators.includes('frk')
  }

  /**
  * Current module's stage.
  * @type {number}
  */
  get stage () {
    return 0
  }

  /**
   * Whether or not the module is disarmable with the provided solution.
   * @type {boolean}
   */
  get done () {
    return false
  }

  /**
  * Add a strike.
  * @return {number} The new number of strikes.
  */
  strike () {
    this.strikes += 1
    return this.strikes
  }

  /**
   * Solve the module.
   */
  solve () {}
}
