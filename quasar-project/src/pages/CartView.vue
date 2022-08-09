<!-- CartView 購物車 -->
<template>

    <div class="q-pa-xl">
        <div class="col-12">
          <q-table
          title="購物車"
          :rows="cart"
          :columns="cartcolumns"
          row-key="name"
          >
          </q-table>
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

const totalPrice = computed(() => {
  return cart.reduce((a, b) => {
    return a + b.product.price * b.quantity
  }, 0)
})
const canCheckout = computed(() => {
  return cart.length > 0 && !cart.some(item => {
    return !item.product.sell
  })
})

const updateCart = async (idx, quantity) => {
  const result = await user.updateCart({ product: cart[idx].product._id, quantity })
  if (result) {
    if (quantity === 0) {
      cart.splice(idx, 1)
    } else {
      cart[idx].quantity = quantity
    }
  }
}

const cartcolumns = [
  {
    name: 'product',
    required: true,
    label: '使用者購買商品',
    align: 'left',
    field: row => row.product,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'quantity',
    required: true,
    label: '使用者購買數量',
    align: 'left',
    field: row => row.quantity,
    format: val => `${val}`,
    sortable: true
  }
]

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
