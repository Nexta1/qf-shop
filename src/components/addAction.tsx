import { Button } from 'antd'
import { PlusSquareOutlined, DeleteOutlined } from '@ant-design/icons'
import { FC } from 'react'
type Iprops = {
  one: {
    title: string
    click?: () => void
  }
  two: {
    title: string
    click?: () => void
  }
}
const AddAction: FC<Iprops> = props => {
  return (
    <div style={{ border: '1px solid #ddd', padding: '10px' }}>
      <Button
        icon={<PlusSquareOutlined />}
        style={{ background: 'orange', color: 'white', borderRadius: '8px', marginRight: '20px' }}
        onClick={props.one.click}
      >
        {props.one.title}
      </Button>
      <Button
        icon={<DeleteOutlined />}
        style={{ background: 'red', color: 'white', borderRadius: '8px' }}
        onClick={props.two.click}
      >
        {props.two.title}
      </Button>
    </div>
  )
}
export default AddAction
