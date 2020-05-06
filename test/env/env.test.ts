import { expect } from 'chai'

import { env } from '../../src'
import { MissingEnvironmentError } from '../../src/env/errors'

describe('env', () => {
  describe('get', () => {
    it('should get an existing environment variable', () => {
      const value = 'world'
      process.env.HELLO = value
      expect(env.get('HELLO')).to.equals(value)
    })

    it('should throw an error if the environment variable is not set', () => {
      const name = 'HELLOWORLD'
      expect(() => env.get(name)).to.throw(MissingEnvironmentError)
    })
  })
})
