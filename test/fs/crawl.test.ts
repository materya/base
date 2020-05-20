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

    crawl.trigger(basePath, cb)
  })

  it('should raise if directory does not exist', () => {
    const cb: FileActionCallback = (_name, _path): void => { /* do nothing */ }
    expect(() => crawl.trigger('foo/bar', cb))
      .to.throw(FileNotFoundError)
  })
})

describe('tree', () => {
  beforeEach(() => {
    mock({
      [basePath]: {
        file1: 'content',
        file2: 'content',
        directory1: {
          file3: 'content',
          file4: 'content',
          directory2: {
            file5: 'content',
          },
          directory3: {
            file6: 'content',
            directory4: {},
          },
        },
      },
    })
  })

  afterEach(() => {
    mock.restore()
  })

  it('should list current files without depth', () => {
    expect(crawl.tree(basePath)).to.deep.equal({
      files: ['file1', 'file2'],
      directories: {},
    })
  })

  it('should follow directories with one depth', () => {
    expect(crawl.tree(basePath, 1)).to.deep.equal({
      files: ['file1', 'file2'],
      directories: {
        directory1: {
          directories: {},
          files: ['file3', 'file4'],
        },
      },
    })
  })

  it('should follow directories with more depths', () => {
    expect(crawl.tree(basePath, 2)).to.deep.equal({
      files: ['file1', 'file2'],
      directories: {
        directory1: {
          files: ['file3', 'file4'],
          directories: {
            directory2: {
              directories: {},
              files: ['file5'],
            },
            directory3: {
              directories: {},
              files: ['file6'],
            },
          },
        },
      },
    })
  })

  it('should handle empty directories', () => {
    expect(crawl.tree(basePath, 5)).to.deep.equal({
      files: ['file1', 'file2'],
      directories: {
        directory1: {
          files: ['file3', 'file4'],
          directories: {
            directory2: {
              directories: {},
              files: ['file5'],
            },
            directory3: {
              files: ['file6'],
              directories: {
                directory4: {
                  files: [],
                  directories: {},
                },
              },
            },
          },
        },
      },
    })
  })

  it('should raise if directory does not exist', () => {
    expect(() => crawl.tree('foo/bar', 1)).to.throw(FileNotFoundError)
  })
})
