<template>
    <q-stepper
      v-model="step"
      ref="stepper"
      color="teal-10"
      animated
      alternative-labels
      class="q-pa-md text-teal-10"
    >
      <q-step
        :name="1"
        title="訂單確認"
        icon="settings"
        :done="step > 1"
      >
          <q-table
          title="訂單確認"
          :rows="cart"
          :columns="cartcolumns"
          row-key="name"
          hide-pagination
          class="text-teal-10"
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

          <div class="col-12 text-center q-pa-xl">
              <q-p class="text-h6">總金額 {{ totalPrice }}</q-p>
          </div>

      </q-step>

      <q-step
        :name="2"
        title="填寫入山入園資料"
        icon="assignment"
        :done="step > 2"
      >
      <div class="row justify-center">
        <div class="q-col-gutter-lg q-pa-lg" style="width: 60%" >
          <div class="q-py-md text-center" >
          * 表單資料請確實填寫，將使用於入山入園申請、山屋申請及登山意外險上！
          </div>

          <q-form class="q-gutter-md">
            <q-input
              label="請輸入姓名"
              type="name"
              v-model="confirmform.name"
              lazy-rules
              :rules="rules.name"
            />
            <!-- 性別 -->
            <!-- https://quasar.dev/vue-components/option-group -->
            <q-option-group
              v-model="confirmform.gender"
              :options="options"
              label="gender"
              color="primary"
              inline
              dense
            />
            <!-- 手機號碼 -->
            <q-input
              label="請輸入手機號碼"
              type="phone"
              v-model="confirmform.phone"
              lazy-rules
              :rules="rules.phone"
            />
            <!-- E-mail -->
            <q-input
              label="請輸入E-mail"
              type="email"
              v-model="confirmform.email"
              lazy-rules
              :rules="rules.email"
            />
            <!-- 生日 -->
            <!-- v-model="form.product_date.from" stack-label label='行程出發日期' :rules="['date']" -->
            <q-input
              label="請輸入生日"
              type="date"
              v-model="confirmform.birthday"
              stack-label
              lazy-rules
              :rules="rules.birthday"
            />
            <!-- 身分證字號 -->
            <q-input
              label="請輸入身分證字號"
              type="identification"
              v-model="confirmform.identification"
              lazy-rules
              :rules="rules.identification"
            />
            <!-- 緊急連絡人 -->
            <q-input
              label="請輸入緊急連絡人"
              type="emergencyContact"
              v-model="confirmform.emergencyContact"
              lazy-rules
              :rules="rules.emergencyContact"
            />
            <!-- 緊急連絡人電話 -->
            <q-input
              label="請輸入緊急連絡人電話"
              type="emergencyContactPhone"
              v-model="confirmform.emergencyContactPhone"
              lazy-rules
              :rules="rules.emergencyContactPhone"
            />
          </q-form>
        </div>
      </div>
      </q-step>

      <q-step
        :name="3"
        title="付款"
        icon="assignment"
        :done="step > 3"
      >
        <div class="row justify-center">
          <q-card class="q-pa-lg" style="width: 40%">
            <div class="text-h6 ">商品明細 :</div>
            <div v-for="(cart,idx) in cart" :key="idx">
            <pre>行程名稱 : {{cart.product.name }}</pre>
            <pre>報名日期 : {{cart.product.product_date}}</pre>
            <pre>金額 : {{cart.product.price}}</pre>
            <!-- <pre>{{cart}}</pre> -->
            —
            </div>
            <pre>匯款金額總計 : {{totalPrice}}</pre>
          </q-card>
        </div>

        <div class="text-h6 q-pa-xl text-center">請選擇付款方式</div>
        <!-- 判斷3個選擇其中一個資料 ------------------------------------------------------------------------------- -->
        <div class="row justify-center">
            <q-btn
            class="q-pa-xl text-center"
            style="width: 15%; border: 1px solid lightgray;"
            label="信用卡 / 金融卡"
            @click="prompt1 = true"
            />
            <q-btn
            class="q-pa-xl text-center"
            style="width: 15%; border: 1px solid lightgray;"
            label="LINE PAY / 街口支付"
            @click="prompt2 = true"
            />
            <q-btn
            class="q-pa-xl text-center"
            style="width: 15%; border: 1px solid lightgray;"
            label="ATM 轉帳"
            @click="prompt3 = true"
            />
        </div>

        <!-- 信用卡 / 金融卡付款 -->
        <q-dialog v-model="prompt1" persistent>
          <q-card style="min-width: 700px">
            <q-card-section>
              <div class="text-h6 q-py-sm text-teal-10 text-center">信用卡 / 金融卡付款</div>
            </q-card-section>

            <!-- input 表單內容 -->
            <q-card-section class="q-pt-none">
              <q-select
              outlined
              dense
              autofocus
              v-model="confirmform.cardtype"
              :options="cardpayoptions"
              label="信用卡類別"
              @keyup.enter="prompt1 = false"
              lazy-rules
              :rules="rules.cardtype"
              />
                <img src="https://i.imgur.com/h9dUH13.jpg" style="width: 45px; height: 25px;">
                <img src="https://i.imgur.com/iDUYpZl.jpg" style="width: 45px; height: 25px;">
                <img src="https://i.imgur.com/rQrYDoD.jpg" style="width: 40px; height: 25px;">
                <img src="https://i.imgur.com/mUiBGGX.jpg" style="width: 40px; height: 25px;">
              <q-input
              outlined
              v-model="confirmform.cardnumber"
              label="信用卡卡號" dense autofocus
              @keyup.enter="prompt1 = false"
              lazy-rules
              :rules="rules.cardnumber"
              />
              <q-input
              outlined
              dense
              autofocus
              v-model="confirmform.validitPeriod"
              label="卡號有效期限"
              @keyup.enter="prompt1 = false"
              lazy-rules
              :rules="rules.validitPeriod"
              />
              <q-input
              outlined
              dense
              autofocus
              v-model="confirmform.certification"
              label="信用卡認證碼"
              @keyup.enter="prompt1 = false"
              lazy-rules
              :rules="rules.certification"
              />
              <q-input
              outlined
              dense
              autofocus
              v-model="confirmform.cardname"
              label="持卡人姓名"
              @keyup.enter="prompt1 = false"
              lazy-rules
              :rules="rules.cardname"
              />
              <q-input
              outlined
              dense
              autofocus
              stack-label
              v-model="confirmform.cardbirthday"
              label="持卡人生日"
              type="date"
              @keyup.enter="prompt1 = false"
              lazy-rules
              :rules="rules.cardbirthday"
              />
              <q-input
              outlined
              dense
              autofocus
              v-model="confirmform.cardPhone"
              label="持卡人手機"
              @keyup.enter="prompt1 = false"
              lazy-rules
              :rules="rules.cardPhone"
              />
            </q-card-section>

            <q-card-actions align="right" class="text-teal-10">
              <q-btn flat label="完成" v-close-popup color="teal-10" />
              <q-btn flat label="取消" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <!-- LINE PAY / 街口支付付款 -->
        <q-dialog v-model="prompt2" persistent>
          <q-card style="min-width: 700px">
            <q-card-section>
              <div class="text-h6 q-py-sm text-teal-10 text-center">LINE PAY / 街口支付付款</div>
            </q-card-section>

            <!-- input 表單內容 -->
            <q-card-section class="q-pt-none row justify-center">
              <img src="https://i.imgur.com/zYSuY0R.jpg" style="width: 300px; height: 300px;">
              <img src="https://i.imgur.com/FCWWR7R.jpg" style="width: 300px; height: 300px;">
            </q-card-section>

            <div class="text-h6 q-py-sm text-teal-10 text-center">核對付款資料</div>
            <q-card-section class="q-pt-none row-8 justify-center">
              <q-select
              outlined
              dense
              autofocus
              v-model="confirmform.checkPay"
              :options="payoptions"
              label="付款方式"
              @keyup.enter="prompt1 = false"
              lazy-rules
              :rules="rules.checkPay"
              />
              <q-input
              outlined
              dense
              autofocus
              v-model="confirmform.checkName"
              label="姓名"
              @keyup.enter="prompt1 = false"
              lazy-rules
              :rules="rules.checkName"
              />
              <q-input
              outlined
              dense
              autofocus
              v-model="confirmform.checkAccount"
              label="帳戶後五碼" @keyup.enter="prompt1 = false"
              lazy-rules
              :rules="rules.checkAccount"
              />
            </q-card-section>

            <q-card-actions align="center" class="text-teal-10">
              <q-btn flat label="完成" v-close-popup color="teal-10" />
              <q-btn flat label="取消" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <!-- ATM 轉帳付款 -->
        <q-dialog v-model="prompt3" persistent>
          <q-card style="min-width: 700px">

            <q-card-section>
              <div class="text-h6 q-py-sm text-teal-10 text-center">ATM 轉帳付款</div>
              <div class="text-teal-10 q-px-xl column">轉帳資料</div>
              <div class="text-teal-10 q-px-xl column">銀行代號 : 013(代碼)</div>
              <div class="text-teal-10 q-px-xl column">銀行名 : 國泰世華銀行(假設)</div>
              <div class="text-teal-10 q-px-xl column">轉帳帳號 : 0000-0000-2222-1111</div>
              <div class="text-teal-10 q-px-xl column">轉帳金額 : {{totalPrice}}</div>
              <div class="text-teal-10 q-px-xl column">繳款期限：2022年09月10日13點以前 (一周內若無繳費自動取消訂單)</div>
            </q-card-section>

            <!-- input 表單內容 -->
            <div class="text-h6 q-py-sm text-teal-10 text-center">核對 ATM 轉帳資料</div>
            <q-card-section class="q-pt-none row-8 justify-center">
              <q-input
              outlined
              dense
              autofocus
              v-model="confirmform.atmcheckName"
              label="姓名"
              @keyup.enter="prompt1 = false"
              lazy-rules
              :rules="rules.atmcheckName"
              />
              <q-input
              outlined
              dense
              autofocus
              v-model="confirmform.atmcheckAccount"
              label="帳戶後五碼"
              @keyup.enter="prompt1 = false"
              lazy-rules
              :rules="rules.atmcheckAccount"
              />
              <q-input
              outlined
              dense
              autofocus
              v-model="confirmform.atmcheckDay"
              label="轉帳日期"
              @keyup.enter="prompt1 = false"
              lazy-rules
              :rules="rules.atmcheckDay"
              />
            </q-card-section>

            <q-card-actions align="right" class="text-teal-10">
              <q-btn flat label="完成" v-close-popup color="teal-10" />
              <q-btn flat label="取消" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <!-- <div class="row justify-center">
          <div class="q-col-gutter-lg q-py-xl" style="width: 50%" >
            <q-select v-model="model" :options="payoptions" label="請選擇付款方式"></q-select> -->

              <!-- <div v-if="payoptions[0]"> -->
                <!-- <q-dialog v-model="form.dialog" persistent>
                  <q-card class="q-pa-lg">
                    <q-form @submit.prevent='submitForm'>
                      <div class="text-h6 text-center">付款資料</div>
                      <q-input
                        label="請輸入"
                        type=""
                        v-model=""
                        lazy-rules
                        :rules="rules."
                      />
                    </q-form>
                  </q-card>
                </q-dialog> -->
              <!-- </div> -->
          <!-- </div>
        </div> -->
      </q-step>

      <q-step
        :name="4"
        title="完成"
        icon="fa-solid fa-clipboard-check"
      >
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation class="col-12 text-center q-pa-xl">
          <q-btn v-if="step<3"  @click="$refs.stepper.next()" color="teal-10" label="確認" />
          <!-- @click="finishConfirm"  -->
          <!-- <q-btn v-else @click="finishConfirm" color="primary" label="結帳" /> -->
          <!-- btn 跳頁 => <q-btn to="/"/> -->

            <q-btn v-else @click='user.checkout(confirmform)' :disabled='!canCheckout' :btn="btn" label="結帳" color="teal-10"></q-btn>

          <q-btn v-if="step > 1" flat color="teal-10" @click="$refs.stepper.previous()" label="返回" class="q-ml-sm" />
        </q-stepper-navigation>
      </template>
    </q-stepper>

