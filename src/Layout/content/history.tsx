import { Button } from 'antd'
import scss from './history.module.scss'
import { CloseCircleOutlined } from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { FC, useEffect, useState } from 'react'
import { GetRoutes } from './breadCrumb'
import routes from '@/router'
import useStore from '@/hooks/useStorage'
type Ihistory = {
  label: string
  path: string
  id: string
}
const History: FC = () => {
  const [history, setHistory] = useState<Ihistory[]>([])
  const navigate = useNavigate()
  const [Session, setSession] = useStore<Ihistory[]>('qf-history')
  const location = useLocation()
    .pathname.split('/')
    .filter(r => r)
    .pop()

  useEffect(() => {
    if (Session) setHistory(Session)
  }, [Session])
  useEffect(() => {
    let route = GetRoutes(routes)?.find(v => v?.key === location)
    if (route?.menu === 1 || route?.path === '/login') return
    let obj = {
      label: route?.label!,
      path: route?.path!,
      id: route?.key!,
    }
    setHistory(prev => {
      if (prev?.find(r => r.id === obj.id)) return prev
      if (prev.length >= 10) {
        let Max = [obj, ...prev!]
        Max.pop()
        return Max
      }
      return [obj, ...prev!]
    })
  }, [location])
  setSession.set(history)

  return (
    <div>
      {history.length > 0 &&
        history!.map(r => {
          return (
            <Button
              className={scss.button}
              key={r.id}
              onClick={() => navigate(r.path)}
              style={{
                background: r.id === location ? '#1890ff' : 'none',
                color: r.id === location ? 'white' : 'black',
              }}
            >
              {r.label}
              <CloseCircleOutlined
                style={{ zIndex: 100, fontSize: '16px' }}
                onClick={e => {
                  e.stopPropagation()
                  setHistory(prev => prev.filter(v => v.id !== r.id))
                }}
              />
            </Button>
          )
        })}
    </div>
  )
}
export default History
