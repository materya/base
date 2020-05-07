import { expect } from 'chai'

import { env } from '../../src'
import { MissingEnvironmentError } from '../../src/env/errors'

const name = 'HELLO'
const value = 'world'
const defaultValue = 'wrong'

describe('env', () => {
  describe('get', () => {
    beforeEach(() => {
      delete process.env[name]
    })

    context('without `defaultValue` provided', () => {
      it('should get an existing environment variable', () => {
        process.env[name] = value
        expect(env.get(name)).to.equals(value)
      })

      it('should throw an error if environment variable not set', () => {
        expect(() => env.get(name)).to.throw(MissingEnvironmentError)
      })
    })

    context('with `defaultValue` provided', () => {
      it('should get an existing environment variable', () => {
        process.env[name] = value
        expect(env.get(name, defaultValue)).to.equals(value)
      })

      it('should use the default value if env variable not set', () => {
        expect(env.get(name, defaultValue)).to.equals(defaultValue)
      })
    })
  })
})
