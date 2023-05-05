import { expect } from 'chai'

import { exclude } from '../../src/tools'

describe('exclude', () => {
  it('should exclude given keys from a object and return a new one', async () => {
    const obj = {
      a: 'foo',
      b: 42,
      c: 'bar',
      d: { obj: 'foobar' },
    }

    const result = exclude(obj)('b', 'd')
    expect(result).to.deep.equal({
      a: 'foo',
      c: 'bar',
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

    const result = exclude(obj)('a', 'b')
    expect(result).to.deep.equal({
      c: 'bar',
    })
  })
})
