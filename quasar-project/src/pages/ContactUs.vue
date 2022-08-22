<!-- ContactUs -->
<template>
  <div class="row justify-center q-px-xxl q-py-lg contactus-mb"
    style="height: 100vh; color: #5E8A4B; background-image: linear-gradient(to bottom,#F4F8EE, #fff); z-index: -1;">

    <div class="col-12">

      <div class="col-12 column text-center">
        <span class="text-h4 q-py-lg text-weight-bold">聯絡我們</span>
        <span class="text-subtitle1 text-weight-bold">感謝您主動聯絡，請填寫表單，我們將於工作週期間48小時內回覆。</span>
      </div>

      <!-- 表單欄位 -->
      <div class="q-pa-md-lg q-pa-lg"></div>
      <q-form @submit.prevent='contactus' class="q-gutter-md">

        <div class="row justify-center q-pt-sm">
          <div class="col-12 col-lg-5 q-pt-sm q-px-md">
            <!-- 抓資料要加 v-model='form' -->
            <!-- 範例 q-input outlined v-model="text" label="Outlined" -->
            <q-input outlined label='姓名' :rules='[rules.required]'></q-input>
          </div>

          <div class="col-12 col-lg-5 q-pt-sm q-px-md">
            <!-- 抓資料要加 v-model='form' -->
            <q-input outlined label='電話' :rules='[rules.required]'></q-input>
          </div>
        </div>

        <div class="row justify-center">
          <div class="col-12 col-lg-5 q-pt-sm q-px-md">
            <!-- 抓資料要加 v-model='form' -->
            <q-input outlined label='email' :rules='[rules.required]'></q-input>
          </div>

          <div class="col-12 col-lg-5 q-pt-sm q-px-md">
            <q-select outlined v-model="model" :options="options" label="選擇詢問項目" :rules='[rules.required]' />
          </div>
        </div>

        <div class="row justify-center">
          <div class="col-12 col-lg-10 q-pt-sm q-px-md">
            <q-input v-model="textareaModel" outlined clearable type="textarea" label="請輸入您的需求"
              :shadow-text="textareaShadowText" @keydown="processTextareaFill" @focus="processTextareaFill" />
          </div>
        </div>

        <!-- 確認送出 -->
        <div class="q-gutter-md col-md-8 offset-md-0 row justify-center ">
          <q-btn label="送出" type="submit" class="col-3" style=" background: #5E8A4B; color: #fff;" />
        </div>

      </q-form>
    </div>

  </div>

</template>

<script setup>
import { ref, reactive } from 'vue'
import { useUserStore } from '../stores/example-store'
// import { isEmail } from 'validator'
import { api } from '../boot/axios'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const router = useRouter()
const model = ref(null)
const options = ['1.客製化行程', '2.問題提問', '3.改進建議', '4.其他']

// 建立表單 初始化
const form = reactive({
  account: '',
  password: '',
  email: '',
  name: ''
})

const rules = reactive({
  required(v) {
    return !!v || '必填'
  },
  price(v) {
    return v > -1 || '必須大於等於 0'
  },
  size(v) {
    return !v || !v.length || (v[0]?.type?.includes('image') && v[0]?.size < 1024 * 1024) || '檔案格式不符'
  }
})

// 按 submit 後 傳送到後台
const contactus = async () => {
  try {
    await api.post('/users', form)
    await Swal.fire({
      icon: 'success',
      title: '成功',
      text: '註冊成功'
    })
    router.push('/')
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: (error.isAxiosError && error.response.data) ? error.response.data.message : '發生錯誤'
    })
  }
}
</script>
