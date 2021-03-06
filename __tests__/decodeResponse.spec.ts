import { composableFetch } from '../index'

class Headers {
  private headers: object
  constructor(headers) {
    this.headers = headers
  }
  public get(header) {
    return this.headers[header]
  }
}

describe('decodeResponse', () => {
  it('decodes text response', async () => {
    const res = {
      headers: new Headers({}),
      text: () => Promise.resolve('foo'),
    }
    const decodedRes = await composableFetch.decodeResponse(res as any)
    expect((decodedRes as any).data).toBe('foo')
  })

  it('decodes json response when content-type starts with application/json', async () => {
    const res = {
      headers: new Headers({ 'content-type': 'application/json' }),
      json: () => Promise.resolve('foo'),
    }
    const decodedRes = await composableFetch.decodeResponse(res as any)
    expect((decodedRes as any).data).toBe('foo')
  })

  it('decodes json response when content-type starts with application/json', async () => {
    const res = {
      headers: new Headers({ 'content-type': 'application/json; transit' }),
      json: () => Promise.resolve('foo'),
    }
    const decodedRes = await composableFetch.decodeResponse(res as any)
    expect((decodedRes as any).data).toBe('foo')
  })

  it('decodes formData response when content-type starts with application/x-www-form-urlencoded', async () => {
    const res = {
      formData: () => Promise.resolve('foo'),
      headers: new Headers({ 'content-type': 'application/x-www-form-urlencoded' }),
    }
    const decodedRes = await composableFetch.decodeResponse(res as any)
    expect((decodedRes as any).data).toBe('foo')
  })
})
