import { Menu } from 'antd'
import routes from '@/router'
import type { MenuProps } from 'antd'
import { Iroutes } from '@/router'
import { FC, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { GithubOutlined } from '@ant-design/icons'
type MenuItem = Required<MenuProps>['items'][number]
type Iitem = MenuItem & { children?: MenuItem[] }
const MenuLists = (data: Iroutes[]) => {
  let MenuList: MenuItem[] = []
  data.forEach(item => {
    let obj: Iitem = {
      key: item.key!,
      label: item.label,
      icon: item.icon,
    }
    if (item.children && item.children.length > 0) {
      obj.children = MenuLists(item.children)
    }
    MenuList.push(obj)
  })
  return MenuList
}
type Iprops = { collapsed: boolean }
const UserMenu: FC<Iprops> = props => {
  const [menuProps, setmenuProps] = useState({})
  const [pathOpen, setpathOpen] = useState(false)
  const { pathname: path } = useLocation()
  const selectOpen = path && path.split('/')[1]
  const select = path && path.split('/')[2]
  const { collapsed } = props
  const target = routes.find(item => item.path === '/')
  const navigate = useNavigate()
  const Lists = MenuLists(target?.children!)
  const toTarget = (item: any) => {
    let link = item.keyPath.reverse().join('/')
    navigate('/' + link)
  }
  const openMenu = (opens: any) => {
    setmenuProps({ openKeys: opens })
  }
  useEffect(() => {
    if (collapsed) {
      setpathOpen(true)
      setmenuProps({ openKeys: [] })
    } else {
      if (pathOpen) setmenuProps({ openKeys: [selectOpen] })
      setpathOpen(false)
    }
  }, [collapsed, selectOpen, pathOpen])

  return (
    <>
      <div className="logo">
        <GithubOutlined style={{ color: 'white', fontSize: '20px', lineHeight: '32px', padding: '0 10px' }} />
        {!collapsed && <h1>Welcome</h1>}
      </div>

      <Menu
        theme="dark"
        items={Lists}
        onClick={toTarget}
        mode="inline"
        {...menuProps}
        onOpenChange={openMenu}
        selectedKeys={[select]}
      />
    </>
  )
}
export default UserMenu
