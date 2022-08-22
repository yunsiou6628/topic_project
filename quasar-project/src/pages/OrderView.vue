OrderView
<template>
  <div class="q-pa-xl"
    style="width:100vw; height: 100vh; background-image: linear-gradient(to bottom,#F4F8EE, #fff); z-index: -1;">
    <div class="col-12">
      <q-table title="購物清單" :rows="orders" :columns="orderscolumns" row-key="name" hide-pagination>

        <template #body-cell-image="image">
          <!-- <pre>{{image.row.products[0].product}}</pre> -->
          <img :src="image.row.products[0].product.image" style="width:150px">
        </template>

        <template #body-cell-product_date="product_date">
          <!-- <pre>{{product_date.row.products[0].product}}</pre> -->
          <!-- <pre>{{product_date.row.products[0].product.product_date}}</pre> -->
          {{ new Date(product_date.row.products[0].product.product_date).toLocaleDateString() }}
        </template>

      </q-table>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import Swal from 'sweetalert2'
import { apiAuth } from '../boot/axios'

const orders = reactive([])

// 使用者購買
const orderscolumns = [
  {
    name: 'image',
    required: true,
    label: '商品圖片',
    align: 'left'
    // btn 在 template #body-cell-image 加入
  },
  {
    name: 'name',
    required: true,
    label: '行程名稱',
    align: 'left',
    field: row => row.products[0].product.name,
    sortable: true
  },
  {
    name: 'product_date',
    required: true,
    label: '行程日期',
    align: 'left',
    sortable: true
  },
  {
    name: 'quantity',
    required: true,
    label: '購買數量',
    align: 'left',
    field: row => row.products[0].product.quantity,
    sortable: true
  }
]

const init = async () => {
  try {
    console.log(111)
    const { data } = await apiAuth.get('/orders/getMyOrders')
    console.log(222)
    orders.push(...data.result)
    console.log(orders)
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
