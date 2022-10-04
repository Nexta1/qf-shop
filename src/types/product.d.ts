type IaddProduct = {
  category_id: string
  productName: string
  price: number
  description: string
  inventory: number
  imageUrl: any
}
interface Iproduct {
  category_id: string
  description: string
  imageUrl: string
  inventory: number
  price: number
  productName: string
  product_id: string
  updateTime: null
  updator: null
  _id: string
  image: import('react').ReactNode
}
