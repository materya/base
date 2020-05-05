import { expect } from 'chai'

import { sequential } from '../../src/promise'

let resolveOrder: Array<number> = []

const callback = (r: CallableFunction) => (v: number): Promise<number> => {
  resolveOrder.push(v)
  return r(v)
}

const promise = async <T extends number>(v: T): Promise<T> => (
  new Promise(resolve => setTimeout(callback(resolve), 50 / v, v))
)

describe('sequential', () => {
  beforeEach(() => { resolveOrder = [] })

  it('should resolve sequentially', async () => {
    const sequence = [1, 2, 3, 4, 5]
    const results = await sequential(sequence, promise)

    expect(resolveOrder).to.deep.equal(sequence)
    expect(results).to.deep.equal(sequence)
  })

  it('should not be sequential with Promise.all()', async () => {
    const sequence = [1, 2, 3, 4, 5]
    const results = await Promise.all(sequence.map(promise))

    expect(resolveOrder).to.deep.equal(sequence.slice().reverse())
    expect(results).to.deep.equal(sequence)
  })
})
