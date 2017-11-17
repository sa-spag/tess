/**
 *      _   _   _
 * :_  :_: :_  :_
 * :_  :_   _:  _:
 */

console.log(`

     _   _   _
)_  )_) )_  )_
)_  )_   _)  _)

`)

const router = require('./lib/router')

async function main () {
  const data = {}
  let stage
  let Stage = router()
  while (Stage) {
    stage = new Stage(data)
    stage.start()
    await stage.process()
    Object.assign(data, stage.done())
    Stage = router(stage)
  }
}

main()
