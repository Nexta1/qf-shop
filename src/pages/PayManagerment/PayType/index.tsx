import { Alert } from 'antd'
import { Card } from 'antd'
import React from 'react'

const PayType = () => {
  return (
    <>
      {' '}
      <Alert message="Informational Notes" type="info" showIcon style={{}} />
      <div style={{ background: '#ddd', marginTop: '20px', fontSize: 16, fontWeight: 'bolder', padding: 10 }}>
        支付方式
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
        <Card style={{ width: 300 }}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
        <Card style={{ width: 300 }}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
        <Card style={{ width: 300 }}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
        <Card style={{ width: 300 }}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </div>
    </>
  )
}
export default PayType
