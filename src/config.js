// 管理eos配置文件
import { init, get, set, getAll, remove } from './utils/rc'

let config = async (action, key, value) => {
  switch (action) {
    case 'init':
      await init()
      break
    case 'get':
      if (key) {
        let result = await get(key)
        console.log(result)
      } else {
        let obj = await getAll()
        Object.keys(obj).forEach(key => {
          console.log(`${key}=${obj[key]}`)
        })
      }
      break
    case 'set':
      set(key, value)
      break
    case 'remove':
      remove(key)
      break
    default:
      break
  }
}

module.exports = config
