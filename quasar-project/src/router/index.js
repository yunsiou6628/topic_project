import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from '../router/routes'
import { useUserStore } from '../stores/example-store'
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  // router.afterEach 去某個網址之後
  // routes.js 裡面的 meta title
  Router.afterEach((to, from) => {
    document.title = to.meta.title
  })

  // router.beforeEach 去某個網址之前
  Router.beforeEach((to, from, next) => {
    const user = useUserStore()
    // user.isLogin 已經登入
    // to.path 下一個要去的網頁 是登入或註冊
    if (user.isLogin && (to.path === '/login')) {
      next('/')
    // to.meta.login 必須要登入才能進去的頁面 並且 使用者沒有登入(false)
    } else if (to.meta.login && !user.isLogin) {
      next('/login')
    } else if (to.meta.admin && !user.isAdmin) {
      next('/')
    } else {
      next()
    // next() 原來頁面
    }
  })

  return Router
})
