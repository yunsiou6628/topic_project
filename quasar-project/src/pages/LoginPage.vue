<!-- 註冊/登入頁面 -->
<!-- https://quasar.dev/vue-components/tab-panels -->
<!-- https://quasar.dev/vue-components/tab-panels -->
<!-- https://quasar.dev/vue-components/input -->

<template>
  <div class="q-pa-md q-py-xl row justify-center"
    style="height: 100vh; background-image: linear-gradient(to bottom,#F4F8EE, #fff); z-index: -1;">
    <div class="q-gutter-y-md" style="width: 800px">
      <q-card>
        <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify"
          narrow-indicator>
          <q-tab name="mails" label="註冊" />
          <q-tab name="alarms" label="登入" />
        </q-tabs>

        <q-separator />

        <!--  註冊 register -->
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="mails">

            <!-- 註冊 表單欄位 -->
            <div class="q-pa-xl">
              <q-form @submit.prevent='register' class="q-gutter-md items-start q-py-sm">
                <!-- 帳號 -->
                <div class="col-5">
                  {{ registerform.account }}
                  <q-input filled type='text' label="account" v-model="registerform.account" lazy-rules
                    :rules="rules.account" />
                </div>

                <!-- 密碼 -->
                <div class="col-5">
                  {{ registerform.password }}
                  <q-input filled type="password" label="password" v-model="registerform.password" lazy-rules
                    :rules="rules.password" />
                </div>

                <!-- 名字 -->
                <div class="col-5">
                  {{ registerform.name }}
                  <q-input filled type="name" label="name" v-model="registerform.name" lazy-rules :rules="rules.name" />
                </div>

                <!-- 性別 -->
                <!-- https://quasar.dev/vue-components/option-group -->
                <!-- <div class="q-pa-lg">
                  {{registerform.gender}}
                  <q-option-group
                    v-model="registerform.gender"
                    :options="options"
                    label="gender"
                    color="primary"
                    inline
                    dense
                  />
                </div> -->

                <!-- 生日 -->
                <!-- <div class="col-5">
                  {{ registerform.birthday }}
                <q-input v-model="registerform.birthday" filled type="date" label="birthday" />
                </div> -->

                <!-- 身分證字號 -->
                <!-- <div class="col-5">
                  {{registerform.identification}}
                <q-input
                  filled
                  type="identification"
                  label="identification"
                  v-model="registerform.identification"
                  lazy-rules
                  :rules="rules.identification"
                />
                </div> -->

                <!-- 手機號碼 -->
                <!-- <div class="col-5">
                  {{registerform.phone}}
                <q-input
                  filled
                  type="phone"
                  label="phone"
                  v-model="registerform.phone"
                  lazy-rules
                  :rules="rules.phone"
                />
                </div> -->

                <!-- E-mail -->
                <div class="col-5">
                  {{ registerform.email }}
                  <q-input filled v-model="registerform.email" type="email" label="E-mail">
                  </q-input>
                </div>

                <!-- 緊急連絡人 emergency contact -->
                <!-- <div class="col-5">
                  {{registerform.emergencyContact}}
                <q-input
                  filled
                  type="emergency contact"
                  label="emergency contact"
                  v-model="registerform.emergencyContact"
                  lazy-rules
                  :rules="rules.emergencyContact"
                />
                </div> -->

                <!-- 緊急連絡人電話 -->
                <!-- <div class="col-5">
                  {{registerform.emergencyContactPhone}}
                <q-input
                  filled
                  type="emergency contact phone"
                  label="emergency contact phone"
                  v-model="registerform.emergencyContactPhone"
                  lazy-rules
                  :rules="rules.emergencyContactPhone"
                />
                </div> -->

                <!-- 確認送出 -->
                <div class="q-gutter-md col-md-8 offset-md-0 q-mt-xl">
                  <q-btn label="Submit" type="submit" color="primary" />
                </div>
              </q-form>
            </div>
          </q-tab-panel>

          <!-- 登入 login -->
          <q-tab-panel name="alarms">
            <!-- <div class="text-h6">Alarms</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. -->

            <!-- 登入 表單欄位 -->
            <div class="q-pa-xl">
              <q-form @submit.prevent='login' class="q-gutter-md items-start q-py-sm">
                <q-input filled type='text' label="account" v-model="loginform.account" lazy-rules
                  :rules="rules.account" />

                <q-input filled type="password" label="password" v-model="loginform.password" lazy-rules
                  :rules="rules.password" />

                <div class="q-gutter-md">
                  <q-btn label="Submit" type="submit" color="primary" />
                </div>
              </q-form>
            </div>
          </q-tab-panel>

        </q-tab-panels>
      </q-card>

    </div>
  </div>
</template>

<script setup>
// 老師上課 LoginView.vue

import { ref, reactive } from 'vue'
import { useUserStore } from '../stores/example-store'
// import { isEmail } from 'validator'
import { api } from '../boot/axios'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const user = useUserStore()
const router = useRouter()
const loading = ref(false)

const tab = ref('mails')

// 建立 register 表單
const registerform = reactive({
  account: '',
  password: '',
  email: '',
  name: ''
  // gender: '',
  // birthday: '',
  // identification: '',
  // phone: '',
  // emergencyContact: '',
  // emergencyContactPhone: ''
})

// 建立 login 表單
const loginform = reactive({
  account: '',
  password: ''
})

const rules = reactive({
  account: [
    v => !!v || '帳號必填',
    v => (v.length >= 4 && v.length <= 20) || '帳號長度為 4 到 20 個字',
    v => /^[a-zA-Z0-9]+$/.test(v) || '帳號只能由英數字組成'
  ],
  password: [
    v => !!v || '密碼必填',
    v => (v.length >= 4 && v.length <= 20) || '密碼長度為 4 到 20 個字',
    v => /^[a-zA-Z0-9]+$/.test(v) || '密碼只能由英數字組成'
  ],
  email: [
    v => !!v || 'mail必填'
  ]
  // name: [
  //   v => !!v || '姓名必填'
  // ],
  // identification: [
  //   v => !!v || '身分證字號必填'
  // ],
  // phone: [
  //   v => !!v || '手機必填'
  // ],
  // emergencyContact: [
  //   v => !!v || '緊急連絡人必填'
  // ],
  // emergencyContactPhone: [
  //   v => !!v || '緊急連絡人電話必填'
  // ]
})

/*eslint-disable*/
// const group = ref(1)
// const options = [
//   {
//     label: '男',
//     value: 1
//   },
//   {
//     label: '女',
//     value: 2
//   }
// ]

// register
// 按 submit 後 傳送到後台
// quasar 不用像 vuetify 那樣引入 form-api => if (!valid.value) return
const register = async () => {
  loading.value = true
  try {
    await api.post('/users', registerform)
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
  loading.value = false
}

// login
// 按 submit 後 傳送到後台 stores - example-store.js
const login = () => {
  user.login(loginform)
}
</script>
