import * as mock from 'mock-fs'
import { expect } from 'chai'

import type { fileActionCallback } from '../../src/fs/crawl'
import { crawl } from '../../src/fs'

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
    const cb: fileActionCallback = (name, path) => {
      expect(results).to.includes(name)
      expect(path).to.equals(`${basePath}/${name}`)
    }

    crawl.triggerOnFile(basePath, cb)
  })
})
