import { expect } from 'chai'

import { pick } from '../../src/tools'

describe('pick', () => {
  it('should pick given keys from a object and return a new one', async () => {
    const obj = {
      a: 'foo',
      b: 42,
      c: 'bar',
      d: { obj: 'foobar' },
    }

    const result = pick(obj)('b', 'd')
    expect(result).to.deep.equal({
      b: 42,
      d: { obj: 'foobar' },
    })

    // Ensure initial object has not been mutated
    expect(obj).to.deep.equal({
      a: 'foo',
      b: 42,
      c: 'bar',
      d: { obj: 'foobar' },
    })
  })

  it('should handle optional parameters', async () => {
    type Obj = {
      a: string
      b?: string
      c: string
    }
    const obj: Obj = {
      a: 'foo',
      c: 'bar',
    }

    const result = pick(obj)('a', 'b')
    expect(result).to.deep.equal({
      a: 'foo',
    })
  })
})
