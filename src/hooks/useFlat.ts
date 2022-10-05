import * as _ from 'lodash'
import { Iroutes } from '@/router'
export default function flat() {
  let arr: Iroutes[] | null = []
  return function flat(trees?: Iroutes[]) {
    let tree = _.cloneDeep(trees)
    tree?.forEach(r => {
      if (r.children && r.children.length > 0) {
        r.children.forEach(i => {
          if (r.path && r.path !== '/') {
            i.path = `${r.path}/${i.path}`
          } else {
            i.path = '/' + i.path
          }
        })
        flat(r.children)
        delete r.children
      }
      arr?.push(r)
    })
    return arr
  }
}
