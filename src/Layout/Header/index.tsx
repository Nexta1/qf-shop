import { Header } from 'antd/lib/layout/layout'
import React, { FC } from 'react'
import { Avatar, Col, Row } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

import { Popover } from 'antd'
import useStorage from '@/hooks/useStorage'
import { UserInfo } from '@/Api/user'
import { useNavigate } from 'react-router-dom'
type Iprops = {
  collapsed: boolean
  setCollapsed: () => void
}

const UserHeader: FC<Iprops> = props => {
  let { collapsed, setCollapsed } = props
  const [userInfo, Usermethods] = useStorage<UserInfo>('user-info')
  const [, Tokenmethods] = useStorage<UserInfo>('qf-token')
  const navigate = useNavigate()

  const Content = (
    <div>
      <p>{userInfo?.nickname}</p>
      <p>{userInfo?.phone}</p>
      <p
        style={{ cursor: 'pointer' }}
        onClick={() => {
          Usermethods.remove()
          Tokenmethods.remove()
          navigate('/login', { replace: true })
        }}
      >
        退出登陆
      </p>
    </div>
  )
  return (
    <>
      <Header
        className="site-layout-background"
        style={{
          padding: 0,
        }}
      >
        <Row>
          <Col span={2}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              style: { color: 'white' },
              onClick: () => setCollapsed(),
            })}
          </Col>
          <Col span={16} style={{ color: 'white', textAlign: 'center', fontSize: '20px' }}>
            『S』『H』『O』『P』
          </Col>
          <Col span={6}>
            <Popover placement="bottomLeft" trigger="hover" content={Content}>
              <Avatar size={32} src={userInfo.headimgurl} shape="square" />
            </Popover>
          </Col>
        </Row>
      </Header>
    </>
  )
}
export default UserHeader
