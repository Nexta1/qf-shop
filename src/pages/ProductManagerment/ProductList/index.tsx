import { Divider, Popconfirm, Table } from 'antd'
import React, { FC, ReactNode, useEffect, useState } from 'react'
import AddAction from '@/components/addAction'
import * as api from '@/Api/product'
import { Iproduct } from '@/Api/product'
import { Image } from 'antd'
import CollectionCreateForm from './CollectionCreateForm'

const rowSelection = {
  onChange: (selectedRowKeys: any, selectedRows: any) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  },
  // getCheckboxProps: (record: { name: string }) => ({
  //   name: record.name,
  // }),
}

type Icontent = Iproduct & {
  key: string
  image: ReactNode
}
const ProductList: FC = () => {
  const [Product, setProduct] = useState<Partial<Icontent>[]>()
  const [open, setOpen] = useState(false)
  const [add, setAdd] = useState<IaddProduct>()
  const columns = [
    {
      title: '编号',
      dataIndex: 'product_id',
    },
    {
      title: '数量',
      dataIndex: 'inventory',
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
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_: string, record: Partial<Iproduct>) =>
        Product!.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => delProduct(record.product_id!)}>
            <>Delete</>
          </Popconfirm>
        ) : null,
    },
  ]
  const addProduct = (values: IaddProduct) => {
    values.imageUrl =
      'https://tse2-mm.cn.bing.net/th/id/OIP-C.QCdBYCyLGrWmhnwhhdmCPgHaEo?w=270&h=180&c=7&r=0&o=5&dpr=2&pid=1.7'
    setAdd(values)
    api.add_product<IaddProduct>(add!)
    setOpen(false)
  }
  const delProduct = (id?: string) => {
    if (id) {
      setProduct(prev => prev?.filter(r => r.product_id !== id))
      api.del_product(id)
    }
  }
  useEffect(() => {
    api.getProduct().then(r => {
      let data = [] as Partial<Icontent>[]
      data = [...r.data]
      data.forEach(r => {
        r.image = <Image src={r.imageUrl} width={50} height={50} />
        r.key = r._id
      })
      setProduct(data)
    })
  }, [add])
  return (
    <div>
      <AddAction
        one={{
          title: '增加商品',
          click: () => {
            setOpen(true)
          },
        }}
        two={{ title: '批量删除', click: delProduct }}
      />
      <CollectionCreateForm open={open} onCancel={() => setOpen(false)} onCreate={addProduct} />
      <Divider />
      <Table
        rowSelection={{
          ...rowSelection,
        }}
        columns={columns}
        dataSource={Product}
        pagination={{ position: ['topLeft'] }}
      />
    </div>
  )
}

export default ProductList