</template>

<script setup>
// @click="finishConfirm"
// 寫 送出表單到後台 function (有點像 post 註冊資料傳後台)

import { reactive, ref, computed } from 'vue'
import Swal from 'sweetalert2'
import { apiAuth } from '../boot/axios'
import { useUserStore } from '../stores/example-store'

const user = useUserStore()
const cart = reactive([])
const step = ref(1)
// 付款方式 prompt
const prompt1 = ref(false)
const prompt2 = ref(false)
const prompt3 = ref(false)
/* 性別 eslint-disable */
const options = [
  {
    label: '男',
    value: 1
  },
  {
    label: '女',
    value: 2
  }
]

// 信用卡 / 金融卡付款 類別
const cardpayoptions = [
  {
    label: 'VISA',
    value: 1
  },
  {
    label: 'MasterCard',
    value: 2
  },
  {
    label: 'JCB',
    value: 3
  },
  {
    label: 'UnionPay',
    value: 4
  }
]

// LINE PAY / 街口支付付款 類別
const payoptions = [
  {
    label: 'LINE PAY',
    value: 1
  },
  {
    label: '街口支付',
    value: 2
  }
]

// 使用者購買訂單資料
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

// 及時更新數量/資料
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

// 總金額
const totalPrice = computed(() => {
  return cart.reduce((a, b) => {
    return a + b.product.price * b.quantity
  }, 0)
})

