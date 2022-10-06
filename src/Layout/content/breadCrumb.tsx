import { Breadcrumb } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import routes, { Iroutes } from '@/router'
import useFlat from '@/hooks/useFlat'

export const GetRoutes = (routes: Iroutes[]) => {
  // 闭包
  let FlatTree = useFlat()
  let RouteFlat = FlatTree(routes)
  //解决
  FlatTree = null!
  return RouteFlat
}

//渲染三次,放到外面解决
const BreadCrumb = () => {
  const location = useLocation()
    .pathname.split('/')
    .filter(r => r)
  location.shift()
  const RouteFlat = GetRoutes(routes)
  const extraBreadcrumbItems = location?.map(i => {
    let route = RouteFlat?.find(r => r.key === i)
    return (
      <Breadcrumb.Item key={i}>
        <Link to={route?.path!}>{route?.label}</Link>
      </Breadcrumb.Item>
    )
  })

  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">首页</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems!)

  return <Breadcrumb style={{ margin: '10px' }}>{breadcrumbItems}</Breadcrumb>
}

export default BreadCrumb
