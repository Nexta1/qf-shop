import { Input, DatePicker, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import scss from './catagoty.module.scss'

const Search = () => {
  return (
    <div>
      产品名称： <Input placeholder="Basic usage" className={scss.searchInput} />
      添加日期：
      <DatePicker />
      <Button style={{ marginLeft: '20px' }}>
        <SearchOutlined /> 查询
      </Button>
    </div>
  )
}
export default Search
