import { Button } from 'antd'
import { FC, ReactNode } from 'react'
type Iprops = {
  one?: {
    icon?: ReactNode
    title: string
    click?: () => void
  }
  two?: {
    icon?: ReactNode
    title: string
    click?: () => void
  }
  three?: {
    icon?: ReactNode
    title: string
    click?: () => void
  }
}
const AddAction: FC<Iprops> = props => {
  return (
    <div style={{ border: '1px solid #ddd', padding: '10px' }}>
      <Button
        icon={props.one?.icon}
        style={{ background: 'orange', color: 'white', borderRadius: '8px', marginRight: '20px' }}
        onClick={props.one?.click}
      >
        {props.one?.title}
      </Button>
      <Button
        icon={props.two?.icon}
        style={{ background: 'red', color: 'white', borderRadius: '8px', marginRight: '20px' }}
        onClick={props.two?.click}
      >
        {props.two?.title}
      </Button>
      {props.three && (
        <Button
          icon={props.three?.icon}
          style={{ background: 'green', color: 'white', borderRadius: '8px' }}
          onClick={props.three?.click}
        >
          {props.three?.title}
        </Button>
      )}
    </div>
  )
}
export default AddAction
