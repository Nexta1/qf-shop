import { useLocation } from 'react-router-dom'
import * as api from '@/Api/order'
import { useEffect, useState } from 'react'
import * as ProductApi from '@/Api/product'
import { Button, message, Modal, Table } from 'antd'
import Column from 'antd/lib/table/Column'

const Index = () => {
  const [product, setProduct] = useState<Partial<Iproduct>[]>([])
  const location = useLocation().state
  const add = () => {
    setProduct(prev => {
      return prev.map(r => {
        //拷贝
        let newProduct = Object.assign({}, r)
        if (newProduct.count < newProduct.inventory!) {
          newProduct.count += 1
        }
        newProduct.all = newProduct.count * newProduct.price!
        return newProduct
      })
    })
  }
  const reduce = () => {
    setProduct(prev => {
      return prev.map(r => {
        //拷贝
        let newProduct = Object.assign({}, r)
        if (newProduct.count >= 1) {
          newProduct.count -= 1
        }
        newProduct.all = newProduct.count * newProduct.price!
        return newProduct
      })
    })
  }
  useEffect(() => {
    ProductApi.getProduct(location.product_id).then(r => {
      if (r.state) {
        r.data.forEach(r => {
          r.key = r._id
          r.count = 1
          r.all = r.count * r.price!
        })
        setProduct(r.data)
      }
    })
  }, [location])
  const SubmitOrder = () => {
    Modal.confirm({
      okText: '确认订单',
      cancelText: '取消',
      title: '提示',
      content: '请确定你的订单',
      onCancel() {
        message.info('取消订单')
      },
      onOk() {
        let [{ product_id, count: quantity }] = product
        console.log(product)
        api.pre_order({ product_id, quantity }).then(r => {
          if (r.state) {
            message.success(r.msg)
          } else {
            message.error(r.msg)
          }
        })
      },
    })
  }
  return (
    <>
      <Table dataSource={product} pagination={false}>
        <Column title="商品名称" dataIndex="productName" />
        <Column
          title="购买数量"
          dataIndex="count"
          render={(key = 1) => {
            return (
              <>
                <Button onClick={reduce}>-</Button>
                <span style={{ margin: '10px' }}> {key}</span>
                <Button onClick={add}> +</Button>
              </>
            )
          }}
        />
        <Column title="单价" dataIndex="price" />
        <Column title="小记" dataIndex="all" />
      </Table>
      <Button onClick={SubmitOrder}>提交订单</Button>
    </>
  )
}

export default Index
