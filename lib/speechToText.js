const rec = require('node-record-lpcm16')
const { client } = require('./wit')

async function main () {
  let body = ''
  do {
    body = await rec
      .start({
        // Options from https://github.com/gillesdemey/node-record-lpcm16#options
        sampleRate: 16000,
        threshold: 0.7,
        thresholdStart: null,
        thresholdEnd: null,
        silence: '1.0',
        verbose: true,
        recordProgram: 'rec',
        device: null
      })
      // Use raw request instead of SDK because https://github.com/wit-ai/node-wit/issues/105#issuecomment-314800167
      .pipe(client({
        url: '/speech',
        method: 'POST',
        headers: { 'Content-Type': 'audio/wav' }
      }))
    console.log(JSON.stringify(body, null, 2))
  } while (true)
}

main()
