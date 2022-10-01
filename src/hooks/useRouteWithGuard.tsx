import { RouteObject, useLocation, useNavigate, useRoutes } from 'react-router-dom'
import useStorage from './useStorage'
import { FC } from 'react'
import { useEffect } from 'react'
type Iprops = {
  routes: RouteObject[]
  token: string
}
const useRouteWithGuard: FC<Iprops> = props => {
  const navigate = useNavigate()
  const loaction = useLocation()
  const element = useRoutes(props.routes)

  let [token] = useStorage(props.token)

  useEffect(() => {
    if (!token) {
      if (loaction.pathname !== '/login') navigate('/login')
    }
  }, [loaction.pathname, token, navigate])

  return <>{element}</>
}
export default useRouteWithGuard
