import * as fs from 'fs'
import * as path from 'path'

import { FileNotFoundError } from './errors'

/**
 * Find a given file in a given path or anywhere up the tree.
 *
 * @module find
 * @param {string} cwd - The directory to start in.
 * @param {string} name - File name to search for.
 * @returns {string} The definitive path of the file.
 * @throws {FileNotFoundError} if no file has been found.
 */
const up = (cwd: string, name: string): string => {
  const absPath = path.join(cwd, name)
  try {
    fs.statSync(absPath)
    return absPath
  } catch (error) {
    if (cwd !== '/') return up(path.dirname(cwd), name)
    throw new FileNotFoundError(absPath)
  }
}

export default { up }
