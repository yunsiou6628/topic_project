// axios.js 前台跟後台連接(路徑設定相關)
// axios 請求套件，前台對後台發送請求的套件

import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { useUserStore } from '../stores/example-store'
// 引入 example-store 檔案 (暫存-使用者相關功能/資料..)

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

// 連接到後台路徑 baseURL: import.meta.env.VITE_API
const api = axios.create({ baseURL: import.meta.env.VITE_API })

// boot 全域，有 boot 就不需要 import meta.env.VITE_API
// 可以直接寫 this.$api
export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }

// 老師上課 plugins - axios.js => 另外一個路徑，把 token 的時間延長
export const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_API
  // .env路徑 => VITE_API
})
// axios ---> axios 攔截請求 --> API SERVER --> axios 攔截回應 --> 呼叫的地方
apiAuth.interceptors.request.use(config => {
  const user = useUserStore()
  config.headers.authorization = `Bearer ${user.token}`
  return config
})
apiAuth.interceptors.response.use(res => {
  return res
}, error => {
  // 如果請求有回應
  if (error.response) {
    // 如果是 401，可能是 JWT 過期
    if (error.response.status === 401) {
      // 確認原始請求的網址不是延長登入，才重新登入
      if (error.config.url !== '/users/extend' && error.config.url !== '/users/logout') {
        const user = useUserStore()
        // 傳送延長請求
        return apiAuth.post('/users/extend', {}).then(({ data }) => {
          // 更新 JWT
          user.token = data.result
          // 使用新的 JWT 再次嘗試原始請求
          error.config.headers.authorization = `Bearer ${user.token}`
          return axios(error.config)
        }).catch(_ => {
          // 重新登入失敗，強制登出
          user.logout()
          // 回傳延長登入請求的錯誤訊息到呼叫的地方
          return Promise.reject(error)
        })
      }
    }
  }
  return Promise.reject(error)
})
