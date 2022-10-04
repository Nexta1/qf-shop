import { FC, useState } from 'react'
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import { Badge, Button, Card, Checkbox, Input } from 'antd'
type ICartList = {
  r: IcartProduct
  del_prouct: (id: string) => void
  update_cart: (product_id: string, quantity: number) => void
}
const CartList: FC<ICartList> = ({ r, del_prouct, update_cart }) => {
  const [count, setCount] = useState<number>()
  const [open, setOpen] = useState<boolean>(false)
  const [checked, setChecked] = useState(false)
  const handleQuantity = (e: any) => {
    setCount(e.target.value)
  }
  const handleChange = (e: any) => {
    setChecked(e.target.checked)
  }
  return (
    <>
      <Badge.Ribbon text={`¥${r.price}`} key={r._id} color="magenta" placement="start">
        <Card
          style={{ width: 260, border: '1px solid', padding: '10px', marginBottom: '8px' }}
          cover={<img alt="example" src={r.imageUrl} />}
          extra={<Checkbox checked={checked} onChange={handleChange} />}
        >
          <p>商品名称：{r.title}</p>
          <p>时间：{r.create_time}</p>
          <p>
            购买数量：
            {open ? (
              <Input
                type="number"
                value={count}
                onChange={handleQuantity}
                onPressEnter={() => {
                  setOpen(false)
                  update_cart(r.cart_id, count!)
                }}
              />
            ) : (
              r.quantity
            )}
          </p>
          <div style={{ position: 'relative', bottom: 0, display: 'flex', justifyContent: 'space-between' }}>
            <Button type="primary" shape="circle" icon={<EyeOutlined />} />
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                setCount(r.quantity)
                setOpen(true)
              }}
            />
            <Button type="primary" shape="circle" icon={<DeleteOutlined />} onClick={() => del_prouct(r.cart_id)} />
          </div>
        </Card>
      </Badge.Ribbon>
    </>
  )
}
export default CartList
