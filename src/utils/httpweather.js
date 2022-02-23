import axios from 'axios'
// import globalFunction from '@/globalFunction.js'
import store from '@/store'
import { MessageBox, Message } from 'element-ui'
import { getToken } from '@/utils/auth'
// 请求超时时间
axios.defaults.timeout = 10000 * 5

// 请求基础 URL
// axios.defaults.baseURL = '/api'

// POST 请求头
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'

// 请求携带cookie
axios.defaults.withCredentials = true

const weatherapi = axios.create({
  baseURL: process.env.VUE_APP_WEATHER_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})
// request interceptor
weatherapi.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
weatherapi.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    console.log('axio-jsonrequest:response=>:', res)

    if (res.status !== 1000) {
      Message({
        message: res.data.errMsg || 'Error',
        type: 'error',
        duration: 3 * 1000
      })

      // 50008: Illegal token;
      if (res.data.errCode === 10000) {
        // 用户未登录
        // to re-login
        MessageBox.confirm(
          'You have been logged out, you can cancel to stay on this page, or log in again',
          '会话过期',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      if (res.data.errCode === 20001) {
        // 用户不存在
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

/**
 * 封装 get方法 对应 GET 请求
 * @param {string} url 请求url
 * @param {object} params 查询参数
 * @returns {Promise}
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    weatherapi
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
/**
 * 封装 post 方法，对应 POST 请求
 * @param {string} url 请求url
 * @param {object} data 请求体
 * @param {boolean | undefined} info 请求体是否为 FormData 格式
 * @returns {Promise}
 */
export function post(url, data = {}, info) {
  return new Promise((resolve, reject) => {
    let newData = data
    if (info) {
      //  转formData格式
      newData = new FormData()
      for (const i in data) {
        newData.append(i, data[i])
      }
    }
    weatherapi
      .post(url, newData)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

/**
 * 封装 put 方法，对应 PUT 请求
 * @param {string} url 请求url
 * @param {object} params 请求体
 * @returns {Promise}
 */
export function put(url, params = {}) {
  return new Promise((resolve, reject) => {
    weatherapi.put(url, params).then(
      res => {
        resolve(res.data)
      },
      err => {
        reject(err.data)
      }
    )
  })
}

/**
 * 封装 axiosDelete 方法，对应 DELETE 请求
 * @param {string} url 请求url
 * @param {object} params 请求体
 * @returns {Promise}
 */
export function axiosDelete(url, params = {}) {
  return new Promise((resolve, reject) => {
    weatherapi
      .delete(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
