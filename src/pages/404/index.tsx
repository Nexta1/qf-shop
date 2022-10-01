import logo from './404.svg'
const Page404 = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <h1 style={{ fontSize: '50px' }}>404页面不存在</h1>
      <img src={logo} className="App-logo" alt="logo" />
    </div>
  )
}
export default Page404
