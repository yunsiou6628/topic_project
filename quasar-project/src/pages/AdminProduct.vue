<!-- AdminProduct -->
<!-- 老師後台 admin - ProductsView.vue -->

<template>
  <!------------ 表單 ------------>
  <div class="q-pa-xl">
    <div class="text-h5 text-center">商品管理</div>
      <div class="col-12">
        <q-btn color='secondary' @click="openDialog('')"> 新增商品 </q-btn>
      </div>

      <!-- <q-input v-model="search" filled type="search" hint="Search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input> -->

      <div class="col-12">
        <q-table
        title="商品資料"
        :rows="products"
        :columns="columns"
        row-key="name"
        :filter="filter"
        >

        <!-- 搜尋 search -->
        <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <!-- 編輯|刪除 -->
        <template #body-cell-edit="edit">
          <q-td>
            <!-- {{edit}} -->
            <q-btn @click="openDialog(edit.row._id)">編輯</q-btn>
            <q-btn @click="deleteproduct(edit.row._id)">刪除</q-btn>
            </q-td>
        </template>

        <template #body-cell-product_date="product_date">
          <q-td>
            <!-- 修改顯示資料內容 -->
            {{new Date(product_date.row.product_date).toLocaleDateString()}}
            </q-td>
        </template>
        <!-- Template Slot (插槽) https://book.vue.tw/CH2/2-4-slots.html => Slot 方式加入按鈕 -->
        <!-- https://quasar.dev/vue-components/table#qtable-api -->
        <!-- Body slots <q-td>在裡面再新增一個按鈕</q-td> -->
        <!-- QTable API - body-cell-[name] Slot to define how a specific column cell looks like; replace '[name]' with column name (from columns definition object) -->
        </q-table>
      </div>
  </div>

  <!-- 新增商品 彈出視窗 -->
  <div class="q-pa-xl">
    <q-dialog v-model="form.dialog" persistent>
      <q-card class="q-pa-lg">
        <q-form @submit.prevent='submitForm'>
        <!-- @submit.prevent取消=改成執行'submitForm' => 不執行原本的submit，因為不知道資料要送去哪，新function會傳送到後台資料庫，點同一個 submit 按鈕，執行新的 function => submitForm -->
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
                  <q-select :options='options' v-model='form.sub' label='分類'></q-select>
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

const filter = ref('')
// 搜尋 filter : String | Object => 搜尋抓資料 https://quasar.dev/vue-components/table#qtable-api

// 把後台資料放入 options (未修改)
// const options = ['郊山', '步道', '中級山', '百岳行程']
// const options = ref('products_category')
const products = reactive([])
// ([]) products 丟到空陣列中

const form = reactive({
  // 清空欄位 + 賦予欄位資料型態 (欄位不一定宣告 const 的時候是空的) =>  '' 字串 , 0 數字 , true | false 布林值 , null 物件
  _id: '',
  name: '',
  product_date: '',
  // quasar date 的 model 型態是 String => https://quasar.dev/vue-components/date#introduction
  // models 的 product_date 型態給他 type: Date
  // 後台 controllers products.js 把原本 req.body.product_date 改成 new Date(req.body.product_date)
  // => 自動轉換成 Date
  region: '',
  reserve: 0,
  price: 0,
  sub: '',
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

// 打開表單(新增商品和編輯按鈕 開起的表單form)
const openDialog = (_id) => {
  const idx = _id === '' ? -1 : products.findIndex(product => product._id === _id)
  // console.log('開啟表單')
  form._id = _id
  if (idx > -1) {
    form.name = products[idx].name
    form.product_date = products[idx].product_date
    form.region = products[idx].region
    form.reserve = products[idx].reserve
    form.price = products[idx].price
    form.category = products[idx].category
    form.sell = products[idx].sell
    form.sub = products[idx].sub
    form.description = products[idx].description
    form.bulletin = products[idx].bulletin
  } else {
    form.name = ''
    form.product_date = ''
    form.region = ''
    form.reserve = 0
    form.price = 0
    form.category = ''
    form.sell = false
    form.sub = ''
    form.description = ''
    form.bulletin = ''
  }
  form.image = null
  form.idx = idx
  form.dialog = true
  form.valid = false
  form.submitting = false
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
      icon: 'error',
      title: '失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
  form.submitting = false
}

// 要對到資料順序
const columns = [
  {
    name: 'name',
    required: true,
    label: '商品名稱',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'product_date',
    required: true,
    label: '行程日期',
    align: 'left',
    field: row => row.product_date,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'region',
    required: true,
    label: '縣市區域',
    align: 'left',
    field: row => row.region,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'sub',
    required: true,
    label: '分類',
    align: 'left',
    field: row => row.sub,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'price',
    required: true,
    label: '金額',
    align: 'left',
    field: row => row.price,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'image',
    required: true,
    label: '商品圖片',
    align: 'left',
    field: row => row.image,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'description',
    required: true,
    label: '商品描述',
    align: 'left',
    field: row => row.description,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'bulletin',
    required: true,
    label: '公告提醒',
    align: 'left',
    field: row => row.reserve,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'reserve',
    required: true,
    label: '商品庫存',
    align: 'left',
    field: row => row.reserve,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'sell',
    required: true,
    label: '是否上架',
    align: 'left',
    field: row => row.sell,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'edit',
    required: true,
    label: '編輯修改',
    align: 'left',
    // field: row => row.sell,
    // format: val => `${val}`,
    sortable: true
  }
]

const deleteproduct = async (productid) => {
  try {
    await apiAuth.delete('/products/' + productid)
    await Swal.fire({
      icon: 'success',
      title: '刪除成功'
    })
    // 在成功的地方再呼叫一次 function
    init()
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
    // console.log('111')
    const { data } = await apiAuth.get('/products/all')
    // 抓取所有商品變成新的陣列(拷貝)
    products.splice(0, products.length)
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
