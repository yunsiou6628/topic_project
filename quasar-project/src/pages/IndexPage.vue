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

    <!-- 測試sass -->
    <div class="flex flex-center">

      <div class="row">
        <!-- 左-文字區塊 -->
        <!-- <div class="col-12 col-lg-5 column justify-center content-center items-center bg-red">

          <img src="https://i.imgur.com/0U2S3Xo.png" class="col-auto q-pt-xs-xl q-pt-lg-none">

          <div class="col-auto teal-10">
            <p>走進山裡，感受大自然的寬闊，對應自己的渺小，山給予的震撼感，不僅僅只是生理上的變化，還有更多無法言喻的感動，爬山不僅僅是一項活動，更是一場愛上山林、愛上生活的過程。</p>
          </div>

          <div class="col-auto teal-10">
            <p>帶你走進山林看見前所未見的台灣！</p>
          </div>

          <q-btn to="/ProductViewAll" label="Read More" class="col-auto">
          </q-btn>
        </div> -->
        <!-- 右-圖片區塊 -->
        <!-- 最大尺寸 -->
        <!-- <div class="col-12 col-lg-7" id="indexImg-lg">
          <img
            src="https://kitpro.site/hayka/wp-content/uploads/sites/75/2022/03/hiking-sunrise-2022-03-05-20-21-43-utc-800x533.jpg">
          <img
            src="https://kitpro.site/hayka/wp-content/uploads/sites/75/2022/03/female-hiker-looking-up-in-forest-sarsy-village-2022-03-07-23-58-37-utc.jpg">
          <img
            src="https://kitpro.site/hayka/wp-content/uploads/sites/75/2022/03/hikers-uphilling-at-mountain-forest-back-view-2021-08-29-03-30-49-utc-800x550.jpg">
        </div> -->
      </div>
    </div>

    <!-- 帶你去爬山文+圖區塊 -->
    <div class="flex flex-center" style="width: 100%; height: auto; background: #F4F8EE;">

      <div class="row" style="width: 90%;">
        <!-- 左-文字區塊 -->
        <div class="col-12 col-lg-5 column justify-center content-center items-center">

          <img src="https://i.imgur.com/0U2S3Xo.png" class="col-auto" style="width: 85%;">

          <div class="col-auto teal-10" style="width: 70%; font-size: 18px; padding: 30px 5px 0px 2px; color: #5E8A4B;">
            <p>走進山裡，感受大自然的寬闊，對應自己的渺小，山給予的震撼感，不僅僅只是生理上的變化，還有更多無法言喻的感動，爬山不僅僅是一項活動，更是一場愛上山林、愛上生活的過程。</p>
          </div>

          <div class="col-auto teal-10"
            style="width: 70%; font-size: 18px; padding: 20px 5px 20px 2px; color: #5E8A4B; text-align: center;">
            <p>帶你走進山林看見前所未見的台灣！</p>
          </div>

          <q-btn to="/ProductViewAll" label="Read More" class="col-auto"
            style="width: 200px; border-radius: 30px; background: #9AB98D; color: #fff; font-size: 18px;">
          </q-btn>
        </div>
        <!-- 右-圖片區塊 -->
        <!-- 最大尺寸 -->
        <div class="col-12 col-lg-7" id="indexImg-lg">
          <img
            src="https://kitpro.site/hayka/wp-content/uploads/sites/75/2022/03/hiking-sunrise-2022-03-05-20-21-43-utc-800x533.jpg"
            style="width: 600px; height: 400px; border: 10px solid white ; z-index: 1; position: absolute; top:10%; left: 25%; transform: translate(0%); transform: rotate(5deg); box-shadow: 0 0 10px rgba(0,0,0,0.3);"
            id="frontimg1">
          <img
            src="https://kitpro.site/hayka/wp-content/uploads/sites/75/2022/03/female-hiker-looking-up-in-forest-sarsy-village-2022-03-07-23-58-37-utc.jpg"
            style="width: 250px; height: 250px; border: 10px solid white ; z-index: 3; position: absolute; top:40%; left: 8%; transform: translate(-50%, -50%); transform: rotate(-5deg); box-shadow: 0 0 10px rgba(0,0,0,0.3);"
            id="frontimg2">
          <img
            src="https://kitpro.site/hayka/wp-content/uploads/sites/75/2022/03/hikers-uphilling-at-mountain-forest-back-view-2021-08-29-03-30-49-utc-800x550.jpg"
            style="width: 400px; height: 300px; border: 10px solid white ; z-index: 2; position: absolute; top:55%; left: 30%; transform: translate(-50%, -50%); transform: rotate(-3deg); box-shadow: 0 0 10px rgba(0,0,0,0.3);">
        </div>
        <!-- 最小尺寸 -->
        <div class="col-12" id="indexImg-xs">
          <img
            src="https://kitpro.site/hayka/wp-content/uploads/sites/75/2022/03/hiking-sunrise-2022-03-05-20-21-43-utc-800x533.jpg"
            class="col-12"
            style="width: 420px; height: 300px; border: 10px solid white ; z-index: 1; position: absolute; top:10%; left: 0%; transform: translate(-50%, -50%); transform: rotate(0deg); box-shadow: 0 0 10px rgba(0,0,0,0.3);">
          <img
            src="https://kitpro.site/hayka/wp-content/uploads/sites/75/2022/03/female-hiker-looking-up-in-forest-sarsy-village-2022-03-07-23-58-37-utc.jpg"
            style="width: 420px; height: 300px; border: 10px solid white ; z-index: 1; position: absolute; top:50%; left: 0%; transform: translate(-50%, -50%); transform: rotate(0deg); box-shadow: 0 0 10px rgba(0,0,0,0.3);">
          <img
            src="https://kitpro.site/hayka/wp-content/uploads/sites/75/2022/03/hikers-uphilling-at-mountain-forest-back-view-2021-08-29-03-30-49-utc-800x550.jpg"
            style="width: 420px; height: 300px; border: 10px solid white ; z-index: 1; position: absolute; top:90%; left: 0%; transform: translate(-50%, -50%); transform: rotate(0deg); box-shadow: 0 0 10px rgba(0,0,0,0.3);">
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
        <div>
          <!-- slice(0,parseInt(products.length / 3)) => 顯示 products.length 所有商品，除 3 個一組，parseInt 有小數點強制轉換成整數 -->
          <div class="q-pa-md">
            <q-carousel v-model="slide2" transition-prev="slide-right" transition-next="slide-left" arrows navigation
              swipeable animated infinite :autoplay="autoplay2" control-color="light-green-5 padding" height="600px">

              <q-carousel-slide v-for="(product, index) in products.slice(0, parseInt(products.length / 3))"
                :key="index" :name="index">
                <div class="row q-pa-xl">
                  <div class="col-4 q-pa-md" v-for="(img, idx) in [0, 1, 2]" :key="idx">
                    <q-card>

                      <img :src="products[index + index * 3 + idx]?.image"
                        v-if="products[index + index * 3 + idx]?.image.length" />
                      <div>{{ products[index + index * 3 + idx]?.name }}</div>
                      <div>{{ products[index + index * 3 + idx]?.description }}</div>

                    </q-card>
                  </div>
                </div>
              </q-carousel-slide>
            </q-carousel>
          </div>
        </div>

      </div>
    </div>

    <!-- footer -->
    <div class="col-12">
      <!-- 底圖 -->
      <img src="https://i.imgur.com/Y3YFphD.png"
        style="width: 100%; vertical-align:middle; z-index: 1; position:relative; z-index: 1;">

      <!-- 文字 -->
      <div class="col-4"
        style="width: 30%; font-size: 18px; padding: 20px; color: #fff; position: absolute; bottom: 1%; left: 5%; z-index: 2;">
        <p>帶你去爬山</p>
        <p>台灣登山社有限公司</p>
        <p>統一編號：00000000</p>
        <p>交觀甲0000 │ 品保北0000</p>
      </div>
      <div class="col-4"
        style="width: 30%; font-size: 18px; padding: 20px; color: #fff; position: absolute; bottom: 1%; left: 25%; z-index: 2;">
        <p></p>
        <p>地址：新北市泰山區貴子里致遠新村55之1號</p>
        <p>電話：0900-000-000</p>
        <p>email：000@gmail.com</p>
      </div>

    </div>
  </q-page>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Swal from 'sweetalert2'
import { api } from '../boot/axios'

const slide = ref(1)
const slide2 = ref(1)
const autoplay = ref(true)
const autoplay2 = ref(true)

const products = reactive([])
console.log(products)

const init = async () => {
  try {
    const { data } = await api.get('/products')
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
