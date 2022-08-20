<!-- OrderView -->
<template>
  <div class="q-pa-xl">
    <div class="col-12">
      <q-table title="訂單管理" :rows="orders" :columns="columns" row-key="name" :filter="filter">
        <template #body-cell-name="name">
          <q-td>
            <pre>{{ name.row.name }}</pre>
          </q-td>
        </template>

        <template #body-cell-phone="phone">
          <q-td>
            <pre>{{ phone.row.phone }}</pre>
          </q-td>
        </template>

        <template #body-cell-products="products">
          <q-td>
            <!-- <pre>{{ products.row.products }}</pre> -->
            <!-- <pre>{{ products.row.products[0].product.name }}</pre> -->
            <div v-for="product in products.row.products" :key="product">
              <pre>{{ product.product.name }}</pre>
            </div>
          </q-td>
        </template>

        <template #body-cell-quantity="quantity">
          <q-td>
            <!-- <pre>{{ quantity.row.products }}</pre> -->
            <!-- <pre>{{ quantity.row.products[0].quantity }}</pre> -->
            <div v-for="num in quantity.row.products" :key="num">
              <pre>{{ num.quantity }}</pre>
            </div>
          </q-td>
        </template>

        <template #body-cell-PAY="PAY">
          <q-td>
            <div>{{ PAY.row.cardtype?.label }}</div>
            <div>{{ PAY.row.checkPay?.label }}</div>
            <div v-if="PAY.row.atmcheckDay">ATM 付款</div>
            <!-- 如果有 PAY.row.atmcheckDay 資料就當成 true 就會顯示文字 -->
          </q-td>
        </template>

        <template #body-cell-cardname="cardname">
          <q-td>
            <!-- <pre>{{ cardname.row }}</pre> -->
            <div>{{ cardname.row.cardname }}</div>
            <div>{{ cardname.row.checkName }}</div>
            <div>{{ cardname.row.atmcheckName }}</div>
          </q-td>
        </template>

        <template #body-cell-PAYaccound="PAYaccound">
          <q-td>
            <!-- <pre>{{ PAYaccound.row }}</pre> -->
            <div>{{ PAYaccound.row.cardnumber }}</div>
            <div>{{ PAYaccound.row.checkAccount }}</div>
            <div>{{ PAYaccound.row.atmcheckAccount }}</div>
          </q-td>
        </template>

        <!-- 編輯|刪除 -->
        <template #body-cell-edit="edit">
          <q-td>
            <!-- {{edit.row}} -->
            <!-- <q-btn @click="openDialog(edit.row._id)">編輯</q-btn> -->
            <q-btn @click="deleteorder(edit.row._id)">刪除</q-btn>
          </q-td>
        </template>

      </q-table>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { apiAuth } from '../boot/axios'
import Swal from 'sweetalert2'

const orders = reactive([])
// console.log(orders)

const columns = [
  {
    name: '_id',
    required: true,
    label: '訂單ID',
    align: 'left',
    field: row => row._id,
    sortable: true
  },
  {
    name: 'user',
    required: true,
    label: '會員ID',
    align: 'left',
    field: row => row.user?._id,
    sortable: true
  },
  {
    name: 'name',
    required: true,
    label: '會員姓名',
    align: 'left',
    sortable: true
    // template #body-cell-name="name"
  },
  {
    name: 'phone',
    required: true,
    label: '會員電話',
    align: 'left',
    sortable: true
    // template #body-cell-phone="phone"
  },
  {
    name: 'products',
    required: true,
    label: '購買商品',
    align: 'left',
    sortable: true
    // template #body-cell-products="products"
  },
  {
    name: 'quantity',
    required: true,
    label: '購買數量',
    align: 'left',
    sortable: true
    // template #body-cell-quantity="quantity"
  },
  {
    name: 'PAY',
    required: true,
    label: '付款方式',
    align: 'left',
    sortable: true
    // template #body-cell-PAY="PAY"
  },
  {
    name: 'cardname',
    required: true,
    label: '持卡人姓名',
    align: 'left',
    sortable: true
    // template #body-cell-cardname="cardname"
  },
  {
    name: 'PAYaccound',
    required: true,
    label: '付款帳號 / 末五碼',
    align: 'left',
    sortable: true
    // template #body-cell-PAYaccound="PAYaccound"
  },
  {
    name: 'edit',
    required: true,
    label: '編輯 / 刪除',
    align: 'left',
    sortable: true
    // template #body-cell-edit="edit"
  }
]

const deleteorder = async (orderid) => {
  try {
    await apiAuth.delete('/orders/' + orderid)
    await Swal.fire({
      icon: 'success',
      title: '刪除成功'
    })
    // 在成功的地方再呼叫一次 function 即時更新刪除結果
    const idx = orders.findIndex(order => order._id === orderid)
    orders.splice(idx, 1)
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}

const init = async () => {
  try {
    const { data } = await apiAuth.get('/orders/all')
    orders.push(...data.result.map(order => {
      order.totalPrice = order.products.reduce((a, b) => {
        return a + b.product.price * b.quantity
      }, 0)
      return order
    }))
    console.log(orders)
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
