<!-- OrderView -->
<template>
  <div class="q-pa-xl">
    <div class="col-12">
      <q-table
          title="訂單管理"
          :rows="orders"
          :columns="columns"
          row-key="name"
      >
      <!-- <thead>
        <tr>
          <th> ID </th>
          <th> 日期 </th>
          <th> 使用者 </th>
          <th> 金額 </th>
          <th> 商品 </th>
          <th> 編輯|刪除 </th>
        </tr>
      </thead> -->
      <!-- 需先有購物車 & 改成商品頁表單 quasar 格式 -->
      <tbody>
          <tr v-for='order in orders' :key='order._id'>
            <td> {{ order._id }} </td>
            <td> {{ new Date(order.date).toLocaleDateString() }} </td>
            <td> {{ order.user.account }} </td>
            <td> {{ order.totalPrice }} </td>
            <td>
              <ul>
                <li v-for='product in order.products' :key='product._id'>
                  | {{ product.product.name }} x {{ product.quantity }}
                </li>
              </ul>
            </td>
          </tr>
        <q-btn color='primary' @click="openDialog(product._id, idx)">編輯</q-btn>
      </tbody>
      </q-table>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { apiAuth } from '../boot/axios'
import Swal from 'sweetalert2'

const orders = reactive([])

const init = async () => {
  try {
    const { data } = await apiAuth.get('/orders/all')
    orders.push(...data.result.map(order => {
      order.totalPrice = order.products.reduce((a, b) => {
        return a + b.product.price * b.quantity
      }, 0)
      return order
    }))
  } catch (error) {
    console.log(error)
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: '無法取得訂單'
    })
  }
}
init()
</script>
