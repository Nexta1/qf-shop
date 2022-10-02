import { Form, Input, Modal } from 'antd'
import React, { useEffect } from 'react'
import UploadImg from '@/components/upload'
import { IaddCategory } from '.'
export type IForm = {
  open: boolean
  onCreate: (values: IaddCategory, id?: string) => void
  onCancel: () => void
  title: string
  edit?: any
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
        <Form.Item name="categoryImgurl" label="商品图片">
          <UploadImg url={edit?.categoryImgurl} />
        </Form.Item>
        <Form.Item name="categoryName" label="商品名称" rules={[{ required: true }]}>
          <Input type="text" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CollectionCreateForm
