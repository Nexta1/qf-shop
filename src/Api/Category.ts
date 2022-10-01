import { http } from '@/utils/axios'

export let addCategory = (categoryName: string, categoryImgurl: string) =>
  http.request<{}>({
    url: '/category/addCategory',
    method: 'post',
    data: { categoryName, categoryImgurl },
  })
export let delCategory = (category_id: string) =>
  http.request<{}>({
    url: '/category/delCategory',
    params: { category_id },
  })
export let updateCategory = (categoryName: string, category_id: string) =>
  http.request<{}>({
    url: '/category/updateCategory',
    method: 'post',
    data: { categoryName, category_id },
  })
export let getCategory = () =>
  http.request<{}>({
    url: '/category/getCategory',
  })
