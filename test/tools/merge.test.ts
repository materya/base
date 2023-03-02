import { expect } from 'chai'

import { merge } from '../../src/tools'
import { MissingArgumentsError } from '../../src/errors'

describe('merge', () => {
  it('should merge maps', async () => {
    interface Merger {
      foo: number
      bar: {
        ber: string
        foobar: Record<string, unknown>
      }
    }

    const map1: Merger = {
      foo: 42,
      bar: { ber: 'foo', foobar: { ber: 'bar', bar: [4, 5] } },
    }
    const map2: Partial<Merger> = {
      bar: { foobar: { foo: 'foo', bar: [1, 2, 3] }, ber: 'bar' },
    }

    const match: Merger = {
      foo: 42,
      bar: {
        ber: 'bar',
        foobar: {
          ber: 'bar',
          foo: 'foo',
          bar: [4, 5, 1, 2, 3],
        },
      },
    }

    const result = merge(map1, map2)

    expect(result).to.deep.equal(match)
  })

  it('should merge partial maps', async () => {
    type Bar = {
      foo: string
    }

    interface Foo {
      bar: Bar
      ber: string
    }

    interface Merger {
      foo: number
      bar: {
        foo: Foo
        ber: Record<string, unknown>
      }
    }

    const map1: Merger = {
      foo: 42,
      bar: {
        foo: {
          bar: {
            foo: 'foo',
          },
          ber: 'ber',
        },
        ber: { ber: 'bar', bar: [4, 5] },
      },
    }

    const match: Merger = {
      foo: 42,
      bar: {
        foo: {
          bar: {
            foo: 'update',
          },
          ber: 'ber',
        },
        ber: {
          ber: 'bar',
          bar: [4, 5],
        },
      },
    }

    const result = merge(map1, {
      bar: {
        foo: {
          bar: { foo: 'update' },
        },
      },
    })

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

  type TypeWithUnion = {
    foo: {
      bar: number[] | { ber: string } | number
    }
  }

  const unionsTest: {
    map1: TypeWithUnion
    map2: TypeWithUnion
    match: TypeWithUnion
  }[] = [{
    map1: { foo: { bar: [1, 2] } },
    map2: { foo: { bar: { ber: 'foo' } } },
    match: { foo: { bar: { ber: 'foo' } } },
  }, {
    map1: { foo: { bar: { ber: 'foo' } } },
    map2: { foo: { bar: [1, 2] } },
    match: { foo: { bar: [1, 2] } },
  }, {
    map1: { foo: { bar: [1, 2] } },
    map2: { foo: { bar: 1 } },
    match: { foo: { bar: 1 } },
  }, {
    map1: { foo: { bar: 1 } },
    map2: { foo: { bar: [1, 2] } },
    match: { foo: { bar: [1, 2] } },
  }]
  // eslint-disable-next-line mocha/no-setup-in-describe
  unionsTest.forEach(({ map1, map2, match }) => {
    it('should override if type are differents (union)', async () => {
      const result = merge(map1, map2)

      expect(result).to.deep.equal(match)
    })
  })
})
