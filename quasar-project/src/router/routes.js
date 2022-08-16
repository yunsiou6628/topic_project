// router 主要是讓我們不同網址切換不同頁面(網頁)

const routes = [
  {
    // 使用者
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // 首頁
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        meta: {
          title: '登山行程網站 | 首頁',
          login: false,
          admin: false
        }
      },
      // 登入/註冊頁
      {
        path: 'Login',
        component: () => import('pages/LoginPage.vue'),
        meta: {
          title: '登山行程網站 | 登入/註冊頁',
          login: false,
          admin: false
        }
      },
      // 登山行程
      {
        path: 'ProductViewAll',
        component: () => import('pages/ProductViewAll.vue'),
        meta: {
          title: '登山行程網站 | 登山行程',
          login: false,
          admin: false
        }
      },
      // 文章專欄
      {
        path: 'ArticleColumn',
        component: () => import('pages/ArticleColumn.vue'),
        meta: {
          title: '登山行程網站 | 文章專欄',
          login: false,
          admin: false
        }
      },
      // 關於我們
      {
        path: 'AboutUs',
        component: () => import('pages/AboutUs.vue'),
        meta: {
          title: '登山行程網站 | 關於我們',
          login: false,
          admin: false
        }
      },
      // 聯絡我們
      {
        path: 'ContactUs',
        component: () => import('pages/ContactUs.vue'),
        meta: {
          title: '登山行程網站 | 聯絡我們',
          login: false,
          admin: false
        }
      },
      // 購物車
      {
        path: 'CartView',
        component: () => import('pages/CartView.vue'),
        meta: {
          title: '登山行程網站 | 購物車',
          login: true,
          admin: false
        }
      },
      // 訂單
      {
        path: 'OrderView',
        component: () => import('pages/OrderView.vue'),
        meta: {
          title: '登山行程網站 | 訂單',
          login: true,
          admin: false
        }
      },
      // 單一商品頁
      {
        path: 'product/:id',
        component: () => import('pages/ProductViewOne.vue'),
        meta: {
          title: '登山行程網站 | 單一商品頁',
          login: false,
          admin: false
        }
      },
      {
        path: 'ConfirmOrder',
        component: () => import('pages/ConfirmOrder.vue'),
        meta: {
          title: '登山行程網站 | 確認訂單',
          login: false,
          admin: false
        }
      },
      {
        path: 'test/',
        component: () => import('pages/TextPage.vue'),
        meta: {
          title: '登山行程網站 | 測試',
          login: false,
          admin: false
        }
      }
    ]
  },
  {
    // 管理員
    // http://localhost:9000/#/admin/AdminHome
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      // 管理員 - 後台首頁
      {
        path: 'AdminHome',
        component: () => import('pages/AdminHome.vue'),
        meta: {
          title: '登山行程網站 | 管理員-後台首頁',
          login: true,
          admin: true
        }
      },
      // 管理員 - 頁面管理
      {
        path: 'AdminPages',
        component: () => import('pages/AdminPages.vue'),
        meta: {
          title: '登山行程網站 | 管理員-頁面管理',
          login: true,
          admin: true
        }
      },
      // 管理員 - 商品管理
      {
        path: 'AdminProduct',
        component: () => import('pages/AdminProduct.vue'),
        meta: {
          title: '登山行程網站 | 管理員-商品管理',
          login: true,
          admin: true
        }
      },
      // 管理員 - 商品分類
      {
        path: 'AdminCategory',
        component: () => import('pages/AdminCategory.vue'),
        meta: {
          title: '登山行程網站 | 管理員-商品分類',
          login: true,
          admin: true
        }
      },
      // 管理員 - 訂單管理
      {
        path: 'AdminOrderView',
        component: () => import('pages/AdminOrderView.vue'),
        meta: {
          title: '登山行程網站 | 管理員-訂單管理',
          login: true,
          admin: true
        }

      },
      // 管理員 - 會員管理
      {
        path: 'AdminMember',
        component: () => import('pages/AdminMember.vue'),
        meta: {
          title: '登山行程網站 | 管理員-會員管理',
          login: true,
          admin: true
        }
      },
      // 管理員 - 測試頁
      {
        path: 'AdminTest',
        component: () => import('pages/AdminTest.vue'),
        meta: {
          title: '登山行程網站 | 管理員-測試頁',
          login: true,
          admin: true
        }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
