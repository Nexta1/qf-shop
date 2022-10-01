import React, { ReactNode } from 'react'
import { RouteObject } from 'react-router-dom'
import { BlockOutlined, ThunderboltOutlined, ShopOutlined, TagOutlined } from '@ant-design/icons'
let Login = React.lazy(() => import('@/pages/Login'))
let Page404 = React.lazy(() => import('@/pages/404'))
let PayManagerment = React.lazy(() => import('@/pages/PayManagerment'))
let PayType = React.lazy(() => import('@/pages/PayManagerment/PayType'))
let PictureManagerment = React.lazy(() => import('@/pages/PictureManagerment'))
let CarsouelManagerment = React.lazy(() => import('@/pages/PictureManagerment/CarsouelManagerment'))
let ProductManagerment = React.lazy(() => import('@/pages/ProductManagerment'))
let ProductCategory = React.lazy(() => import('@/pages/ProductManagerment/ProductCategory'))
let ProductList = React.lazy(() => import('@/pages/ProductManagerment/ProductList'))
let TransactionManagerment = React.lazy(() => import('@/pages/TransactionManagerment'))
let Amount = React.lazy(() => import('@/pages/TransactionManagerment/Amount'))
let Order = React.lazy(() => import('@/pages/TransactionManagerment/Order'))
let Refund = React.lazy(() => import('@/pages/TransactionManagerment/Refund'))
let ContentBase = React.lazy(() => import('@/Layout/content'))

export interface Iroutes extends RouteObject {
  label?: string
  key?: string
  icon?: ReactNode
  children?: Iroutes[]
}
const routes: Iroutes[] = [
  {
    path: '*',
    element: <Page404 />,
  },
  {
    path: '/login',
    element: <Login></Login>,
  },

  {
    path: '/',
    element: <ContentBase />,
    children: [
      {
        path: 'product',
        element: <ProductManagerment />,
        label: '商品管理',
        key: 'product',
        icon: <BlockOutlined />,
        children: [
          {
            path: 'category',
            element: <ProductCategory />,
            label: '产品类目',
            key: 'category',
          },
          {
            path: 'productlist',
            element: <ProductList />,
            label: '产品列表',
            key: 'productlist',
          },
        ],
      },
      {
        path: 'picture',
        element: <PictureManagerment />,
        label: '图片管理',
        icon: <ThunderboltOutlined />,
        key: 'picture',
        children: [
          {
            path: 'carousel',
            element: <CarsouelManagerment />,
            label: '轮播图管理',
            key: 'carousel',
          },
        ],
      },
      {
        path: 'transaction',
        element: <TransactionManagerment />,
        label: '交易管理',
        icon: <TagOutlined />,
        key: 'transaction',
        children: [
          {
            path: 'amount',
            element: <Amount />,
            label: '交易金额',
            key: 'amount',
          },
          {
            path: 'order',
            element: <Order />,
            label: '订单管理',
            key: 'order',
          },
          {
            path: 'refund',
            element: <Refund />,
            label: '退款管理',
            key: 'refund',
          },
        ],
      },
      {
        path: 'payment',
        element: <PayManagerment />,
        label: '支付管理',
        icon: <ShopOutlined />,
        key: 'payment',
        children: [
          {
            path: 'paytype',
            element: <PayType />,
            label: '支付类型',
            key: 'paytype',
          },
        ],
      },
    ],
  },
]
export default routes
