const VowelStage = require('./stages/Vowel')
const EvenStage = require('./stages/Even')
const FRKStage = require('./stages/FRK')
const CARStage = require('./stages/CAR')
const BatteriesStage = require('./stages/Batteries')
const RecapStage = require('./stages/Recap')
const DisarmStage = require('./stages/Disarm')
const SelectStage = require('./stages/Select')
const WiresStage = require('./stages/Wires')
const ButtonLabelStage = require('./stages/ButtonLabel')
const ButtonStripStage = require('./stages/ButtonStrip')
const KeypadStage = require('./stages/Keypad')
const StartUpStage = require('./stages/StartUp')
const FirstStage = StartUpStage

const stages = []

const routes = {
  StartUpStage: () => VowelStage,
  VowelStage: () => EvenStage,
  EvenStage: () => FRKStage,
  FRKStage: () => CARStage,
  CARStage: () => BatteriesStage,
  BatteriesStage: () => RecapStage,
  RecapStage: ({ restart }) => (restart ? VowelStage : SelectStage),
  SelectStage: ({ moduleName }) => ({
    wire: WiresStage,
    button: ButtonLabelStage,
    keypad: KeypadStage
  }[moduleName]),
  WiresStage: () => DisarmStage,
  ButtonLabelStage: ({ hold }) => (hold ? ButtonStripStage : DisarmStage),
  ButtonStripStage: () => DisarmStage,
  KeypadStage: () => undefined,
  DisarmStage: ({ boolean }) => {
    if (boolean) return SelectStage
    const eligibleStages = [WiresStage, ButtonLabelStage, KeypadStage]
    let top
    while (!eligibleStages.includes(top) && stages.length > 0) top = stages.pop()
    return top
  }
}

module.exports = (stage) => {
  let Stage
  if (stage === undefined) Stage = FirstStage
  else {
    const route = routes[stage.constructor.name]
    if (route !== undefined) Stage = route(stage)
  }
  stages.push(Stage)
  return Stage
}
