import { Modal } from 'antd'
import React, { useState } from 'react'
type IProps = {
  msg: string
  open: boolean
  setOpen: () => void
}
const App: React.FC<IProps> = ({ msg, open, setOpen }) => {
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [modalText, setModalText] = useState<string>()
  const handleOk = () => {
    setModalText(msg)
    setConfirmLoading(true)
    setTimeout(() => {
      setOpen()
      setConfirmLoading(false)
    }, 2000)
  }

  const handleCancel = () => {
    setOpen()
  }
  return (
    <>
      <Modal title="确认删除吗" open={open} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel}>
        <p>{modalText}</p>
      </Modal>
    </>
  )
}

export default App
