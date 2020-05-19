import * as mock from 'mock-fs'
import { expect } from 'chai'

import { FileNotFoundError } from '../../src/fs/errors'
import { list } from '../../src/fs'

const basePath = 'relative/path'

describe('list', () => {
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
    expect(list(basePath)).to.deep.equal({
      files: ['file1', 'file2'],
      directories: {},
    })
  })

  it('should follow directories with one depth', () => {
    expect(list(basePath, 1)).to.deep.equal({
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
    expect(list(basePath, 2)).to.deep.equal({
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
    expect(list(basePath, 5)).to.deep.equal({
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
    expect(() => list('foo/bar', 1)).to.throw(FileNotFoundError)
  })
})
