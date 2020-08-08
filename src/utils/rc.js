// 配置文件
import { RC, DEFAULTS } from './constants'
import { decode, encode } from 'ini'
import { promisify } from 'util'
import chalk from 'chalk'
import fs from 'fs'

const exists = promisify(fs.exists)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

export const init = async () => {
  await writeFile(RC, encode(DEFAULTS), 'utf8')
}

export const get = async (key) => {
  console.log(RC)
  const exist = await exists(RC)
  if (!exist) return ''
  let opts = await readFile(RC, 'utf8')
  opts = decode(opts)
  return opts[key]
}

export const getAll = async () => {
  const exist = await exists(RC)
  if (!exist) return {}
  let opts = await readFile(RC, 'utf8')
  opts = decode(opts)
  return opts
}

function error(message) {
  console.log(chalk.red(chalk.bold('Error:')), chalk.red(message))
}

export const set = async (key, value) => {
  const exist = await exists(RC)
  if (!exist) return
  if (!key) {
    error('key is required')
    return
  }
  if (!value) {
    error('value is required')
    return
  }
  let opts = await readFile(RC, 'utf8')
  opts = decode(opts)
  Object.assign(opts, { [key]: value })
  await writeFile(RC, encode(opts), 'utf8')
}

export const remove = async (key) => {
  const exist = await exists(RC)
  if (!exist) return
  let opts = await readFile(RC, 'utf-8')
  opts = decode(opts)
  delete opts[key]
  await writeFile(RC, encode(opts), 'utf8')
}
