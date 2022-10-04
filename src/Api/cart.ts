import { http } from '@/utils/axios'
interface IgetCart {
  data: IcartProduct[]
}
export let check = (product_id: string) =>
  http.request<{}>({
    url: '/cart/check',
    method: 'post',
    data: { product_id },
  })

export let get_cart = () =>
  http.request<IgetCart>({
    url: '/cart/get_cart',
  })
export let del_prouct = (card_id: string) =>
  http.request<{}>({
    url: '/cart/del_cart',
    params: { card_id },
  })
export let update_cart = <T>(data: T) =>
  http.request<{}>({
    url: '/cart/update_cart',
    method: 'post',
    data,
  })
export let add_to_cart = <T>(data: T) =>
  http.request<{}>({
    url: '/cart/add_to_cart',
    method: 'post',
    data,
  })
