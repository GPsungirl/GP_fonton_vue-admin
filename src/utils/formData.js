import axios from 'axios';
import commonURL from './common'
export function formData(data) {
  return new Promise((resolve, reject) => {
    axios.post(`${commonURL.baseUrl}/api/utils/fileUpload`,
      data, {
        headers: {
          'Content-Type': 'multipart/form-data'
          // boundary=' + new Date().getTime()

        }
      }
    ).then(result => {
      resolve(result)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getGoodsCatogory(data) {
  return new Promise((resolve, reject) => {
    axios.post(`${commonURL.baseUrl}/manage/goods/getGoodsType`,data).then(res=>{
      resolve(res)
    }).catch(err=>{
      reject(err)
    })
  })
}
