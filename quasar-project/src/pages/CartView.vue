<!-- CartView 購物車 -->
<!-- A區 確認購物車訂單 -->
<!-- B區 填表單資料(入山入園資料) -->
<!-- C區 付款資料 -->
<template>

    <div class="q-pa-xl">
        <div class="col-12">
          <q-table
          title="購物車商品"
          :rows="cart"
          :columns="cartcolumns"
          row-key="name"
          hide-pagination
          >
          <template #body-cell-image="all">
            <q-td :img="img">
              <img :src="all.row.product.image" style="width:200px">
              <!-- <pre>{{all.row.product.image}}</pre> -->
            </q-td>
          </template>

          <template #body-cell-btn="all">
            <q-td :btn="btn">
              <q-btn @click="updateCart(all.rowIndex,0)">刪除</q-btn>
              <!-- <pre>{{all.rowIndex}}</pre> -->
            </q-td>
          </template>

          <template #body-cell-quantity="all">
            <q-td :btn="btn">
              <!-- (all.rowIndex 購物車內第幾個商品 , all.row.quantity+1 該商品數量) -->
              <q-btn @click="updateCart(all.rowIndex,all.row.quantity-1)">-</q-btn>
              <span class="q-px-lg">{{all.row.quantity}}</span>
              <q-btn @click="updateCart(all.rowIndex,all.row.quantity+1)">+</q-btn>
            </q-td>
          </template>
          </q-table>
        </div>

        <div class="col-12 text-center q-pa-xl">
          <!-- <div class="col-12 q-py-sm">
            <q-p class="text-h6">總金額 {{ totalPrice }}</q-p>
          </div> -->

            <!-- btn 跳頁 => <q-btn to="/"/> -->
            <div class="col-12 q-py-sm">
                <q-btn color='primary' to="/ConfirmOrder" label="確認"></q-btn>
            </div>
            <!-- <q-td :btn="btn">
              <q-btn @click='user.checkout' :disabled='!canCheckout'>結帳</q-btn>
            </q-td> -->
        </div>
    </div>

</template>

<script setup>
import { reactive, computed } from 'vue'
import Swal from 'sweetalert2'
import { apiAuth } from '../boot/axios'
import { useUserStore } from '../stores/example-store'

const user = useUserStore()

const cart = reactive([])

// 使用者購買
const cartcolumns = [
  {
    name: 'image',
    required: true,
    label: '商品圖片',
    align: 'left'
    // btn 在 template #body-cell-image 加入
  },
  {
    name: 'product',
    required: true,
    label: '購買商品',
    align: 'left',
    field: row => row.product.name,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'quantity',
    required: true,
    label: '購買數量',
    align: 'left',
    field: row => row.quantity,
    format: val => `${val}`
  },
  {
    name: 'price',
    required: true,
    label: '價錢',
    align: 'left',
    field: row => row.product.price,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'subtotal',
    required: true,
    label: '小計',
    align: 'left',
    field: row => row.product.price * row.quantity,
    // format: val => `${val}`,
    sortable: true
  },
  {
    name: 'btn',
    required: true,
    label: '操作',
    align: 'left'
    // btn 在 template #body-cell-btn 加入
  }
]

const updateCart = async (idx, quantity) => {
  console.log(cart[idx].product._id)
  const result = await user.updateCart({ product: cart[idx].product._id, quantity })
  if (result) {
    if (quantity === 0) {
      cart.splice(idx, 1)
    } else {
      cart[idx].quantity = quantity
    }
  }
}

const totalPrice = computed(() => {
  return cart.reduce((a, b) => {
    return a + b.product.price * b.quantity
  }, 0)
})

// const canCheckout = computed(() => {
//   return cart.length > 0 && !cart.some(item => {
//     return !item.product.sell
//   })
// })

const init = async () => {
  try {
    const { data } = await apiAuth.get('/users/cart')
    cart.push(...data.result)
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
