import * as fs from 'fs'
import { expect } from 'chai'

import { find } from '../../src/fs'
import { FileNotFoundError } from '../../src/fs/errors'

const basePath = '/tmp/materya_tests/fs.find'
const filename = 'conf.json'
const tree = ['foo', 'bar', 'ber']
const fullPath = `${basePath}/${tree.join('/')}`

describe('up', () => {
  before(() => {
    fs.mkdirSync(fullPath, { recursive: true })
  })

  after(() => {
    fs.rmdirSync(basePath, { recursive: true })
  })

  describe('when the file is somewhere along the path', () => {
    let cwd: string
    let filePath: string

    // eslint-disable-next-line mocha/no-setup-in-describe
    tree.forEach((dir, index) => {
      it(`should find a file in ${dir}`, () => {
        cwd = `${basePath}/${tree.slice(0, index + 1).join('/')}`
        filePath = `${cwd}/${filename}`
        fs.writeFileSync(filePath, '')

        const result = find.up(cwd, filename)
        expect(result).to.equals(filePath)

        fs.unlinkSync(filePath)
      })
    })
  })

  describe('when the file does not exist anywhere', () => {
    it('should raise an error', () => {
      expect(() => find.up(fullPath, filename)).to.throw(
        FileNotFoundError,
        `${filename} not found.`,
      )
    })
  })
})
