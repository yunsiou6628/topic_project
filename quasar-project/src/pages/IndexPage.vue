<template>
  <q-page>
    <!-- 輪播圖 -->
    <div class="relative">
      <q-carousel animated v-model="slide" navigation infinite :autoplay="autoplay" arrows transition-prev="slide-right"
        transition-next="slide-left" @mouseenter="autoplay = false" @mouseleave="autoplay = true">
        <q-carousel-slide :name="1" img-src="https://i.imgur.com/nq70abE.jpg" />
        <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
        <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
        <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
        <q-carousel-slide :name="5" img-src="https://i.imgur.com/lblUOEF.jpg" />
      </q-carousel>
    </div>

    <!-- 帶你去爬山文+圖區塊 -->
    <div class="flex flex-center" style="width: 100%; height: 900px; background: #F4F8EE;">

      <div class="row" style="width: 80%; height: 80%;">
        <!-- 左-文字區塊 -->
        <div style="width: 40%;" class="col-6 column justify-center content-center items-center">

          <img src="https://i.imgur.com/0U2S3Xo.png" class="col-auto" style="width: 80%;">
          <div class="col-auto teal-10"
            style="width: 65%; font-size: 18px; padding: 30px 5px 10px 2px; color: #5E8A4B;">
            <p>走進山裡，感受大自然的寬闊，對應自己的渺小，山給予的震撼感，不僅僅只是生理上的變化，還有更多無法言喻的感動，爬山不僅僅是一項活動，更是一場愛上山林、愛上生活的過程。</p>
          </div>

          <div class="col-auto teal-10"
            style="width: 65%; font-size: 18px; padding: 30px 5px 50px 2px; color: #5E8A4B; text-align: center;">
            <p>帶你走進山林看見前所未見的台灣！</p>
          </div>

          <q-btn to="/ProductViewAll" label="Read More" class="col-auto"
            style="width: 30%; border-radius: 30px; background: #9AB98D; color: #fff; font-size: 18px;">
          </q-btn>
        </div>
        <!-- 右-圖片區塊 -->
        <div style=" width: 60%; position: relative;" class="col-6">
          <img
            src="https://kitpro.site/hayka/wp-content/uploads/sites/75/2022/03/hiking-sunrise-2022-03-05-20-21-43-utc-800x533.jpg"
            style="width: 600px; height: 400px; border: 10px solid white ; z-index: 1; position: absolute; top:5%; left: 25%; transform: translate(-50%); transform: rotate(5deg); box-shadow: 0 0 10px rgba(0,0,0,0.3);"
            id="frontimg1">
          <img
            src="https://kitpro.site/hayka/wp-content/uploads/sites/75/2022/03/female-hiker-looking-up-in-forest-sarsy-village-2022-03-07-23-58-37-utc.jpg"
            style="width: 250px; height: 250px; border: 10px solid white ; z-index: 3; position: absolute; top:40%; left: 8%; transform: translate(-50%, -50%); transform: rotate(-5deg); box-shadow: 0 0 10px rgba(0,0,0,0.3);"
            id="frontimg2">
          <img
            src="https://kitpro.site/hayka/wp-content/uploads/sites/75/2022/03/hikers-uphilling-at-mountain-forest-back-view-2021-08-29-03-30-49-utc-800x550.jpg"
            style="width: 400px; height: 300px; border: 10px solid white ; z-index: 2; position: absolute; top:55%; left: 30%; transform: translate(-50%, -50%); transform: rotate(-3deg); box-shadow: 0 0 10px rgba(0,0,0,0.3);">
        </div>
      </div>
    </div>

    <div class="flex flex-center" style="width: 100%; height: 900px;">
      <div class="row" style="width: 80%; height: 80%;">

        <div class="col-12 teal-10"
          style="font-size: 18px; padding: 30px 5px 10px 2px; color: #5E8A4B; text-align: center;">
          <h3>最新行程</h3>
        </div>

        <!-- 商品卡片輪播圖 -->
        <div style="width: 100%;">
          <!-- <div>
            <div v-for="product in products" :key="product">
              <pre>{{ product.name }}</pre>
              <pre>{{ product.image }}</pre>
            </div>
          </div> -->
          <!-- 測試卡片顯示商品資料 -->
          <q-card bordered flat class="card1 q-mb-lg" style="width: 100%; max-width: 250px;"
            v-for="(product, index) in products.slice(0, products.length / 4)" :key="index">
            <div v-for="(img, idx) in [0, 1, 2, 3]" :key="idx">
              <img :src="products[index + index * 4 + idx].image" />
              {{ products[index + index * 4 + idx].name }}
            </div>
            <!-- <img :src="products[index + 1].image" />
            {{ products[index + 1].name }}
            <img :src="products[index + 2].image" />
            {{ products[index + 2].name }}
            <img :src="products[index + 3].image" />
            {{ products[index + 3].name }} -->
            <!-- <img src="https://cdn.quasar.dev/img/mountains.jpg"> -->

            <!-- <q-card-section></q-card-section>
              <div>
                <h3>{{ product.name }}</h3>
                <p>{{ product.description }}</p>
              </div>
            </q-card-section> -->
          </q-card>
        </div>

        <div class="q-pa-md row items-start q-gutter-md" style="width: 200px;">
          <q-card class="card" v-for="product in products" :key="product">
            <img src="https://cdn.quasar.dev/img/mountains.jpg">
            <div class="text-h6">{{ product.name }}</div>
            <div class="text-h6">{{ product.image }}</div>
            <q-card-section>
              <div class="text-h6">{{ product.name }}</div>
              <div class="text-h6">{{ product.image }}</div>
            </q-card-section>
          </q-card>
        </div>

        <!-- <div style="width: 100%;">
          <div class="q-pa-md">
            <q-carousel v-model="slide" transition-prev="slide-right" transition-next="slide-left" swipeable animated
              control-color="primary" navigation padding arrows infinite :autoplay="autoplay"
              @mouseenter="autoplay = false" @mouseleave="autoplay = true" height="400px">
              <q-carousel-slide :name="1" class="column no-wrap">
                <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
                  <q-img class="rounded-borders col-3 full-height" src="https://cdn.quasar.dev/img/mountains.jpg" />
                  <q-img class="rounded-borders col-3 full-height" src="https://cdn.quasar.dev/img/parallax1.jpg" />
                  <q-img class="rounded-borders col-3 full-height" src="https://cdn.quasar.dev/img/mountains.jpg" />
                  <q-img class="rounded-borders col-3 full-height" src="https://cdn.quasar.dev/img/parallax1.jpg" />
                </div>
              </q-carousel-slide>
              <q-carousel-slide :name="2" class="column no-wrap">
                <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
                  <q-img class="rounded-borders col-6 full-height" src="https://cdn.quasar.dev/img/parallax2.jpg" />
                  <q-img class="rounded-borders col-6 full-height" src="https://cdn.quasar.dev/img/quasar.jpg" />
                </div>
              </q-carousel-slide>
              <q-carousel-slide :name="3" class="column no-wrap">
                <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
                  <q-img class="rounded-borders col-6 full-height" src="https://cdn.quasar.dev/img/cat.jpg" />
                  <q-img class="rounded-borders col-6 full-height" src="https://cdn.quasar.dev/img/linux-avatar.png" />
                </div>
              </q-carousel-slide>
              <q-carousel-slide :name="4" class="column no-wrap">
                <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
                  <q-img class="rounded-borders col-6 full-height" src="https://cdn.quasar.dev/img/material.png" />
                  <q-img class="rounded-borders col-6 full-height" src="https://cdn.quasar.dev/img/donuts.png" />
                </div>
              </q-carousel-slide>
            </q-carousel>
          </div>
        </div> -->
      </div>
    </div>

  </q-page>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Swal from 'sweetalert2'
import { api } from '../boot/axios'

const slide = ref(1)
const autoplay = ref(true)

const products = reactive([])
console.log(products)

const init = async () => {
  try {
    const { data } = await api.get('/products/getProducts')
    products.push(...data.result)
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: '伺服器錯誤'
    })
  }
}
init()
</script>
