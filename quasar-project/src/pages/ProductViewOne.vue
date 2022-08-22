<!-- ProductViewOne -->
<!-- 單商品頁 -->
<template>
  <div class="q-pa-md q-gutter-sm">
    <q-breadcrumbs class="text-teal-9" active-color="light-green-4">
      <q-breadcrumbs-el label="登山行程" />
      <!-- 大分類 -->
      <q-breadcrumbs-el>
        大分類 -
        <pre>{{ product }}</pre>
      </q-breadcrumbs-el>
      <!-- 小分類 -->
      <q-breadcrumbs-el>
        小分類 -
        <pre>{{ product }}</pre>
      </q-breadcrumbs-el>
    </q-breadcrumbs>
  </div>

  <!-- 大尺寸 -->
  <div class="q-px-xxxl gt-md" style="margin-left:20%; margin-right:20%; color: #5E8A4B;">
    <div class="row">
      <div class="col-12 q-py-xl text-center" :ratio="4 / 3">
        <!-- https://quasar.dev/vue-components/img#qimg-api -->
        <q-img :src="product.image" />
      </div>
      <div class="col-12 q-py-sm text-weight-bold text-h4">
        <div> {{ product.name }} </div>
      </div>

      <div class="col-12 q-py-sm q-my-sm text-weight-bold text-h6 row">
        <div>{{ new Date(product.product_date.from).toLocaleDateString()
        }} </div>
        <div> ~ {{ new Date(product.product_date.to).toLocaleDateString()
        }} </div>
      </div>

      <div class="col-12 q-py-sm text-weight-bold text-h6">
        <div> ${{ product.price }} </div>
      </div>

      <div class="col-12 q-py-sm text-weight-bold text-subtitle1 ">
        <div> {{ product.bulletin }} </div>
      </div>

      <div class="col-12 q-py-sm text-weight-bold text-subtitle1 row">
        <span>※ 本活動以登山安全為重，堅持雙領隊前後照應，讓大家安心登山。</span>
        <span>※ 因應防疫措施，14天內有國外旅遊史、確診者接觸史，最晚出發前1週請來電告知更換時間或取消。</span>
      </div>

      <div class="col-12">
        <q-separator class="q-my-xl" />
      </div>

      <div class="col-12 q-px-xxxl ">
        <q-input v-model.number="quantity" type="number" filled label="數量" :rules='quantityRule'
          class="text-weight-bold text-subtitle1" style="color: #5E8A4B;" />
        <!-- 有時間再改寫 Applied to QBtn => https://quasar.dev/vue-directives/touch-repeat -->
      </div>

      <div class="col-12 q-py-sm text-subtitle1 row justify-center">
        <div> 庫存剩餘 {{ product.reserve }} </div>
      </div>

      <q-form v-model='valid' @submit.prevent='submit' class="col-12 row">
        <q-btn class="col-12 q-py-sm q-my-xl q-px-xxxl text-weight-bold" style=" background: #5E8A4B; color: #fff;"
          type='submit'>
          加入購物車</q-btn>
      </q-form>

      <div class="col-12 q-py-sm text-weight-bold text-subtitle1 text-wrapper">
        <div> {{ product.description }} </div>
      </div>

      <div class="col-12">
        <q-separator class="q-my-lg" />
      </div>

      <div class="column">
        <span>※ 費 用 說 明 :</span>
        <span>費用包含：500萬責任險
          (依規定15歲以下及70歲以上最高投保金額為200萬)、住宿(山屋或營地)、多天行程費用含早晚2餐/日（中餐、行動量自行準備）、高山包車費用、嚮導、領隊費用、山屋申請行政手續費等。</span>
        <span>費用不含：額外伙食、個人登山裝備等。</span>
      </div>

      <div class="col-12">
        <q-separator class="q-my-lg" />
      </div>

      <div class="column">
        <span>※ 報 名 注 意 事 項 :</span>
        <span>報名繳費後取消參加按照「國內旅遊定型化契約書」規定:</span>
        <span>距出發日前第41日以前取消扣活動費用 5%；</span>
        <span>出發日前第31日~第40日以前取消扣活動費用10%；</span>
        <span>出發日前第21日~第30日以內扣20%；</span>
        <span>出發日前第2日~第20日以內扣30%；</span>
        <span>出發前一日扣50%；出發當日未到則扣全額100%。</span>
        <span>
          乙方如能證明其所受損害超過以上之基準者，得就其實際損害請求賠償。其他事項按照「國內旅遊定型化契約書」規範執行。
        </span>
      </div>

      <q-btn class="col-12 q-py-sm q-my-xl q-px-xxxl text-weight-bold" style=" background: #5E8A4B; color: #fff;"
        type='submit' to="/ProductViewAll">
        返回行程
      </q-btn>

    </div>
  </div>

  <!-- 中小尺寸 -->
  <div class="lt-lg" style="margin-left:5%; margin-right:5%; color: #5E8A4B;">
    <div class="row">
      <div class="col-12 q-py-xl text-center">
        <!-- https://quasar.dev/vue-components/img#qimg-api -->
        <q-img :src="product.image" :ratio="4 / 3" />
      </div>
      <div class="col-12 q-py-sm text-weight-bold text-h4">
        <div> {{ product.name }} </div>
      </div>

      <div class="col-12 q-py-sm q-my-sm text-weight-bold text-h6 row">
        <div>{{ new Date(product.product_date.from).toLocaleDateString()
        }} </div>
        <div> ~ {{ new Date(product.product_date.to).toLocaleDateString()
        }} </div>
      </div>

      <div class="col-12 q-py-sm text-weight-bold text-h6">
        <div> ${{ product.price }} </div>
      </div>

      <div class="col-12 q-py-sm text-weight-bold text-subtitle1 ">
        <div> {{ product.bulletin }} </div>
      </div>

      <div class="col-12 q-py-sm text-weight-bold text-subtitle1 row">
        <span>※ 本活動以登山安全為重，堅持雙領隊前後照應，讓大家安心登山。</span>
        <span>※ 因應防疫措施，14天內有國外旅遊史、確診者接觸史，最晚出發前1週請來電告知更換時間或取消。</span>
      </div>

      <div class="col-12">
        <q-separator class="q-my-xl" />
      </div>

      <div class="col-12 q-px-xxl ">
        <q-input v-model.number="quantity" type="number" filled label="數量" :rules='quantityRule'
          class="text-weight-bold text-subtitle1" style="color: #5E8A4B;" />
        <!-- 有時間再改寫 Applied to QBtn => https://quasar.dev/vue-directives/touch-repeat -->
      </div>

      <div class="col-12 q-py-sm text-subtitle1 row justify-center">
        <div> 庫存剩餘 {{ product.reserve }} </div>
      </div>

      <q-form v-model='valid' @submit.prevent='submit' class="col-12 row">
        <q-btn class="col-12 q-py-sm q-my-xl q-px-xxxl text-weight-bold" style=" background: #5E8A4B; color: #fff;"
          type='submit'>
          加入購物車</q-btn>
      </q-form>

      <div class="col-12 q-py-sm text-weight-bold text-subtitle1 text-wrapper">
        <div> {{ product.description }} </div>
      </div>

      <div class="col-12">
        <q-separator class="q-my-lg" />
      </div>

      <div class="column">
        <span>※ 費 用 說 明 :</span>
        <span>費用包含：500萬責任險
          (依規定15歲以下及70歲以上最高投保金額為200萬)、住宿(山屋或營地)、多天行程費用含早晚2餐/日（中餐、行動量自行準備）、高山包車費用、嚮導、領隊費用、山屋申請行政手續費等。</span>
        <span>費用不含：額外伙食、個人登山裝備等。</span>
      </div>

      <div class="col-12">
        <q-separator class="q-my-lg" />
      </div>

      <div class="column">
        <span>※ 報 名 注 意 事 項 :</span>
        <span>報名繳費後取消參加按照「國內旅遊定型化契約書」規定:</span>
        <span>距出發日前第41日以前取消扣活動費用 5%；</span>
        <span>出發日前第31日~第40日以前取消扣活動費用10%；</span>
        <span>出發日前第21日~第30日以內扣20%；</span>
        <span>出發日前第2日~第20日以內扣30%；</span>
        <span>出發前一日扣50%；出發當日未到則扣全額100%。</span>
        <span>
          乙方如能證明其所受損害超過以上之基準者，得就其實際損害請求賠償。其他事項按照「國內旅遊定型化契約書」規範執行。
        </span>
      </div>

      <q-btn class="col-12 q-py-sm q-my-xl q-px-xxxl text-weight-bold" style=" background: #5E8A4B; color: #fff;"
        type='submit' to="/ProductViewAll">
        返回行程
      </q-btn>

    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from '../boot/axios'
