import React, { FC, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import UserLayout from '../index'
import { Content } from 'antd/lib/layout/layout'
import BreadCrumb from './breadCrumb'
import HistoryComponent from './history'
const UserContent: FC<{}> = () => {
  return (
    <UserLayout>
      <BreadCrumb />
      <HistoryComponent />
      <Content className="content" style={{ overflow: 'scroll' }}>
        <Suspense fallback="loading">
          <Outlet />
        </Suspense>
      </Content>
    </UserLayout>
  )
}

export default UserContent
