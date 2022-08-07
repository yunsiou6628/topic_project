<!-- AdminTest -->

<!-- 老師前台 front - ProductsView.vue -->
<!-- 測試 quasar 表單 -->
<!-- :rows="products" => 把 products 丟到 :rows 裡面 -->
<template>
<!-- 01 -->
  <div class="q-pa-md">
    <q-table
      title="商品管理"
      :rows="products"
      :columns="columns"
      row-key="name"
    />
  </div>
  <!-- 02 -->
  <q-markup-table>
        <thead>
          <tr>
            <th class="text-left">商品名稱</th>
            <th class="text-right">金額</th>
            <th class="text-right">行程日期</th>
            <th class="text-right">剩餘名額</th>
            <th class="text-right">是否上架</th>
            <th class="text-right">編輯|刪除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for='product in products' :key='product._id'>
            <td class="text-left"> {{ product.name }} </td>
            <td class="text-right">{{ product.price }}</td>
            <td class="text-right">{{ product.product_date }}</td>
            <td class="text-right">{{ product.reserve }}</td>
            <td class="text-right">{{ product.sell }}</td>
            <td class="text-right"><q-btn>編輯</q-btn><q-btn>刪除</q-btn></td>
            <!-- q-btn 用 link 連結到編輯修改頁 -->
          </tr>
          </tbody>
      </q-markup-table>
</template>

<script setup>
// 01
import { reactive } from 'vue'
import Swal from 'sweetalert2'
import { apiAuth } from '../boot/axios'

const columns = [
  {
    name: 'number',
    required: true,
    label: '商品名稱',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  // 要去對到資料順序
  {
    name: 'number',
    required: true,
    label: '金額',
    align: 'left',
    field: row => row.price,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'number',
    required: true,
    label: '行程日期',
    align: 'left',
    field: row => row.product_date,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'number',
    required: true,
    label: '剩餘名額',
    align: 'left',
    field: row => row.reserve,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'number',
    required: true,
    label: '是否上架',
    align: 'left',
    field: row => row.sell,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'number',
    required: true,
    label: '編輯修改',
    align: 'left',
    // field: row => row.sell,
    // format: val => `${val}`,
    sortable: true
  }
  // { name: 'calories', align: 'center', label: '商品名稱', field: 'calories', sortable: true },
  // { name: 'fat', label: '金額', field: 'fat', sortable: true },
  // { name: 'carbs', label: '付款狀態', field: 'carbs' },
  // { name: 'protein', label: '訂單號', field: 'protein' },
  // { name: 'sodium', label: '訂購人', field: 'sodium' },
  // { name: 'calcium', label: '電話連絡', field: 'calcium' },
  // { name: 'iron', label: '行程日期', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  // { name: 'sodium', label: '行程名稱', field: 'sodium' }
]

// ([]) products 丟到空陣列中
const products = reactive([])

const init = async () => {
  try {
    // back - index 找回去 - productsRoute (route - products.js)
    // 抓取 顯示所有(包含下架)商品，只有管理員可以看
    const { data } = await apiAuth.get('/products/all')
    products.push(...data.result)
  } catch (error) {
    console.log(error)
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}
console.log(products)
init()

</script>
