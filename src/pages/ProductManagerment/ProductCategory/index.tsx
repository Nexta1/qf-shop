import { useEffect, useState } from 'react'
import * as api from '@/Api/Category'
import { Button, DatePicker, Input, Image, Popconfirm } from 'antd'
import scss from './catagoty.module.scss'
import { SearchOutlined } from '@ant-design/icons'
import AddAction from '@/components/addAction'
import { Table } from 'antd'
import React from 'react'
import ModelCategory from './modelCategory'
import { MyIcon } from '../ProductList'

export type IaddCategory = {
  categoryName: string
  categoryImgurl?: string
}
type IupdateCategory = {
  category_id: string
} & IaddCategory
const rowSelection = {
  onChange: (selectedRowKeys: any, selectedRows: any) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  },
  // getCheckboxProps: (record: { name: string }) => ({
  //   name: record.name,
  // }),
}
const Category = () => {
  const [category, setCategory] = useState<Icategory[]>()
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState<Icategory>()

  const addorUpdateProduct = (values: IaddCategory) => {
    if (edit) {
      let updateCategory = Object.assign(values, { category_id: edit?.category_id })
      api.updateCategory<IupdateCategory>(updateCategory)
    } else {
      api.addCategory<IaddCategory>(values)
    }
    getCategory()
    setOpen(false)
  }
  const getCategory = () =>
    api.getCategory().then(r => {
      r.data.forEach(item => {
        item.image = <Image src={item.categoryImgurl} width={50} height={50} />
        item.key = item._id
      })
      setCategory(r.data)
    })
  const editProduct = (record: Icategory) => {
    setEdit(record)
    setOpen(true)
  }
  const delProduct = (id: string) => {
    api.delCategory(id)
    getCategory()
  }
  useEffect(() => {
    getCategory()
  }, [])
  return (
    <div>
      <ModelCategory
        open={open}
        onCancel={() => setOpen(false)}
        onCreate={addorUpdateProduct}
        title={edit ? '编辑商品' : '添加商品'}
        edit={edit}
      />
      <div>
        产品名称： <Input placeholder="Basic usage" className={scss.searchInput} />
        添加日期：
        <DatePicker />
        <Button style={{ marginLeft: '20px' }}>
          <SearchOutlined /> 查询
        </Button>
      </div>
      <div style={{ marginTop: '10px', marginBottom: '10px' }}>
        <AddAction
          one={{
            title: '增加商品',
            click: () => {
              setOpen(true)
              setEdit(undefined)
            },
          }}
          two={{ title: '删除商品' }}
        />
      </div>
      <CategoryTable data={category!} operation={{ editProduct, delProduct }} />
    </div>
  )
}
export default Category

type ITable = {
  data: Icategory[]
  operation: {
    editProduct: (record: Icategory) => void
    delProduct: (id: string) => void
  }
}
const CategoryTable: React.FC<ITable> = ({ data, operation }) => {
  const { editProduct, delProduct } = operation
  const columns = [
    {
      title: '类目ID',
      dataIndex: 'category_id',
    },
    {
      title: '类名',
      dataIndex: 'categoryName',
    },
    {
      title: '图片',
      dataIndex: 'image',
    },
    {
      title: '创建者',
      dataIndex: 'creator',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_: string, record: Icategory) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <MyIcon type="icon-bianjibiaoge" onClick={() => editProduct(record)} />
            <Popconfirm title="确定删除吗?" onConfirm={() => delProduct(record.category_id!)}>
              <MyIcon type="icon-shanchu" />
            </Popconfirm>
          </div>
        )
      },
    },
  ]
  return <Table columns={columns} dataSource={data} rowSelection={{ ...rowSelection }} />
}
