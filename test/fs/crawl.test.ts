import * as mock from 'mock-fs'
import { expect } from 'chai'

import type { FileActionCallback } from '../../src/fs'
import { crawl } from '../../src/fs'
import { FileNotFoundError } from '../../src/fs/errors'

const basePath = 'relative/path'

const results = [
  'bar/ber/img.png',
  'foo/bar/ber',
  'foo/bar.txt',
]

describe('crawl', () => {
  beforeEach(() => {
    mock({
      [basePath]: {
        bar: { ber: { 'img.png': 'content' } },
        foo: {
          bar: { ber: 'content' },
          'bar.txt': 'content',
        },
      },
    })
  })

  afterEach(() => {
    mock.restore()
  })

  it('should pass the right values to callback function', () => {
    const cb: FileActionCallback = (name, path) => {
      expect(results).to.includes(name)
      expect(path).to.equals(`${basePath}/${name}`)
    }

    crawl.triggerOnFile(basePath, cb)
  })

  it('should raise if directory does not exist', () => {
    const cb: FileActionCallback = (_name, _path): void => { /* do nothing */ }
    expect(() => crawl.triggerOnFile('foo/bar', cb))
      .to.throw(FileNotFoundError)
  })
})
