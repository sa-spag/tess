const test = require('ava')
const MemoryModule = require('.')

const modules = [
  {
    entries: [ '1 4321', '1 1423', '1 3214', '1 2143', '1 1324' ],
    solution: '34413'
  },
  {
    entries: [ '2 4321', '2 1423', '2 3214', '2 2143', '2 1324' ],
    solution: '34324'
  },
  {
    entries: [ '3 4321', '3 1423', '3 3214', '3 2143', '3 1324' ],
    solution: '21122'
  },
  {
    entries: [ '4 4321', '4 1423', '4 3214', '4 2143', '4 1324' ],
    solution: '13434'
  }
]

modules.forEach(({ entries, solution }) => test(t => {
  const memoryModule = new MemoryModule()
  entries.forEach((entry, i) => {
    const [, display, buttons] = entry.match(/^(\d).?(\d{4})/)
    t.deepEqual(memoryModule.stage, i)
    t.deepEqual(memoryModule.solve(display, buttons), solution[i])
  })
  t.deepEqual(memoryModule.solve(), null)
  t.true(memoryModule.done)
}))
