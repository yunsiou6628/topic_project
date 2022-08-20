<!-- ProductViewOne -->
<!-- 單商品頁 -->
<template>
  <div class="q-pa-md q-gutter-sm">
    <q-breadcrumbs class="text-teal-9" active-color="light-green-4">
      <q-breadcrumbs-el label="登山行程" />
      <!-- 大分類 -->
      <q-breadcrumbs-el>
        大分類 - {{ product.sub }}
      </q-breadcrumbs-el>
      <!-- 小分類 -->
      <q-breadcrumbs-el>
        小分類 - {{ product }}
      </q-breadcrumbs-el>
    </q-breadcrumbs>
  </div>
  <div class="q-px-xxxl" style="margin-left:20%; margin-right:20%; color: #5E8A4B;">
    <div class="row">
      <div class="col-12 q-py-sm text-center">
        <!-- https://quasar.dev/vue-components/img#qimg-api -->
        <q-img :src="product.image" style="width: 800px; height: 500px;" />
      </div>
      <div class="col-12 q-py-sm text-weight-bold text-h5">
        <div> {{ product.name }} </div>
      </div>
      <div class="col-12 q-py-sm text-weight-bold text-h6">
        <div> ${{ product.price }} </div>
      </div>
      <div class="col-12 q-py-sm text-weight-bold text-subtitle1">
        <div> {{ product.bulletin }} </div>
      </div>

      <q-separator class="q-my-lg" />

      <div class="col-12 q-py-sm text-weight-bold text-subtitle1 row justify-center">
        <div> 行程日期 : {{ new Date(product.product_date.from).toLocaleDateString()
        }} </div>
        <div> ~ {{ new Date(product.product_date.to).toLocaleDateString()
        }} </div>
      </div>

      <div class="col-12 q-px-xxxl">
        <q-input v-model.number="quantity" type="number" filled label="數量" :rules='quantityRule'
          class="text-weight-bold text-subtitle1" style="color: #5E8A4B;" />
        <!-- 有時間再改寫 Applied to QBtn => https://quasar.dev/vue-directives/touch-repeat -->
      </div>

      <q-form v-model='valid' @submit.prevent='submit' class="col-12 row">
        <q-btn class="col-12 q-py-sm q-px-xxxl text-weight-bold" style=" background: #5E8A4B; color: #fff;"
          type='submit'>
          加入購物車</q-btn>
      </q-form>

      <div class="col-12 q-py-sm text-weight-bold text-subtitle1 row justify-center">
        <div> 庫存剩餘 {{ product.reserve }} </div>
      </div>

      <div class="col-12 q-py-sm text-weight-bold text-subtitle1 text-wrapper">
        <div> {{ product.description }} </div>
      </div>

      <q-btn class="col-12 q-py-sm q-px-xxxl text-weight-bold" style=" background: #5E8A4B; color: #fff;" type='submit'
        to="/ProductViewAll">
        返回行程
      </q-btn>

    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from '../boot/axios'
import Swal from 'sweetalert2'
import { useUserStore } from '../stores/example-store'

const route = useRoute()
const router = useRouter()
const user = useUserStore()
const quantity = ref(1)
const quantityRule = reactive([
  v => v >= 1 || '數量錯誤'
])
const valid = ref(false)

// 把後台資料放入 options
const options = computed(() => {
  return product.map(product => {
    return {
      label: product.product_date,
      value: product._id
    }
  })
})

const product = reactive({
  _id: '',
  name: '',
  product_date: '',
  region: '',
  reserve: 0,
  price: 0,
  sub: '',
  sell: false,
  image: null,
  description: '',
  bulletin: '',
  idx: -1,
  dialog: false,
  valid: false,
  submitting: false
})

const submit = () => {
  // if (!valid.value) return
  user.addCart({ product: product._id, quantity: quantity.value })
}

const init = async () => {
  try {
    const { data } = await api.get('/products/' + route.params.id)
    console.log('21231' + data.result)
    product._id = data.result._id
    product.name = data.result.name
    product.product_date = data.result.product_date
    product.region = data.result.region
    product.reserve = data.result.reserve
    product.price = data.result.price
    product.sub = data.result.sub
    product.sell = data.result.sell
    product.image = data.result.image
    product.description = data.result.description
    product.bulletin = data.result.bulletin
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: '取得商品資料失敗'
    })
    // router.go(-1)
    // 錯了跳頁回去原本頁面
  }
}
init()
</script>
