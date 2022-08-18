<template>
  <q-layout view="lHh Lpr lFf">
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
            <q-icon name="search" class="text-teal-10" />
          </template>
        </q-input>

        <div>
          <!-- 聯絡我們 -->
          <q-btn flat round color="teal-10" icon="fa-solid fa-comment-dots" to="/ContactUs" size="sm" />
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
