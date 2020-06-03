import axios from 'axios'
import Cookies from 'js-cookie'

// axios 配置
// axios.defaults.timeout = 5000
let Token = Cookies.get('token')
axios.defaults.headers.post['token'] = Token
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

axios.defaults.headers.get['token'] = Token
axios.defaults.headers.get['Content-Type'] = 'application/json;charset=UTF-8'

// axios.defaults.withCredentials = true
// Axios实现请求重试
axios.defaults.retry = 5 // 重试次数
// axios.defaults.retryDelay = 1000 // 重试延时
// const UrlAddress = 'http://localhost:8080'// 本地测试
// const UrlAddress = 'http://192.168.1.161:8081' // 本机测试服
const UrlAddress = 'http://47.92.104.73:8081' // 73测试服
// const UrlAddress = 'http://161.117.229.208:8081' // 正式服

// axios.interceptors.request.use(
//   config => {
//     let Token = Cookies.get('token')
//     if (Token) {
//       config.headers.Authorization = Token
//     }
//     return config
//   },
//   err => {
//     return Promise.reject(err)
//   }
// )
export function get (url, params = {}) {
  let Token = Cookies.get('token')
  axios.defaults.headers.get['token'] = Token
  axios.defaults.headers.get['Content-Type'] = 'application/json;charset=UTF-8'
  // console.log('get-Token')
  // console.log(Token)
  return new Promise((resolve, reject) => {
    axios.get(UrlAddress + url, {
      params: params
    }).then(response => {
      resolve(response.data)
      // console.log(response)
      // if (!response.data) {
      //   this.$message({
      //     message: '网络请求错误',
      //     type: 'error'
      //   })
      // }
    }).catch(err => {
      reject(err)
      if (Cookies.get('token')) {
        this.$message({
          message: '账号异常,请重新登录',
          type: 'success'
        })
        sessionStorage.setItem('ID', ``)
        Cookies.remove('token')
        this.$router.push({
          path: `/passwordLogin`
        })
      }
    })
  })
}

export function post (url, data = {}, headers = {}) {
  let Token = Cookies.get('token')
  axios.defaults.headers.post['token'] = Token
  axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
  // console.log('post-Token')
  // console.log(Token)
  return new Promise((resolve, reject) => {
    axios.post(UrlAddress + url, data, headers).then(response => {
      resolve(response.data)
      // console.log(response)
      // if (!response.data) {
      //   this.$message({
      //     message: '网络请求错误',
      //     type: 'error'
      //   })
      // }
    }).catch(err => {
      reject(err)
      if (Cookies.get('token')) {
        this.$message({
          message: '账号异常,请重新登录',
          type: 'success'
        })
        sessionStorage.setItem('ID', ``)
        Cookies.remove('token')
        this.$router.push({
          path: `/passwordLogin`
        })
      }
    })
  })
}
export function shuxin () {
  if (Cookies.get('token')) {
    return location.reload()
  }
}
