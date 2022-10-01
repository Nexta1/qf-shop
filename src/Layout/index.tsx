import { Layout } from 'antd'

import { FC, ReactNode, useState } from 'react'
import UserHeader from './Header'
import UserMenu from './Menu'
import './index.scss'
type Iprops = {
  children: ReactNode
}
const UserLayout: FC<Iprops> = props => {
  const [collapsed, setCollapsed] = useState(false)

  const { Sider } = Layout
  const changeCollapsed = () => {
    setCollapsed(!collapsed)
  }
  return (
    <Layout hasSider>
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <UserMenu collapsed={collapsed} />
      </Sider>
      <Layout>
        <UserHeader collapsed={collapsed} setCollapsed={changeCollapsed} />
        {props.children}
      </Layout>
    </Layout>
  )
}
export default UserLayout