// 建立 confirmform 入山入園 + 付款表單
const confirmform = reactive({
  // 入山入園表單
  name: '',
  gender: 0,
  phone: '',
  email: '',
  birthday: '',
  identification: '',
  emergencyContact: '',
  emergencyContactPhone: '',
  // --- 付款表單 ---
  // 信用卡 / 金融卡付款
  cardtype: {},
  cardnumber: '',
  validitPeriod: '',
  certification: '',
  cardname: '',
  cardbirthday: '',
  cardPhone: '',
  // LINE PAY / 街口支付付款 核對付款資料
  checkPay: {},
  checkName: '',
  checkAccount: '',
  // ATM 轉帳付款 核對 ATM 轉帳資料
  atmcheckName: '',
  atmcheckAccount: '',
  atmcheckDay: ''
})

const rules = reactive({
  name: [
    v => !!v || '姓名必填'
  ],
  gender: [
    v => !!v || '性別必填'
  ],
  phone: [
    v => !!v || '手機必填'
  ],
  email: [
    v => !!v || 'mail必填'
  ],
  birthday: [
    v => !!v || '生日必填'
  ],
  identification: [
    v => !!v || '身分證字號必填'
  ],
  emergencyContact: [
    v => !!v || '緊急連絡人必填'
  ],
  emergencyContactPhone: [
    v => !!v || '緊急連絡人電話必填'
  ]
  // 3選1 必填方式 (補) ------------------------------------------------------------------------------
})

// 判斷是否有上架
const canCheckout = computed(() => {
  return cart.length > 0 && !cart.some(item => {
    return !item.product.sell
  })
})

const init = async () => {
  try {
    const { data } = await apiAuth.get('/users/cart')
    cart.push(...data.result)
    console.log(cart)
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
