import { Divider, Popconfirm, Table } from 'antd'
import React, { FC, ReactNode, useEffect, useState } from 'react'
import AddAction from '@/components/addAction'
import * as api from '@/Api/product'
import { Image } from 'antd'
import CollectionCreateForm from './CollectionCreateForm'
import { createFromIconfontCN } from '@ant-design/icons'

export const MyIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3684025_yex2wmaqs4c.js', // 在 iconfont.cn 上生成
})
const rowSelection = {
  onChange: (selectedRowKeys: any, selectedRows: any) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  },
  // getCheckboxProps: (record: { name: string }) => ({
  //   name: record.name,
  // }),
}

export type Icontent = Iproduct & {
  key: string
  image: ReactNode
}
const ProductList: FC = () => {
  const [Product, setProduct] = useState<Partial<Icontent>[]>()
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState<Partial<Icontent>>()
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
      render: (_: string, record: Partial<Iproduct>) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <MyIcon type="icon-bianjibiaoge" onClick={() => editProduct(record)} />
            <Popconfirm title="确定删除吗?" onConfirm={() => delProduct(record.product_id!)}>
              <MyIcon type="icon-shanchu" />
            </Popconfirm>
          </div>
        )
      },
    },
  ]
  const addOrUpdataProduct = (values: IaddProduct) => {
    values.imageUrl =
      'https://tse2-mm.cn.bing.net/th/id/OIP-C.QCdBYCyLGrWmhnwhhdmCPgHaEo?w=270&h=180&c=7&r=0&o=5&dpr=2&pid=1.7'
    if (edit) {
      let updataProduct = Object.assign(values, { product_id: edit?.product_id })
      api.update_product(updataProduct)
    } else {
      api.add_product<IaddProduct>(values)
    }
    setOpen(false)
    getProduct()
  }
  const delProduct = (id?: string) => {
    if (id) {
      setProduct(prev => prev?.filter(r => r.product_id !== id))
      api.del_product(id)
      getProduct()
    }
  }
  const editProduct = (currentProduct: Partial<Icontent>) => {
    setEdit(currentProduct)
    setOpen(true)
  }
  const getProduct = () =>
    api.getProduct().then(r => {
      let data = [] as Partial<Icontent>[]
      data = [...r.data]
      data.forEach(r => {
        r.image = <Image src={r.imageUrl} width={50} height={50} />
        r.key = r._id
      })
      setProduct(data)
    })
  useEffect(() => {
    getProduct()
  }, [])
  return (
    <div>
      <AddAction
        one={{
          title: '增加商品',
          click: () => {
            setEdit(undefined)
            setOpen(true)
          },
        }}
        two={{ title: '批量删除', click: delProduct }}
      />
      <CollectionCreateForm
        open={open}
        onCancel={() => setOpen(false)}
        onCreate={addOrUpdataProduct}
        title={edit ? '编辑商品' : '增加商品'}
        edit={edit}
      />
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
