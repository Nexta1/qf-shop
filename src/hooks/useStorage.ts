import { useLocation } from 'react-router-dom'
import { useMemo } from 'react'
type Imethods<T> = [T, { set: (data: any) => void; remove: () => void }]

const useStorage = <T>(key: any): Imethods<T> => {
  const location = useLocation()
  //设置
  const set = (data: any): void => {
    localStorage.setItem(key, JSON.stringify(data))
  }
  //获取token
  const get = useMemo<T>(() => {
    const cacheStore = localStorage.getItem(key)
    if (location)
      if (cacheStore) {
        return JSON.parse(cacheStore)
      } else {
        return null
      }
  }, [key, location])
  //移除
  const remove = (): void => {
    console.log(1)
    localStorage.removeItem(key)
  }
  return [get, { set, remove }]
}
export default useStorage
