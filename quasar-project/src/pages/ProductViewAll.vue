<!-- ProductViewAll -->
<!-- 已上架商品 -->
<template>
  <div class="q-pa-md row items-start q-gutter-md">

    <!-- 商品顯示 => 把 init() 從後台抓取到的資料放入 products 後，對 products 跑回圈，前台商品頁就會顯示跑過的每一筆資料(全部商品) -->
    <div class="row" >
      <div class="col-3 " v-for='product in products' :key='product._id'>
        <!-- ProductCard => components 的 ProductCard.vue (=> 重複 code 寫成一個元件) -->
        <!-- :product='product' => 把 products 陣列裡面的 'product' 商品物件資料，放到 components 裡面 ProductCard.vue 相對應位置 :product 中 -->
        <ProductCard :product='product' />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import Swal from 'sweetalert2'
import { api } from '../boot/axios'
import ProductCard from '../components/ProductCard.vue'

const products = reactive([])

const init = async () => {
  try {
    // back 抓取 只顯示已上架商品 從後台抓取資料過來前台 data
    const { data } = await api.get('/products')
    // 再把 data 資料 push 到 products 空陣列裡面
    products.push(...data.result)
    console.log(products)
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: '伺服器錯誤'
    })
  }
}
init()
// init() 呼叫執行 fuction
</script>
