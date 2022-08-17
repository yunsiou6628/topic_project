// store 儲存使用者相關功能/資料/函式function 前台傳資料到後台，後台回傳的資料的地方(暫存-使用者相關功能/資料..)
// pinia 可以儲存網頁的狀態，讓元件間的資料共享更方便

import { defineStore } from 'pinia'
// 引入 axios.js 檔案，apiAuth => 指增加 token 時間的路徑
import { api, apiAuth } from '../boot/axios.js'
// import router from '../router/routes.js'
// sweetalert => 警告視窗套件
import Swal from 'sweetalert2'

// 增加老師上課 stores - user.js => 暫存(使用者相關功能/資料..)
export const useUserStore = defineStore({
  // 使用者資料(登入後才有資料傳進來)
  // 跨檔案使用-使用者相關功能/資料..
  id: 'user',
  state () {
    return {
      token: '',
      account: '',
      role: 0,
      cart: 0
    }
  },
  // 判斷
  getters: {
    isLogin () {
      // token: '' 使用者傳入資料 console.log(this.token.length) 不會是 0 => true (沒有登入 沒東西 0 => false)
      return this.token.length !== 0
    },
    // 判斷是不是管理員
    isAdmin () {
      return this.role === 1
    },
    // 加大頭貼
    avatar () {
      return 'https://source.boringavatars.com/beam/120/' + this.account
      // + this.account 指使用者的帳號
    }
  },
  // 使用者相關動作
  actions: {
    // 登入
    // 接收表單 LoginPage.vue
    async login (form) {
      try {
        const { data } = await api.post('/users/login', form)
        // console.log(data)
        // data.result.token => console.log 後 result 裡面的資料 傳到 this.token (useUserStore = defineStore裡)
        this.token = data.result.token
        // console.log(this.token.length)
        this.account = data.result.account
        this.role = data.result.role
        this.cart = data.result.cart
        Swal.fire({
          icon: 'success',
          title: '成功',
          text: '登入成功'
        })
        if (this.role === 0) {
          this.router.push('/') // 使用者 跳頁到首頁
        } else if (this.role === 1) {
          this.router.push('/admin/AdminHome') // 管理者 跳頁到後台首頁
        }
      } catch (error) {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: '失敗',
          text: (error.isAxiosError && error.response.data) ? error.response.data.message : '發生錯誤'
        })
      }
    },
    // 登出
    async logout () {
      try {
        await apiAuth.delete('/users/logout')
        this.router.push('/')
        Swal.fire({
          icon: 'success',
          title: '成功',
          text: '登出成功'
        })
      } catch (_) {
      }
      this.token = ''
      this.account = ''
      this.role = 0
      this.cart = 0
    },
    // 增加購物車
    async addCart (data) {
      if (this.token.length === 0) {
        Swal.fire({
          icon: 'error',
          title: '失敗',
          text: '請先登入'
        })
        this.router.push('/login')
        return
      }
      if (data.quantity <= 0) {
        Swal.fire({
          icon: 'error',
          title: '失敗',
          text: '數量必須大於 0'
        })
        return
      }
      try {
        const { data: resData } = await apiAuth.post('/users/cart', data)
        this.cart = resData.result
        Swal.fire({
          icon: 'success',
          title: '成功',
          text: '加入購物車成功'
        })
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: '失敗',
          text: '加入購物車失敗'
        })
      }
    },
    // 更新購物車
    async updateCart (data) {
      try {
        await apiAuth.patch('/users/cart', data)
        return true
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: '失敗',
          text: '加入購物車失敗'
        })
        return false
      }
    },
    // 確認訂單
    async confirmOrder (data) {
      try {
        await apiAuth.patch('/users/cart', data)
        return true
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: '失敗',
          text: '訂單失敗'
        })
        return false
      }
    },
    // 結帳
    async checkout (confirmform) {
      try {
        await apiAuth.post('/orders', confirmform)
        this.cart = 0
        Swal.fire({
          icon: 'success',
          title: '成功',
          text: '結帳成功'
        })
        // this.router.push('/order')
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: '失敗',
          text: error
        })
      }
    },
    // 後台- 取得使用者資料
    async getUser () {
      if (this.token.length === 0) return
      try {
        const { data } = await apiAuth.get('/users')
        this.account = data.result.account
        this.role = data.result.role
        this.cart = data.result.cart
      } catch (error) {
        this.logout()
      }
    }
  },
  // 把使用者 token 存到 localstorge
  persist: {
    key: 'vite-shop',
    paths: ['token']
  }
})
