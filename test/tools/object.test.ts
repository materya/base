import { expect } from 'chai'

import { object } from '../../src/tools'

describe('object', () => {
  describe('`isObject` method', () => {
    it('should properly refute everything that is not an object', () => {
      expect(object.isObject(null)).to.equal(false)
      expect(object.isObject(undefined)).to.equal(false)
      expect(object.isObject(42)).to.equal(false)
      expect(object.isObject(4.2)).to.equal(false)
      expect(object.isObject('string')).to.equal(false)
      expect(object.isObject([])).to.equal(false)
      expect(object.isObject(true)).to.equal(false)
      expect(object.isObject(false)).to.equal(false)
      expect(object.isObject(() => null)).to.equal(false)
      // eslint-disable-next-line func-names, prefer-arrow-callback
      expect(object.isObject(function () { return null })).to.equal(false)
      expect(object.isObject(new Date())).to.equal(false)
    })

    it('should properly identify an object', () => {
      expect(object.isObject({})).to.equal(true)
      // eslint-disable-next-line no-new-object
      expect(object.isObject(new Object())).to.equal(true)
      expect(object.isObject(Object.prototype)).to.equal(true)
      expect(object.isObject(Object.create(null))).to.equal(true)
    })
  })
})
