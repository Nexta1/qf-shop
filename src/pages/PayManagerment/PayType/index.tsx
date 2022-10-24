import { Alert, Button, Radio } from 'antd'
import { Card } from 'antd'
import React from 'react'
import img1 from '@/assets/1.png'
import img2 from '@/assets/2.png'
import img3 from '@/assets/3.png'
import img4 from '@/assets/4.png'
const PayType = () => {
  return (
    <>
      <Alert message="Informational Notes" type="info" showIcon style={{}} />
      <div style={{ background: '#ddd', marginTop: '20px', fontSize: 16, fontWeight: 'bolder', padding: 10 }}>
        支付方式
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
        <Card style={{ width: 300 }}>
          <img src={img1} alt="" style={{ width: '250px', height: 100 }} />
          <p>支付宝（中国）网络技术有限公司是国内领先的第三方支付平台，致力于提供简单、安全、快捷的支付解决方案</p>
          <Radio.Group style={{ display: 'flex', justifyContent: 'center' }}>
            <Radio value="1"> 启用</Radio>
            <Radio value="2"> 关闭</Radio>
          </Radio.Group>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
            <Button type="primary">设置</Button>
            <Button style={{ background: 'red', color: 'white' }}>删除</Button>
          </div>
        </Card>
        <Card style={{ width: 300 }}>
          <img src={img2} alt="" style={{ width: '250px', height: 100 }} />
          <p>支付宝（中国）网络技术有限公司是国内领先的第三方支付平台，致力于提供简单、安全、快捷的支付解决方案</p>
          <Radio.Group style={{ display: 'flex', justifyContent: 'center' }}>
            <Radio value="1"> 启用</Radio>
            <Radio value="2"> 关闭</Radio>
          </Radio.Group>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
            <Button type="primary">设置</Button>
            <Button style={{ background: 'red', color: 'white' }}>删除</Button>
          </div>
        </Card>
        <Card style={{ width: 300 }}>
          <img src={img3} alt="" style={{ width: '250px', height: 100 }} />
          <p>支付宝（中国）网络技术有限公司是国内领先的第三方支付平台，致力于提供简单、安全、快捷的支付解决方案</p>
          <Radio.Group style={{ display: 'flex', justifyContent: 'center' }}>
            <Radio value="1"> 启用</Radio>
            <Radio value="2"> 关闭</Radio>
          </Radio.Group>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
            <Button type="primary">设置</Button>
            <Button style={{ background: 'red', color: 'white' }}>删除</Button>
          </div>
        </Card>
        <Card style={{ width: 300 }}>
          <img src={img4} alt="" style={{ width: '250px', height: 100 }} />
          <p>支付宝（中国）网络技术有限公司是国内领先的第三方支付平台，致力于提供简单、安全、快捷的支付解决方案</p>
          <Radio.Group style={{ display: 'flex', justifyContent: 'center' }}>
            <Radio value="1"> 启用</Radio>
            <Radio value="2"> 关闭</Radio>
          </Radio.Group>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
            <Button type="primary">设置</Button>
            <Button style={{ background: 'red', color: 'white' }}>删除</Button>
          </div>
        </Card>
      </div>
    </>
  )
}
PayType.a = 1
export default PayType
