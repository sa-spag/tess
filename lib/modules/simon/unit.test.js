const test = require('ava')
const SimonModule = require('.')

const modules = [
  {
    vowel: true,
    strike: 0,
    entries: [ 'red', 'red blue', 'red blue green', 'red blue green', 'red blue green red' ],
    solution: [ 'blue', 'blue red', 'blue red yellow', 'blue red yellow', 'blue red yellow blue' ]
  },
  {
    vowel: true,
    strike: 0,
    entries: [ 'yellow', 'yellow green', 'yellow green', 'yellow green' ],
    solution: [ 'green', 'green yellow', 'green yellow', 'green yellow' ]
  },
  {
    vowel: false,
    strike: 1,
    entries: [ 'red', 'red blue', 'green', 'green', 'green yellow' ],
    solution: [ 'red', 'red blue', 'red blue yellow', 'red blue yellow yellow', 'yellow green' ]
  }
]

modules.forEach(({ vowel, strike, entries, solution }) => test(entries.join(', '), t => {
  const simonModule = new SimonModule(vowel, strike)
  entries.forEach((entry, i) => {
    const sequence = entry.split(' ')
    t.deepEqual(simonModule.solve(...sequence).join(' '), solution[i])
  })
}))
