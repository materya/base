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
const triggerOnFile = (
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
      triggerOnFile(path, action, prefix)
    } else {
      const name = path.replace(RegExp(`^${prefix}/`), '')
      action(name, path)
    }
  })
}

export default { triggerOnFile }
