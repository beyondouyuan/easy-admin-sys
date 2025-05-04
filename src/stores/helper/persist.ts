/**
 * @description pinia 持久化参数配置
 * @param {String} key 存储到持久化的 name
 * @return persist
 * */
const piniaPersistConfigure = (key: string) => {
  const persist = {
    key,
    storage: localStorage,
  }
  return persist
}

export default piniaPersistConfigure
