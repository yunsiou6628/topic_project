<!-- ProductViewOne -->
<!-- 單商品頁 -->
<template>
  <div class="q-pa-xl">
    <div class="row">
      <div class="col-12 q-py-sm">
        <div> {{ product.name }} </div>
      </div>
      <q-divider />
      <div class="col-12 q-py-sm">
        <!-- https://quasar.dev/vue-components/img#qimg-api -->
        <q-img :src="product.image" style="max-width: 50%"/>
      </div>
      <div class="col-12 q-py-sm">
        <div> ${{ product.price }} </div>
      </div>
      <div class="col-12 q-py-sm">
        <div> 庫存剩餘 {{ product.reserve }} </div>
      </div>
      <div class="col-12 q-py-sm">
        <div style='white-space: pre;'> {{ product.description }} </div>
      </div>
      <div class="col-7 q-py-sm">
        <!-- {{new Date(product_date.row.product_date).toLocaleDateString()}} -->
        <!-- <div style='white-space: pre;'> {{new Date(product_date.row.product_date).toLocaleDateString()}} </div> -->
        <div style='white-space: pre;'> {{ product.product_date }} </div>
        <!-- <q-select :options='options' map-options v-model='product_date' label='行程日期' filled></q-select> -->
      </div>

      <div class="col-7 q-py-sm">
        <q-input
          v-model.number="quantity"
          type="number"
          filled
          label="數量"
          :rules='quantityRule'
        />
        <!-- 之後改寫 Applied to QBtn => https://quasar.dev/vue-directives/touch-repeat -->
      </div>
      <div class="col-12 q-py-sm">
        <q-form v-model='valid' @submit.prevent='submit'>
          <q-btn color='primary' type='submit'>加入購物車</q-btn>
        </q-form>
      </div>
      <q-overlay align-center justify-center :model-value='!product.sell'>
      <!-- <q-h1 text-black>未上架</q-h1> -->
      </q-overlay>
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
    router.go(-1)
  }
}
init()
</script>
