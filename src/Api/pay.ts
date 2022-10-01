import { http } from '@/utils/axios'
export let payment = <T>(data: T) =>
  http.request<{}>({
    url: '/pay/payment',
    method: 'post',
    data,
  })
