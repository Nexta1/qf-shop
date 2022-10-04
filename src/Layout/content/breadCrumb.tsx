import { Breadcrumb } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import * as _ from 'lodash'
import routes, { Iroutes } from '@/router'
function flat() {
  let arr: Iroutes[] = []
  return function flat(tree: Iroutes[]) {
    tree.forEach(r => {
      if (r.children && r.children.length > 0) {
        r.children.forEach(i => {
          if (r.path && r.path !== '/') {
            i.path = `${r.path}/${i.path}`
          } else {
            i.path = '/' + i.path
          }
        })
        flat(r.children)
        delete r.children
      }
      arr.push(r)
    })
    return arr
  }
}
//渲染三次
const BreadCrumb = () => {
  const location = useLocation()
  const path = location.pathname.split('/').filter(r => r)
  let a = flat()
  let clone = _.cloneDeep(routes)
  let l = a(clone)
  let extraBreadcrumbItems = path.map(i => {
    let route = l.find(r => r.key === i)
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
  ].concat(extraBreadcrumbItems)

  return <Breadcrumb style={{ margin: '10px' }}>{breadcrumbItems}</Breadcrumb>
}

export default BreadCrumb
