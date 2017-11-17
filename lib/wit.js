const { Wit, log } = require('node-wit')
const config = require('../config')
const request = require('request-promise-native')

const sdk = new Wit({
  accessToken: config.witToken,
  logger: new log.Logger(log.DEBUG)
})

const client = request.defaults({
  baseUrl: 'https://api.wit.ai/',
  headers: {
    Accept: 'application/vnd.wit.20170307+json'
  },
  auth: {
    bearer: config.witToken
  },
  json: true
})

module.exports = {
  sdk, client
}
