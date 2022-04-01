import { expect } from 'chai'

import { merge } from '../../src/tools'
import { MissingArgumentsError } from '../../src/errors'

describe('merge', () => {
  it('should merge maps', async () => {
    interface Merger {
      foo: number
      bar: {
        ber: string
        foobar: Record<string, string>
      }
    }

    const map1: Merger = {
      foo: 42,
      bar: { ber: 'foo', foobar: { ber: 'bar' } },
    }
    const map2: Partial<Merger> = {
      bar: { foobar: { foo: 'foo' }, ber: 'bar' },
    }

    const match: Merger = {
      foo: 42,
      bar: { ber: 'bar', foobar: { ber: 'bar', foo: 'foo' } },
    }

    const result = merge<Merger>(map1, map2)

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

  it('should raise if 2 sources are not at least provided', async () => {
    const source1 = { foo: 'bar' }

    expect(() => merge(source1)).to.throw(MissingArgumentsError)
  })
})
