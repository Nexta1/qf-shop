import useRouteWithGuard from '@/hooks/useRouteWithGuard'
import './App.css'

import routes from './router'

function App() {
  const element = useRouteWithGuard({ routes, token: 'qf-token' })
  return <div className="App">{element}</div>
}

export default App
