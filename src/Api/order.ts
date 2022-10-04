import { http } from '@/utils/axios'
type IgetOrder = {
  data: Iorder[]
}
export let pre_order = <T>(data: T) =>
  http.request<{}>({
    url: '/pay/pre_order',
    method: 'post',
    data,
  })
export let order_status = (order_id: string) =>
  http.request<{}>({
    url: '/order/query_order_status',
    params: { order_id },
  })
//订单详情
export let get_order = (order_id?: string) =>
  http.request<IgetOrder>({
    url: '/order/get_order',
    method: 'post',
    data: { order_id },
  })
export let del_order = (order_id: string) =>
  http.request<{}>({
    url: '/order/del_order',
    params: { order_id },
  })
