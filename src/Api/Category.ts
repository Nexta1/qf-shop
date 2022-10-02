import { http } from '@/utils/axios'
interface IgetCategory {
  data: Icategory[]
}
export let addCategory = <T>(data: T) =>
  http.request<{}>({
    url: '/category/addCategory',
    method: 'post',
    data,
  })
export let delCategory = (category_id: string) =>
  http.request<{}>({
    url: '/category/delCategory',
    params: { category_id },
  })
export let updateCategory = <T>(data: T) =>
  http.request<{}>({
    url: '/category/updateCategory',
    method: 'post',
    data,
  })
export let getCategory = () =>
  http.request<IgetCategory>({
    url: '/category/getCategory',
  })
