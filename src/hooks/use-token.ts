import { storageInstance } from '@/shared/storage'

const KEY = 'TOKEN'

export function getToken() {
  const result = storageInstance.get(KEY) || ''
  return result as string
}

export function setToken(token: string) {
  storageInstance.set(KEY, token)
}

export default function useToken() {
  const token = getToken()
  return [token, setToken]
}
