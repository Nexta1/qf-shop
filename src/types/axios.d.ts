type Member = {
  state: boolean
  msg: string
  status: number
  code?: string
}
type ResponseResult<T> = {
  [K in keyof T]: T[K]
} & Member
