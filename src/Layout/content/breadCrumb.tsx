import { Breadcrumb } from 'antd'
import { useLocation } from 'react-router-dom'
import routes, { Iroutes } from '@/router'

const BreadCrumb = () => {
  const location = useLocation()
  const path = location.pathname.split('/').filter(r => r)
  return (
    <Breadcrumb>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item></Breadcrumb.Item>
    </Breadcrumb>
  )
}

export default BreadCrumb
