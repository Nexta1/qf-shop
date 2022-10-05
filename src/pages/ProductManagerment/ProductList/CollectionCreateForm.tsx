import UpLoad from '@/components/upLoad'
import { Form, Input, Modal } from 'antd'
import React, { useEffect } from 'react'
import { Icontent } from '.'

export type IForm = {
  open: boolean
  onCreate: (values: IaddProduct, id?: string) => void
  onCancel: () => void
  title: string
  edit?: Partial<Icontent>
}

const CollectionCreateForm = ({ open, onCancel, onCreate, title, edit }: IForm) => {
  const [form] = Form.useForm()
  let data = edit
  useEffect(() => {
    if (data) {
      form.setFieldsValue(data)
    } else {
      form.resetFields()
    }
  }, [data, form])
  return (
    <Modal
      forceRender
      open={open}
      title={title}
      okText="确认"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields()
            onCreate(values)
          })
          .catch(info => {
            console.log('Validate Failed:', info)
          })
      }}
    >
      <Form layout="vertical" name="form_in_modal" form={form}>
        <Form.Item name="imageUrl" label="商品图片">
          <UpLoad />
        </Form.Item>
        <Form.Item name="category_id" label="类目ID" rules={[{ required: true }]}>
          <Input type="text" />
        </Form.Item>
        <Form.Item name="productName" label="商品名称" rules={[{ required: true }]}>
          <Input type="text" />
        </Form.Item>
        <Form.Item name="price" label="商品价格" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item name="inventory" label="商品库存" rules={[{ required: true }]}>
          <Input type="text" />
        </Form.Item>
        <Form.Item name="description" label="商品描述" rules={[{ required: true }]}>
          <Input type="textarea" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CollectionCreateForm
