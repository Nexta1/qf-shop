import { http } from '@/utils/axios'
export let check = (product_id: string) =>
  http.request<{}>({
    url: '/cart/check',
    method: 'post',
    data: { product_id },
  })

export let get_cart = (product_id: string) =>
  http.request<{}>({
    url: '/cart/get_cart',
    params: { product_id },
  })
export let del_prouct = (product_id: string) =>
  http.request<{}>({
    url: '/cart/del_prouct',
    params: { product_id },
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