import Swal from 'sweetalert2'
import { useUserStore } from '../stores/example-store'

const route = useRoute()
const router = useRouter()
const user = useUserStore()
const quantity = ref(1)
const quantityRule = reactive([
  v => v >= 1 || '數量錯誤'
])
const valid = ref(false)

// 把後台資料放入 options
const options = computed(() => {
  return product.map(product => {
    return {
      label: product.product_date,
      value: product._id
    }
  })
})

// 初始化
const product = reactive({
  _id: '',
  name: '',
  product_date: '',
  region: '',
  reserve: 0,
  price: 0,
  sub: '',
  sell: false,
  image: null,
  description: '',
  bulletin: '',
  idx: -1,
  dialog: false,
  valid: false,
  submitting: false,
  category: {
    _id: '',
    category: '',
    sub: []
  }
})

const submit = () => {
  // if (!valid.value) return
  user.addCart({ product: product._id, quantity: quantity.value })
}

const init = async () => {
  try {
    const { data } = await api.get('/products/' + route.params.id)
    console.log('21231' + data.result)
    product._id = data.result._id
    product.name = data.result.name
    product.product_date = data.result.product_date
    product.region = data.result.region
    product.reserve = data.result.reserve
    product.price = data.result.price
    product.category = data.result.category
    product.sub = data.result.sub
    product.sell = data.result.sell
    product.image = data.result.image
    product.description = data.result.description
    product.bulletin = data.result.bulletin
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: '取得商品資料失敗'
    })
    router.go(-1)
    // 錯了跳頁回去原本頁面
  }
}
init()
</script>
