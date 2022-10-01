import { Upload } from 'antd'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import React, { useState } from 'react'

const App: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const onChange: UploadProps['onChange'] = ({ fileList: newFileList, event }) => {
    setFileList(newFileList)
  }
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj as RcFile)
        reader.onload = () => resolve(reader.result as string)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }

  return (
    <Upload
      action="/api/upload/uploadImg"
      listType="picture-card"
      fileList={fileList}
      onChange={onChange}
      onPreview={onPreview}
    >
      {fileList.length < 1 && '+ Upload'}
    </Upload>
  )
}

export default App
