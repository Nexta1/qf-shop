import { http } from '@/utils/axios'

interface IgetProduct {
  data: Partial<Iproduct>[]
  total: number
}
export let getProduct = (product_id?: string, category_id?: string) =>
  http.request<IgetProduct>({
    url: '/product/get_product',
    params: { product_id, category_id },
  })
export let update_product = <T>(data: T) =>
  http.request<IgetProduct>({
    url: '/product/update_product',
    method: 'post',
    data,
  })
export let del_product = (product_id: string) =>
  http.request<IgetProduct>({
    url: '/product/del_product',
    params: { product_id },
  })
export let add_product = <T>(data: T) =>
  http.request<IgetProduct>({
    url: '/product/add_product',
    method: 'post',
    data,
  })
