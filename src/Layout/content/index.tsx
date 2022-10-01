import React, { FC, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import UserLayout from '../index'
import { Content } from 'antd/lib/layout/layout'
import BreadCrumb from './breadCrumb'
const UserContent: FC<{}> = () => {
  return (
    <UserLayout>
      <Content className="content">
        <Suspense fallback="loading">
          <BreadCrumb />
          <Outlet />
        </Suspense>
      </Content>
    </UserLayout>
  )
}

export default UserContent
