import { expect } from 'chai'

import { merge } from '../../src/tools'
import { InconsistentSourceTypeError } from '../../src/tools/errors'
import { MissingArgumentsError } from '../../src/errors'

describe('merge', () => {
  it('should merge maps', async () => {
    const map1 = {
      foo: 42,
      ber: { bar: 'foo', foo: { ber: 'bar' } },
    }
    const map2 = {
      ber: { foo: { foo: 'foo' }, bar: 'bar' },
    }
    const match = {
      foo: 42,
      ber: { bar: 'bar', foo: { ber: 'bar', foo: 'foo' } },
    }

    const result = merge(map1, map2)

    expect(result).to.deep.equal(match)
  })

  it('should merge arrays', async () => {
    const array1 = ['foo', 'bar']
    const array2 = ['ber', 'foobar']
    const match = ['foo', 'bar', 'ber', 'foobar']

    const result = merge(array1, array2)

    expect(result).to.deep.equal(match)
  })

  it('should merge nested maps & arrays', async () => {
    const map1 = { foo: { bar: [1, 2] } }
    const map2 = { foo: { bar: [3, 4], ber: 'foo' } }
    const match = { foo: { bar: [1, 2, 3, 4], ber: 'foo' } }

    const result = merge(map1, map2)

    expect(result).to.deep.equal(match)
  })

  it('should raise if sources type does not match', async () => {
    const source1 = { foo: 'bar' }
    const source2 = ['foo', 'bar']

    expect(() => merge(source1, source2)).to.throw(InconsistentSourceTypeError)
  })

  it('should raise if not at least 2 sources are provided', async () => {
    const source1 = { foo: 'bar' }

    expect(() => merge(source1)).to.throw(MissingArgumentsError)
  })
})
