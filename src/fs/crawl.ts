import * as fs from 'fs'

import { FileNotFoundError } from './errors'

/**
 * Callback for adding two numbers.
 *
 * @callback FileActionCallback
 *
 * @param {string} name - Filename.
 * @param {string} path - Full file local path.
 */
export type FileActionCallback = (name: string, path: string) => void

/**
 * Crawl recursively in a given directory, triggering a callback for each file.
 *
 * @module crawl
 *
 * @param {string} directory - The directory to start in.
 * @param {FileActionCallback} action - Action to trigger for each file found.
 * @param {string | null} truncate - Part of the directory path to remove
 *  in the final filename.
 */
const trigger = (
  directory: string,
  action: FileActionCallback,
  truncate: string | null = null,
): void => {
  const prefix = truncate || directory
  try {
    fs.statSync(directory).isDirectory()
  } catch (error) {
    throw new FileNotFoundError(directory)
  }

  fs.readdirSync(directory).forEach(item => {
    const path = `${directory}/${item}`
    if (fs.lstatSync(path).isDirectory()) {
      trigger(path, action, prefix)
    } else {
      const name = path.replace(RegExp(`^${prefix}/`), '')
      action(name, path)
    }
  })
}

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
 * List all files recursively from a given directory.
 *
 * @module crawl
 *
 * @param {string} path - A path to a directory to list.
 * @param {number} [depth] - How deep the files listing should recursively be.
 *
 * @returns {object} A list of files by directories.
 *
 * @throws {FileNotFoundError} if the path does not exist.
 */
const tree = (path: string, depth = 0): FilesDirectory => {
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
            && { [file]: tree(uri, depth - 1) }
        ),
      },
    }
  }, { files: [], directories: {} })
}

export default { tree, trigger }
