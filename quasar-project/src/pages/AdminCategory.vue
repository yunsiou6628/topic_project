<!-- AdminCategory 分類 -->
<!-- 邊寫邊測試資料 -->

<template>
  <div class="q-pt-xl">
    <div class="text-h5 text-center">商品分類</div>
  </div>

  <div class="q-pa-xl">
    <div class="q-pb-xl row justify-center">
      <q-form @submit.prevent='submitForm'>
        <div class="row">
          <div class="col-12">
            <q-input outlined v-model="form.category" label="輸入大分類"/>
          </div>
          <!-- 在小分類增加多個資料 -->
          <div class="col-12" v-for="(sub,idx) in form.sub" :key="idx">
            <q-input outlined v-model="sub.name" label="輸入小分類"/>
            <q-btn v-if="idx===0" @click="form.sub.push({name:''})">+</q-btn>
            <q-btn v-else @click="form.sub.splice(idx,1)" id="submit">—</q-btn>
          </div>
        </div>

        <div class="q-pt-md row justify-center">
          <q-btn v-if="form._id === ''" type='submit' color='secondary'> 新增分類 </q-btn>
          <q-btn v-else type='submit' color='yellow-8'> 編輯確認 </q-btn>
          <q-btn color='primary' @click=cancel>取消</q-btn>
        </div>

      </q-form>
    </div>

    <div class="col-12">
      <q-table
      title="商品分類資料"
      :rows="addCategory"
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

        <template #body-cell-sub="sub">
          <q-td>
            <!-- <pre>{{ sub.row.sub}}</pre> -->
            <!-- <pre>{{ sub.row.sub[0].name }}</pre> -->
            <div v-for="subname in sub.row.sub" :key="subname">
            <pre>{{subname.name}}</pre>
            </div>
          </q-td>
        </template>

        <!-- 編輯|刪除 -->
        <template #body-cell-edit="edit">
          <q-td>
            <q-btn @click="editcategory(edit.row._id)">編輯</q-btn>
            <q-btn @click="deletecategory(edit.row._id)">刪除</q-btn>
            </q-td>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import Swal from 'sweetalert2'
import { apiAuth } from '../boot/axios'

const filter = ref('')

const addCategory = reactive([])

// 初始化
const form = reactive({
  _id: '',
  category: '',
  sub: [{ name: '' }],
  idx: -1,
  dialog: false,
  valid: false,
  submitting: false
})

// 取消 => 恢復 form 初始值
const cancel = () => {
  form._id = ''
  form.category = ''
  form.sub = [{ name: '' }]
  form.idx = -1
  form.dialog = false
  form.valid = false
  form.submitting = false
}

const editcategory = (_id) => {
  const idx = _id === '' ? -1 : addCategory.findIndex(addCategory => addCategory._id === _id)
  form._id = _id
  console.log(form._id)
  if (idx > -1) {
    form.category = addCategory[idx].category
    form.sub = addCategory[idx].sub
  } else {
    form.category = ''
    form.sub = ''
  }
  form.idx = idx
  form.dialog = true
  form.valid = false
  form.submitting = false
}

const submitForm = async () => {
  // console.log(form)
  form.submitting = true
  const fd = new FormData()
  for (const key in form) {
    if (['_id', 'idx', 'dialog', 'valid', 'submitting'].includes(key)) continue // 略過包含 _id', 'idx', 'dialog', 'valid', 'submitting' key 值(傳入後台不會用到的資料)
    else fd.append(key, form[key])
  }
  // console.log(fd.sub)
  try {
    // const { data } = await apiAuth.post('/products_category', form)
    // addCategory.push(data.result)
    // Swal.fire({
    //   icon: 'success',
    //   title: '成功',
    //   text: '新增成功'
    // })
    if (form._id.length === 0) {
      const { data } = await apiAuth.post('/products_category', form)
      addCategory.push(data.result)
      Swal.fire({
        icon: 'success',
        title: '成功',
        text: '新增成功'
      })
    } else {
      const { data } = await apiAuth.patch('/products_category/' + form._id, form)
      addCategory[form.idx] = data.result
      Swal.fire({
        icon: 'success',
        title: '成功',
        text: '編輯成功'
      })
      cancel()
      // 編輯成功 呼叫 初始化 function
      // form._id = ''
      // _id = '' 用來恢復 新增分類 的按鈕
    }
    form.dialog = false
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
    // console.log(error)
  }
  form.submitting = false
}

const columns = [
  {
    name: 'category',
    required: true,
    label: '大分類',
    align: 'left',
    field: row => row.category,
    sortable: true
  },
  {
    name: 'sub',
    required: true,
    label: '小分類',
    align: 'left',
    // field: row => row.sub[0].name,
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

// 暫時註解才不會刪錯資料
const deletecategory = async (categoryid) => {
  try {
    // await apiAuth.delete('/products_category/' + categoryid)
    // await Swal.fire({
    //   icon: 'success',
    //   title: '刪除成功'
    // })
    // 在成功的地方再呼叫一次 function
    init()
  } catch (error) {
    console.log('失敗')
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}

const init = async () => {
  try {
    const { data } = await apiAuth.get('/products_category/all')
    // 抓取所有商品變成新的陣列(拷貝)
    addCategory.splice(0, addCategory.length)
    addCategory.push(...data.result)
    // console.log(addCategory[0].category)
    // console.log(addCategory[3].sub[0].name)
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}
init()
</script>
