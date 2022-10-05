import { useLocation } from 'react-router-dom'
import * as api from '@/Api/order'
import { useEffect, useMemo, useState } from 'react'
import * as ProductApi from '@/Api/product'
import { Button, message, Table } from 'antd'
import Column from 'antd/lib/table/Column'

const Index = () => {
  const [product, setProduct] = useState<Partial<Iproduct>[]>([])
  const [count, setCount] = useState(1)
  const location = useLocation().state
  const add = () => {
    setCount(prev => {
      return prev + 1
    })
  }
  console.log(product)
  //   const reduce = () => {
  //     setProduct(prev => {
  //       return prev.map(r => {
  //         if (r.count >= 1) {
  //           return (r.count -= 1)
  //         }
  //       })
  //     })
  //   }
  useEffect(() => {
    ProductApi.getProduct(location.product_id).then(r => {
      if (r.state) {
        r.data.forEach(r => {
          r.key = r._id
        })
        setProduct(r.data)
      }
    })
  }, [location])

  return (
    <Table dataSource={product}>
      <Column title="商品名称" dataIndex="productName" />
      <Column
        title="购买数量"
        dataIndex="count"
        render={(key = 1) => {
          return (
            <>
              <Button onClick={add}>-</Button>
              <span style={{ margin: '10px' }}> {key}</span>
              <Button>+</Button>
            </>
          )
        }}
      />
      <Column title="单价" dataIndex="price" />
      <Column title="小记" dataIndex="all" />
    </Table>
  )
}

export default Index
