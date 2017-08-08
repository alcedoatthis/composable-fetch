const { composableFetch, pipeP } = require('../index')
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
  composableFetch.retryableFetch,
  composableFetch.withTimeout(1000),
  composableFetch.withRetry(),
  composableFetch.withSafe204(),
  composableFetch.decodeTextResponse,
  decodeTransit,
  composableFetch.checkStatus,
)

fetchJSON({ url: '/', method: 'post', body: ['foo', 'bar'] }).then(log).catch(log)
