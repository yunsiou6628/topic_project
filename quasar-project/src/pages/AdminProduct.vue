<!-- AdminProduct -->

<!-- 老師後台 admin - ProductsView.vue -->

<template>
  <!------------ 表單 ------------>
  <div class="q-pa-xl">
      <div class="col-12">
        <q-btn color='secondary' @click="openDialog('', -1)"  > 新增商品1 </q-btn>
      </div>

      <div class="col-12">
        <q-table
        title="商品管理"
        :rows="products"
        :columns="columns"
        row-key="name"
        >
          <!-- <thead>
            <tr>
              <th> 商品名稱 </th>
              <th> 金額 </th>
              <th> 行程日期 </th>
              <th> 剩餘名額 </th>
              <th> 是否上架 </th>
              <th> 編輯|刪除 </th>
            </tr>
          </thead> -->
          <!-- <tbody> -->
              <tr v-for='product in products' :key='product._id'>
                <q-img :src="product.image" />
                <!-- {{ product.name }} -->
              </tr>
            <q-btn color='primary' @click="openDialog(product._id, idx)">編輯</q-btn>
          <!-- </tbody> -->
        </q-table>
      </div>
  </div>

  <div class="q-pa-xl">
    <q-dialog v-model="form.dialog" persistent>
      <q-card class="q-pa-lg">
        <q-form @submit.prevent='submitForm'>
        <!-- @submit.prevent取消=改成執行'submitForm' => 不執行原本的submit，因為不知道資料要送去哪，新function會傳送到後台資料庫，點同一個 submit 按鈕，執行新的 function => submitForm -->
          <q-card-title>
            <!-- <q-h5 {{ form._id.length > 0 ? '編輯商品' : '新增商品' }} ></q-h5> -->
          </q-card-title>
              <div class="row">
                <div class="col-12">
                  <q-input v-model='form.name' label='名稱' :rules='[rules.required]'></q-input>
                </div>
                <div class="col-12">
                    {{typeof(form.product_date)}}
                  <q-input v-model='form.product_date' stack-label label='行程日期' :rules='[rules.required]' filled type="date" hint="Native date"></q-input>
                </div>
                <div class="col-12">
                  <q-input v-model='form.region' label='縣市區域' :rules='[rules.required]'></q-input>
                </div>
                <div class="col-12">
                  <q-select :options='options' v-model='form.category' label='分類' :rules='[rules.required]'></q-select>
                </div>
                <div class="col-12">
                  <q-input type='number' v-model.number='form.price' label='價格' :rules='[rules.required, rules.price]'></q-input>
                </div>
                <div class="col-12">
                  <q-file v-model='form.image' show-size accept='image/*' label='商品圖片' :rules='[rules.size]'></q-file>
                </div>
                <div class="col-12">
                  <q-input type="textarea" v-model='form.description' label='商品描述'></q-input>
                </div>
                <div class="col-12">
                  <q-input type="textarea" v-model='form.bulletin' label='公告提醒'></q-input>
                </div>
                <div class="col-12">
                  <q-input v-model='form.reserve' label='庫存數量(名額)'></q-input>
                </div>
                <div class="col-12">
                  <q-checkbox v-model='form.sell' label='上架'></q-checkbox>
                </div>
              </div>
          <q-card-actions>
            <q-spacer>
              <q-btn type='submit' color='primary' v-close-popup>確定</q-btn>
              <q-btn color='primary' @click='form.dialog = false' v-close-popup>取消</q-btn>
            </q-spacer>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>

  <!------------ 日曆 ------------>
  <!-- 文件 -->
  <!-- https://quasar.dev/vue-components/date#usage -->
  <!-- https://quasar.dev/quasar-utils/date-utils -->

</template>

<script setup>
import { reactive, ref } from 'vue'
// reactive 陣列或物件 ref 變數 => vue 用法， 要在 vue 使用要 import 加 { reactive, ref }
import Swal from 'sweetalert2'
import { apiAuth } from '../boot/axios'

const flag = ref(false)

const options = ['郊山', '步道', '中級山', '百岳行程']
const products = reactive([])
const form = reactive({
  // 清空欄位 + 賦予欄位資料型態 (欄位不一定宣告 const 的時候是空的) =>  '' 字串 , 0 數字 , true | false 布林值 , null 物件
  _id: '',
  name: '',
  product_date: 0,
  // product_date: 0, => 需再確認型態
  region: '',
  reserve: 0,
  price: 0,
  category: '',
  sell: false,
  image: null,
  // quasar 接收檔案是 Objecy filed 檔案物件 => null
  description: '',
  bulletin: '',
  idx: -1,
  dialog: false,
  valid: false,
  submitting: false
})
const rules = reactive({
  required (v) {
    return !!v || '必填'
  },
  price (v) {
    return v > -1 || '必須大於等於 0'
  },
  size (v) {
    return !v || !v.length || (v[0]?.type?.includes('image') && v[0]?.size < 1024 * 1024) || '檔案格式不符'
  }
})

//  ******************************* 還沒修改內容 ***************************************
// 打開表單(新增商品和編輯按鈕 開起的表單form)
const openDialog = (_id, idx) => {
  console.log('開啟表單')
  form._id = _id
  if (idx > -1) {
    form.name = products[idx].name
    form.product_date = products[idx].product_date
    form.region = products[idx].region
    form.reserve = products[idx].reserve
    form.price = products[idx].price
    form.category = products[idx].category
    form.sell = products[idx].sell
    form.description = products[idx].description
    form.bulletin = products[idx].bulletin
  } else {
    form.name = ''
    form.product_date = 0
    form.region = ''
    form.reserve = 0
    form.price = 0
    form.category = ''
    form.sell = false
    form.description = ''
    form.bulletin = ''
  }
  form.image = null
  form.idx = idx
  form.dialog = true
  form.valid = false
  form.submitting = false
  flag.value = true
}

// 送出表單 (不執行原本的submit， 點同一個 submit 按鈕，執行新的 function => submitForm)
const submitForm = async () => {
  form.submitting = true

  // FormData() 用意 => 把輸入資料轉換成後台可以接收的資料型態
  // key = i 的角色，要去跑 舊的 form 表單每一筆資料
  // append 附加資料到 fd 新陣列裡面
  const fd = new FormData()
  for (const key in form) {
    if (['_id', 'idx', 'dialog', 'valid', 'submitting'].includes(key)) continue
    else fd.append(key, form[key])
  }
  console.log(fd)
  try {
    if (form._id.length === 0) {
      // apiAuth 後台路徑
      const { data } = await apiAuth.post('/products', fd)
      products.push(data.result)
      Swal.fire({
        icon: 'success',
        title: '成功',
        text: '新增成功'
      })
    } else {
      const { data } = await apiAuth.patch('/products/' + form._id, fd)
      products[form.idx] = data.result
      Swal.fire({
        icon: 'success',
        title: '成功',
        text: '編輯成功'
      })
    }
    form.dialog = false
  } catch (error) {
    Swal.fire({
      icon: 'success',
      title: '失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
  form.submitting = false
}

const init = async () => {
  try {
    console.log('111111111')
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
init()

</script>
