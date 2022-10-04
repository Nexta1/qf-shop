import { message, Upload } from 'antd'
import type { UploadFile, UploadProps } from 'antd/es/upload/interface'
import React, { useEffect, useState } from 'react'
type Iprops = {
  value?: string
  onChange?: (value: string) => void
}
const App: React.FC<Iprops> = ({ value, onChange }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([])
  useEffect(() => {
    if (value) setFileList([{ uid: '-1', name: 'image.png', url: value }])
  }, [value])
  const onChangeUrl: UploadProps['onChange'] = ({ fileList }) => {
    console.log(fileList)
    if (fileList[0]?.status === 'done' && fileList[0].response.state === true) {
      message.success('文件传成功')
      //传递值
      onChange?.(fileList[0].response.headimgurl)
    }
    setFileList(fileList)
  }

  return (
    <Upload
      action="/api/students/uploadStuAvatar"
      name="headimgurl"
      listType="picture-card"
      fileList={fileList}
      onChange={onChangeUrl}
    >
      {fileList.length < 1 && '+ Upload'}
    </Upload>
  )
}

export default App
