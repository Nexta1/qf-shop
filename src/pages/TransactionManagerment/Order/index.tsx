import { Table, Image, Badge, Button, Space } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import * as api from '@/Api/order'
import { ColumnsType } from 'antd/lib/table'
import { DeleteOutlined, EditOutlined, ShoppingOutlined } from '@ant-design/icons'
type Imore = Iorder & IorderTail
const columns: ColumnsType<Imore> = [
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
    title: '状态',
    dataIndex: 'shiping_status',
  },
  {
    title: '购买者',
    dataIndex: 'user_nickname',
  },
  {
    title: '订单时间',
    dataIndex: 'create_time',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    fixed: 'right',
    width: 140,
    render: () => (
      <Space size="small" align="center">
        <Button icon={<EditOutlined />} shape="circle" type="primary"></Button>
        <Button icon={<ShoppingOutlined />} shape="circle" type="primary"></Button>
        <Button icon={<DeleteOutlined />} shape="circle" danger></Button>
      </Space>
    ),
  },
]

const App: React.FC = () => {
  const [dataOrder, setDataOrder] = useState<Iorder[]>()
  useEffect(() => {
    api.get_order().then(r => {
      setDataOrder(r?.data)
    })
  }, [])

  const needData = useMemo(() => {
    if (dataOrder) {
      let data = [...dataOrder]
      let needOrder = data.map(r => {
        r.key = r._id
        let imageUrl = r.orderDetail[0].imageUrl
        r.image = <Image src={imageUrl} width={80} height={50} />

        switch (r.shiping_status) {
          case 0:
            r.shiping_status = <Badge status="processing" text="未发货" />
            break
          default:
            r.shiping_status = <Badge status="processing" text="已发货" />
            break
        }
        return Object.assign(r, r.orderDetail[0])
      })
      return needOrder
    }
  }, [dataOrder])
  return <Table columns={columns} dataSource={needData} scroll={{ x: 1000 }} />
}

export default App
