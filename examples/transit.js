const { composableFetch, pipeP } = require('../index')
const fetch = require('isomorphic-fetch')
const transit = require('transit-js')
const log = console.log.bind(console)
const writer = transit.writer('json')
const reader = transit.reader('json')

const decodeTransit = (res) => {
  res.body = reader.read(res.body)
  return res
}

const fetchJSON = pipeP(
  composableFetch.withBaseUrl('https://echo-http-server.herokuapp.com'),
  composableFetch.withHeader('Content-Type', 'application/json'),
  composableFetch.withHeader('Accept', 'application/json'),
  composableFetch.withEncodedBody((v) => writer.write(v)),
  composableFetch.retryable(pipeP(
    fetch,
    composableFetch.checkStatus
  )),
  composableFetch.withTimeout(1000),
  composableFetch.withRetry(),
  composableFetch.withSafe204(),
  composableFetch.decodeTextResponse,
  decodeTransit,
)

fetchJSON({ url: '/', method: 'post', body: ['foo', 'bar'] }).then(log).catch(log)
