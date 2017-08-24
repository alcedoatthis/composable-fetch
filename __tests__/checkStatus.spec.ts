import { composableFetch } from '../index'

describe('checkStatus', () => {
  it('passes untouched res for res.status >= 200 && res.status < 400', async () => {
    const res = { status: 200 }
    expect(composableFetch.checkStatus(res as any)).toBe(res)
  })

  it('fails for res.status < 200', async () => {
    try {
      const res = { status: 100 }
      composableFetch.checkStatus(res as any)
      fail()
    } catch (e) {
      expect(e).toBeInstanceOf(Error)
    }
  })

  it('fails for res.status >= 400', async () => {
    try {
      const res = { status: 400 }
      composableFetch.checkStatus(res as any)
      fail()
    } catch (e) {
      expect(e).toBeInstanceOf(Error)
    }
  })
})
