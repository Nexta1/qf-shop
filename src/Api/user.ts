import { http } from '@/utils/axios'
export interface UserInfo {
  username: string
  nickname: string
  phone: number
  headimgurl: string
}
export interface UserLogin {
  token?: string
  permission?: { buttons: string[] }
  userInfo?: UserInfo
}

export function login(username: string, password: string) {
  return http.request<UserLogin>({
    url: `/users/login`,
    method: 'post',
    data: { username, password },
  })
}
