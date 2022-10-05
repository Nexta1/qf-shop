import { Badge, Button, message, Modal, Popconfirm, Table } from 'antd'
import React, { FC, ReactNode, useEffect, useState } from 'react'
import AddAction from '@/components/addAction'
import * as api from '@/Api/product'
import { Image } from 'antd'
import CollectionCreateForm from './CollectionCreateForm'
import { createFromIconfontCN } from '@ant-design/icons'
import Cart from './Cart'
import * as cartApi from '@/Api/cart'
import { useNavigate } from 'react-router-dom'
export const MyIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3684025_kskst3ss3c.js', // 在 iconfont.cn 上生成
})

export type Icontent = Iproduct & {
  key: string
  image: ReactNode
}
const ProductList: FC = () => {
  const [Product, setProduct] = useState<Partial<Icontent>[]>()
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState<Partial<Icontent>>()
  const [CartOpen, setCartOpen] = useState(false)
  const [delProductID, setDelProductID] = useState<Partial<Icontent>[]>([])
  const navigate = useNavigate()
  //购买商品
  const purchaseProduct = (id: string) => {
    Modal.confirm({
      title: '提示',
      content: '确定购买该产品吗',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        navigate('/transaction/preorder', { state: { product_id: id } })
      },
      onCancel() {
        message.info('取消购买')
      },
    })
  }
  //选中数据
  const rowSelection = {
    onChange: (_: any, selectedRows: Partial<Icontent>[]) => {
      setDelProductID(selectedRows)
    },
  }

  //列表数据
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
      title: '库存',
      dataIndex: 'inventory',
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

            <MyIcon type="icon-gouwuche2" onClick={() => addCartProduct(record.product_id!)} />
            <MyIcon type="icon-goumai" onClick={() => purchaseProduct(record.product_id!)} />
            <Badge status="processing" />
          </div>
        )
      },
    },
  ]
  //添加购物车
  const addCartProduct = (product_id: string, quantity: number = 1) => {
    cartApi.add_to_cart({ product_id, quantity }).then(r => {
      if (r.state) {
        message.success(r.msg)
      } else {
        message.error(r.msg)
      }
    })
  }
  //增加编辑商品
  const addOrUpdataProduct = (values: IaddProduct) => {
    if (edit) {
      let updataProduct = Object.assign(values, { product_id: edit?.product_id })
      api.update_product(updataProduct).then(r => {
        if (r.state) {
          message.success(r.msg)
          getProduct()
        }
      })
    } else {
      api.add_product<IaddProduct>(values).then(r => {
        if (r.state) {
          message.success(r.msg)
          getProduct()
        }
      })
    }
    setOpen(false)
  }
  //删除产品
  const delProduct = (id?: string) => {
    if (id) {
      setProduct(prev => prev?.filter(r => r.product_id !== id))
      api.del_product(id).then(r => {
        if (r.state) {
          message.success('删除成功')
          getProduct()
        } else {
          message.error(r.msg)
        }
      })
    }
  }
  const delProducts = () => {
    // 打开删除提示
    Modal.confirm({
      title: '提示',
      content: '确认删除这些商品吗?',
      okText: '确认',
      cancelText: '取消',
      async onOk() {
        if (delProductID.length === 0) {
          message.info('你没有选择数据')
        } else
          Promise.all(
            delProductID.map(r => {
              return api.del_product(r.product_id!)
            })
          )
            .then(r => {
              message.success('删除成功')
              getProduct()
            })
            .catch(r => {
              console.log(r)
            })
      },
      onCancel() {
        message.info('取消删除')
      },
    })
  }
  //发起编辑产品
  const editProduct = (currentProduct: Partial<Icontent>) => {
    setEdit(currentProduct)
    setOpen(true)
  }
  //获取商品
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
  //初始化
  useEffect(() => {
    getProduct()
  }, [])
  return (
    <div style={{ position: 'relative' }}>
      {/* 增加商品 */}
      <AddAction
        one={{
          title: '增加商品',
          click: () => {
            setEdit(undefined)
            setOpen(true)
          },
        }}
        two={{ title: '批量删除', click: delProducts }}
      />
      {/* 唤起表单 */}
      <CollectionCreateForm
        open={open}
        onCancel={() => setOpen(false)}
        onCreate={addOrUpdataProduct}
        title={edit ? '编辑商品' : '增加商品'}
        edit={edit}
      />
      <Cart CartOpen={CartOpen} CartClose={() => setCartOpen(false)} />
      {/* 数据展示 */}
      <Button
        type="primary"
        onClick={() => {
          setCartOpen(true)
        }}
        style={{
          position: 'absolute',
          right: '40px',
          borderRadius: '10px',
          zIndex: '10',
          top: '12px',
        }}
      >
        <MyIcon type="icon-gouwuche" style={{ color: 'red' }} />
        查看购物车
      </Button>

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
