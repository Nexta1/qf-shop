import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input } from 'antd'
import { Rule } from 'antd/lib/form'
import React, { FC } from 'react'
import login from './index.module.scss'
import useStorage from '@/hooks/useStorage'
import { useNavigate } from 'react-router-dom'
import * as api from '@/Api/user'

const App: FC = () => {
  const [, TokenMethods] = useStorage('qf-token')
  const [, PermisionMethods] = useStorage('permission')
  const [, UserInfoMethods] = useStorage('user-info')
  const navigate = useNavigate()
  const onFinish = (values: { username: string; password: string }) => {
    const { username, password } = values
    api.login(username, password).then(r => {
      if (r.state) {
        TokenMethods.set(r.token)
        PermisionMethods.set(r.permission)
        UserInfoMethods.set(r.userInfo)
        navigate('/')
      }
    })
  }
  const passwordVaildata = (_: Rule, value: string) => {
    const passwordReg = /^[A-Za-z]+$/
    if (passwordReg.test(value)) {
      return Promise.resolve()
    } else {
      return Promise.reject('请输入')
    }
  }

  return (
    <div className={login.box}>
      <Form
        name="normal_login"
        className={login.form}
        onFinish={onFinish}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: '请输入用户名',
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" className={login.input} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              validator: passwordVaildata,
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} type="password" placeholder="Password" className={login.input} />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" shape="round" className={login.btn}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default App
