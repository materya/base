import * as fs from 'fs'

import { FileNotFoundError } from './errors'

/**
 * FilesDirectory
 *
 * @typedef FilesDirectory
 * @type {object}
 *
 * @property {Array.<string>} files - List of local filenames.
 * @property {FilesDirectory} [directories] - List of directories.
 */
export type FilesDirectory = {
  files: Array<string>
  directories: Record<string, FilesDirectory>
}

/**
 * List all files recursively in a given directory.
 *
 * @param {string} path - A path to a directory to list.
 * @param {number} [depth] - How deep the files listing should recursively be.
 *
 * @returns {object} A list of files by directories.
 *
 * @throws {FileNotFoundError} if the path does not exist.
 */
export const list = (path: string, depth = 0): FilesDirectory => {
  try {
    fs.statSync(path).isDirectory()
  } catch (error) {
    throw new FileNotFoundError(path)
  }

  return fs.readdirSync(path).reduce((acc: FilesDirectory, file: string) => {
    const uri = `${path}/${file}`
    const stat = fs.statSync(uri)

    return {
      files: [
        ...acc.files,
        ...(stat.isFile() ? [file] : []),
      ],
      directories: {
        ...acc.directories,
        ...(
          stat.isDirectory() && depth > 0
            && { [file]: list(uri, depth - 1) }
        ),
      },
    }
  }, { files: [], directories: {} })
}

export default { list }
