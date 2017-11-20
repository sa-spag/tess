const test = require('ava')
const Module = require('.')

test('add a strike', t => {
  const mod = new Module()
  t.deepEqual(mod.strikes, 0)
  t.deepEqual(mod.strike(), 1)
  t.deepEqual(mod.strikes, 1)
})

test('FRK indicator is lit', t => {
  const mod = new Module(0, { indicators: ['frk'] })
  t.true(mod.frk)
  t.false(mod.car)
})

test('done is always false', t => {
  const mod = new Module()
  t.false(mod.done)
  mod.solve()
  t.false(mod.done)
})
