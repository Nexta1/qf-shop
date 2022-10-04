import { Table, Image } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import * as api from '@/Api/order'

const columns = [
  {
    title: '订单编号',
    dataIndex: 'order_id',
  },
  {
    title: '名称',
    dataIndex: 'productName',
  },
  {
    title: '图片',
    dataIndex: 'image',
  },
  {
    title: '价格',
    dataIndex: 'price',
  },
  {
    title: '数量',
    dataIndex: 'quantity',
  },
  {
    title: '描述',
    dataIndex: 'description',
  },
  {
    title: '订单时间',
    dataIndex: 'create_time',
  },
]

const App: React.FC = () => {
  const [data, setData] = useState<Iorder[]>()
  useEffect(() => {
    api.get_order().then(r => {
      setData(r?.data)
    })
  }, [])
  const needData = useMemo(() => {
    if (data) {
      let needOrder = data.map(r => {
        r.key = r._id
        let imageUrl = r.orderDetail[0].imageUrl
        r.image = <Image src={imageUrl} width={80} height={50} />
        return Object.assign(r, r.orderDetail[0])
      })

      return needOrder
    }
  }, [data])
  return <Table columns={columns} dataSource={needData} />
}

export default App
