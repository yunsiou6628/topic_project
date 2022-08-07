<!-- ProductViewOne -->
<!-- 單商品頁 -->
<template>
  <div class="q-pa-xl">
    <div class="row">
      <div class="col-12">
        <q-h1> {{ product.name }} </q-h1>
      </div>
      <q-divider />
      <div class="col-12">
        <q-img :src="product.image" />
        <q-p>  ${{ product.price }} </q-p>
      </div>
      <div class="col-12">
        <q-p style='white-space: pre;'> {{ product.description }} </q-p>
      </div>
      <div class="col-12">
        <q-form v-model='valid' @submit.prevent='submit'>
          <q-text-field (type="number" label="數量" v-model="quantity" :rules='quantityRule'></q-text-field>
          <q-btn color='primary' type='submit'>加入購物車</q-btn>
        </q-form>
      </div>
      <q-overlay align-center.justify-center :model-value='!product.sell'>
      <q-h1 text-black> 已下架 </q-h1>
      </q-overlay>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from '../boot/axios'
import Swal from 'sweetalert2'
import { useUserStore } from '../stores/example-store'

const route = useRoute()
const router = useRouter()
const user = useUserStore()

const quantity = ref(0)
const quantityRule = reactive([
  v => v >= 1 || '數量錯誤'
])
const valid = ref(false)

const product = reactive({
  _id: '',
  name: '',
  price: 0,
  category: '',
  sell: false,
  image: '',
  description: ''
})

const submit = () => {
  if (!valid.value) return
  user.addCart({ product: product._id, quantity: quantity.value })
}
const init = async () => {
  try {
    const { data } = await api.get('/products/' + route.params.id)
    product._id = data.result._id
    product.name = data.result.name
    product.price = data.result.price
    product.category = data.result.category
    product.sell = data.result.sell
    product.image = data.result.image
    product.description = data.result.description
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
