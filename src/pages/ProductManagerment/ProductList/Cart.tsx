import { Button, Checkbox, Drawer, message, Space, Statistic } from 'antd'
import React, { useEffect, useState } from 'react'
import * as api from '@/Api/cart'
import CardList from './CartList'

type ICart = {
  CartOpen: boolean
  CartClose: () => void
}
const CartShop: React.FC<ICart> = ({ CartOpen, CartClose }) => {
  const [cart, setCart] = useState<IcartProduct[]>()
  // const [checkCart,setCheckCart] = useState()
  // const checkedCart = ()=>{

  // }
  const del_prouct = (card_id: string) => {
    api.del_prouct(card_id).then(r => {
      if (r.state) {
        message.success('删除成功')
        get_cart()
      } else {
        message.error('删除失败')
      }
    })
  }
  const get_cart = () => {
    api.get_cart().then(r => {
      setCart(r.data)
    })
  }
  const update_cart = (cart_id: string, quantity: number) => {
    api.update_cart({ cart_id, quantity }).then(r => {
      if (r.state) {
        message.success('修改成功')
        get_cart()
      } else {
        message.error('删除失败')
      }
    })
  }

  useEffect(() => {
    // handleQuantity
  }, [])
  useEffect(() => {
    if (CartOpen) get_cart()
  }, [CartOpen])
  return (
    <>
      <Drawer
        title="购物车"
        placement="right"
        onClose={CartClose}
        open={CartOpen}
        width={600}
        bodyStyle={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}
        extra={
          <Space size="large">
            <div>
              <Checkbox>checkAll</Checkbox>
            </div>
            <Statistic title="总金额" value={'¥112893'} />
            <Button type="primary">结账</Button>
          </Space>
        }
      >
        {cart?.map(r => {
          return <CardList key={r._id} r={r} del_prouct={del_prouct} update_cart={update_cart} />
        })}
      </Drawer>
    </>
  )
}
export default CartShop
