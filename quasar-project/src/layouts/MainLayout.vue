<template>
  <q-layout view="lHh Lpr lff">
    <q-header elevated class="bg-white text-teal-10">
      <q-toolbar>

        <q-img src="https://i.imgur.com/DnkzPPc.png" style="height: 30px; max-width: 60px " />

        <!-- 加 q-route-tab 切換連結 跳頁 => https://quasar.dev/vue-components/tabs#introduction -->
        <!-- btn 跳頁 => <q-btn to="/Login" label="Login"/> -->
        <!-- a 連結 跳頁 => <router-link to="/Login">Login</router-link> -->
        <!-- 這裡不加 v-model="tab"，加了 v-model 就只會顯示指定的那頁，切換條不會跟著切換頁 -->
        <q-tabs class="q-py-sm">
          <q-route-tab name="首頁" label="首頁" to="/" />
          <q-route-tab name="登山行程" label="登山行程" to="ProductViewAll" />
          <q-route-tab name="文章專欄" label="文章專欄" to="ArticleColumn" />
          <q-route-tab name="關於我們" label="關於我們" to="AboutUs" />
        </q-tabs>

        <q-space />

        <!-- 搜尋 -->
        <q-input borderless v-model="text" input-class="text-right">
          <template v-slot:append>
            <q-icon name="search" class="text-teal-10 q-mx-xs" />
          </template>
        </q-input>

        <div>
          <!-- 聯絡我們 -->
          <q-btn flat round color="teal-10" icon="fa-solid fa-comment-dots" to="/ContactUs" size="sm" class="q-mx-sm" />
          <!-- 登入前(註冊/登入) -->
          <q-btn flat round color="teal-10" icon="fa-solid fa-user" v-if='!isLogin' to="/login" size="sm" />
          <!-- 登入 - 有 dropdown 選單 -->
          <!-- 判斷是使用者或管理員，管理員登入多一個按鍵到後台，一般使用者沒有後台選項 -->
          <q-btn-dropdown flat round color="teal-10" icon="fa-solid fa-user-check" v-if='isLogin' size="sm">
            <q-list>
              <q-item clickable v-close-popup v-if='isAdmin' to="/admin/AdminHome">
                <q-item-section>
                  <q-item-label>
                    <i class="fa-solid fa-arrow-right-to-bracket"></i>
                    後台
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <!-- 購物車 -->
            <q-list>
              <q-item clickable v-close-popup v-if='isLogin && !isAdmin' to="/CartView" color="teal-10">
                <q-item-section>
                  <q-item-label>
                    <i class="fa-solid fa-cart-shopping"></i>
                    購物車
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <!-- 清單 -->
            <q-list>
              <q-item clickable v-close-popup v-if='isLogin && !isAdmin' to="/OrderView" color="teal-10">
                <q-item-section>
                  <q-item-label>
                    <i class="fa-solid fa-list-ul"></i>
                    清單
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <!-- 登出 -->
            <q-list>
              <q-item clickable v-close-popup @click="logout">
                <q-item-section>
                  <q-item-label>
                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                    登出
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>

        </div>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <!-- q-header 不動 切換 router-view 頁面 -->
      <router-view />
    </q-page-container>

    <q-footer style="background:transparent; z-index: -1;">
      <div class="col-12 relative-position">
        <!-- 底圖 -->
        <!-- 電腦大尺寸顯示 -->
        <img src="https://i.imgur.com/Y3YFphD.png" class="gt-md"
          style="width: 100%; vertical-align: middle; bottom: 0; z-index: 1;">
        <!-- 平板手機中小尺寸顯示 -->
        <img src="https://i.imgur.com/iXamMg1.png" class="lt-lg"
          style="width: 100%; vertical-align: middle; bottom: 0; z-index: 1;">

        <!-- 文字 -->
        <div
          class="col-12 gt-md absolute-center full-width row wrap q-pa-xl q-px-xxxl text-subtitle1 text-white text-weight-bold"
          style="margin-top: 7%; text-shadow: #616A6B 1px 1px 5px">

          <div class="col-3  q-pl-xl">
            <p>帶你去爬山</p>
            <p>台灣登山社有限公司</p>
            <p>統一編號：00000000</p>
            <p>交觀甲0000 │ 品保北0000</p>
          </div>

          <div class="col-4 column justify-end">
            <div class="row items-center q-mb-md">
              <i class="fa-solid fa-phone"></i>
              <span class="q-pl-md">0900-000-000</span>
            </div>
            <div class="row items-center q-mb-md ">
              <i class="fa-solid fa-envelope "></i>
              <span class="q-pl-md">gohiking.today2021@gmail.com</span>
            </div>
            <div class="row items-center q-mb-md">
              <span>Apple Podcast / Spotify / KKBOX</span>
              <i class="fa-solid fa-magnifying-glass q-pl-md q-pr-sm"></i>
              <span> 她與她的山友們</span>
            </div>
          </div>

          <div class="col-5 column  justify-end">
            <div class="row justify-end content-center q-px-xl q-py-lg">
              <a href="https://page.line.me/?accountId=gohiking.today" class="q-px-sm text-white text-h5"><i
                  class="fa-brands fa-line text-white"></i></a>
              <a href="https://www.instagram.com/gohiking.today/" class="q-px-sm text-white text-h5"><i
                  class="fa-brands fa-instagram"></i></a>
              <a href="https://www.facebook.com/gohiking.today.fb/" class="q-px-sm text-white text-h5"><i
                  class="fa-brands fa-facebook"></i></a>
              <a href="https://podcasts.apple.com/us/podcast/%E5%A5%B9%E8%88%87%E5%A5%B9%E7%9A%84%E5%B1%B1%E5%8F%8B%E5%80%91/id1614216258"
                class="q-px-sm text-white text-h5"><i class="fa-solid fa-podcast"></i></a>

              <a href="https://open.spotify.com/show/2OEenV9E1AZKPoWkBx2CCn" class="q-px-sm text-white text-h5"><i
                  class="fa-brands fa-spotify"></i></a>
            </div>
            <div class="row justify-end content-center q-px-xl q-mb-md">
              <span>《條款與細則》</span>
              <span>《退換貨政策》</span>
              <span>《隱私權政策》</span>
            </div>
            <div class="row justify-end content-center q-px-xl q-mb-md">
              <span>gohiking.today 2022 © Taiwan gohiking. All Rights Resverved </span>
            </div>
          </div>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/example-store'
const user = useUserStore()
const { logout } = user
const { isLogin, isAdmin } = storeToRefs(user)

export default defineComponent({
  name: 'MainLayout',

  components: {
    /* eslint-disable */
    // EssentialLink
  },

  setup() {

    return {
      isLogin,
      logout,
      isAdmin,
      onItemClick() {
        // console.log('Clicked on an Item')
      }
    }
  }
})
</script>
