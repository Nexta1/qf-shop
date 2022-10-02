import { Upload } from 'antd'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import React, { useEffect, useState } from 'react'
type Iprops = {
  url?: string
}
const App: React.FC<Iprops> = ({ url }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([])
  useEffect(() => {
    if (url) setFileList([{ uid: '-1', name: 'image.png', url }])
  }, [url])
  const onChange: UploadProps['onChange'] = ({ fileList: newFileList, event, file }) => {
    console.log(event)
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
