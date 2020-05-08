import * as fs from 'fs'

/**
 * Callback for adding two numbers.
 *
 * @callback fileActionCallback
 *
 * @param {string} name - Filename.
 * @param {string} path - Full file local path.
 */
export type fileActionCallback = (name: string, path: string) => void

/**
 * Crawl recursively in a given directory, triggering a callback for each file.
 *
 * @param {string} directory - The directory to start in.
 * @param {fileActionCallback} action - Action to trigger for each file found.
 * @param {string | null} truncate - Part of the directory path to remove
 *  in the final filename.
 */
const triggerOnFile = (
  directory: string,
  action: fileActionCallback,
  truncate: string | null = null,
): void => {
  const prefix = truncate || directory
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
