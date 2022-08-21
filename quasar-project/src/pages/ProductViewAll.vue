<!-- ProductViewAll -->
<!-- 已上架商品 -->
<template>
  <div>
    <!-- 大尺寸 -->
    <!-- horizontal -->
    <q-splitter v-model="splitterModel" class="gt-md">

      <template v-slot:before>
        <q-tabs v-model="tab" vertical style="color: #5E8A4B;">
          <q-tab class="text-h6 text-weight-bolder" name="difficulty">難度分類</q-tab>

          <div class="text-center">
            <div class="columns">
              <!-- 第一個迴圈抓大的分類組(大分類category+小分類sub => 對照資料庫，顯示category) -->
              <div class="col-3 " v-for='productscategory in productscategorys' :key='productscategory._id'>
                <div class="q-pa-xs text-h6  text-weight-bolder"> | {{ productscategory.category }} | </div>
                <!-- <div class="q-pa-xs text-h6">{{ productscategorys[1].sub[0].name }}</div> -->
                <!-- 第二個迴圈抓小的分類組(只有小分類sub => 對照資料庫，顯示sub 用tab包起來) -->
                <q-tab class="col-3 " :name="categoryname._id" v-for='categoryname in productscategory.sub'
                  :key='categoryname._id' @click="filterdata(categoryname._id, categoryname.name)">
                  <!-- <div class="q-pa-xs text-h6">{{ productscategory.sub }}</div> -->
                  <div class="q-pa-xs text-h6  text-weight-bold">{{ categoryname.name }}</div>
                  <!-- <div class="q-pa-xs text-h6">{{ categoryname._id }}</div> -->
                </q-tab>
              </div>
            </div>
          </div>

          <q-tab class="text-h6  text-weight-bolder" name="customized">客製化行程</q-tab>

          <!-- 原固定架構 -->
          <!-- <div class="col-12">
            <div class="text-subtitle1 text-center"> | 台灣百岳 | </div>
            <q-tab name="Baiyue_novice" label="百岳新手推薦" />
            <q-tab name="Baiyue_getting_started" label="百岳入門行程" />
            <q-tab name="Baiyue_advanced" label="百岳進階行程" />
          </div> -->

        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels v-model="tab" animated swipeable vertical>

          <!-- 難度分類 -->
          <q-tab-panel name="difficulty" class=" text-weight-bold" style="color: #5E8A4B;">
            <div class="text-h4 q-mb-md">難度分類</div>
            <div class="q-py-md">
              <p>百岳：3000公尺以上的特定山峰。</p>
              <p>中級山：1000～3000公尺。</p>
              <p>郊山：1000公尺以下。</p>
            </div>
            <div class="q-py-md">
              <p>百岳 A 級 : 一般健行路線 1 - 3 天</p>
              <p>百岳中高級B、C級 : 中高級路線 3 - 5 天</p>
              <p>百岳高級B、C級 : 4天以上行程</p>
              <p>百岳高級C+級 : 4天以上長天數縱走行程</p>
            </div>

            <!-- 有時間再改成從後台可編輯 -->
            <div class="text-h4">行前須知</div>
            <div>
              <h6>登山技巧</h6>
              <p>登山初行稍慢步幅不宜長，調整步伐速度要穩定，逐漸增加速度，以大腿帶動膝蓋和小腿前進逐步而行，保持平衡及韻律。</p>
              <p>登山步行，上半身稍前傾，將重心置於腰部並保持穩定，腳踏實地，體重由腳平均負擔。可搭配使用登山杖協助行進。</p>
              <p>休息要適當，中途休息不可太久，以每小時5至10分鐘，每3小時大休息1次，時間約為20分鐘為原則。</p>
              <p>上坡最耗體能，需補充大量氧氣，喘氣宜深且穩，並與步伐配合。</p>
              <p>下坡速度應節奏化，不宜過慢以保持熱身狀態，亦不宜過快躁進，以免腳步不穩跌倒甚至踏空墜落。</p>
              <p>攀爬山壁時勿急躁，先以手足試探著力點之穩定性，謹守「三點不動一點動」之原則。</p>
              <p>雪季登山，應有完備之雪攀裝備及受過雪攀之訓練與技巧。</p>
            </div>
          </q-tab-panel>

          <!-- 大小分類商品資料 -->
          <!-- productsubResult[0]?.sub => 抓到商品小分類第一筆資料的小分類 sub 的 id 右邊區塊 tab-panel (用 sub 的 id 對應到左邊欄位 tab) -->
          <!-- v-for 要放在 tab-panel 下一層，因一個 tab 只會對應一個 tab-panel，若放在 tab-panel 同層跑回圈，會抓到 4 個 tab-panel 商品資料，但只能顯示一個其他資料不會顯示，放在 -->
          <!-- tab-panel 下一層跑回圈，用 tab-panel 包 4 個商品資料，就可以顯示全部商品 -->
          <q-tab-panel class="row q-px-xxxl" :name="productsubResult[0]?.sub">

            <!-- 小分類標題 -->
            <div class="col-12 q-pt-xl flex flex-center text-weight-bold text-h3" style="color: #5E8A4B;">
              <div>{{ mainname }}</div>
            </div>

            <!-- 分隔線 -->
            <div class="col-12">
              <q-separator class="q-my-xl" />
            </div>

            <!-- 行程 card -->
            <div class="col-12 col-md-6 col-lg-4 q-pa-sm " v-for="subResult in productsubResult" :key="subResult.sub">
              <ProductCard :product='subResult' />
              <!-- 測試顯示資料 -->
              <!-- <q-card class="test-card q-pa-md q-ma-md column">
                <div>{{productsubResult[0]?.name}}</div>
                <div>{{productsubResult[0]?._id}}</div>
                <div>{{subResult._id}}</div>
                <div>{{subResult.sub}}</div>
                <div>{{'$'+ subResult.price}}</div>
                <div>{{new Date(subResult.product_date).toLocaleDateString()}}</div>
                <q-img :src="subResult.image" />
              </q-card> -->
            </div>

          </q-tab-panel>

          <!-- 客製化行程 -->
          <q-tab-panel name="customized" class=" text-weight-bold" style="color: #5E8A4B;"></q-tab-panel>
          <div class="text-h4 q-mb-md"> 客製化行程 </div>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
            quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam.
            In, libero.</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
            quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam.
            In, libero.</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
            quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam.
            In, libero.</p>
          </q-tab-panel>
        </q-tab-panels>

      </template>
    </q-splitter>
  </div>

  <!-- 所有商品卡片內容 測試 ---------------->
  <!-- 商品顯示 => 把 init() 從後台抓取到的資料放入 products 後，對 products 跑回圈，前台商品頁就會顯示跑過的每一筆資料(全部商品) -->
  <!-- ProductCard => components 的 ProductCard.vue (=> 重複 code 寫成一個元件) -->
  <!-- :product='product' => 把 products 陣列裡面的 'product' 商品物件資料，放到 components 裡面 ProductCard.vue 相對應位置 :product 中 -->

  <!-- <div class="q-pa-md row items-start q-gutter-md">
      <div class="row" >
        <q-tab-panel :name="product.sub._id" class="col-3 " v-for='product in products' :key='product._id'>
          <ProductCard :product='product' />
          {{product.sub}}
          {{product.sub._id}}
          {{product._id}}
        </q-tab-panel>
      </div>
    </div> -->

  <!-- 中小尺寸 -->
  <div class="lt-lg">
    <q-splitter v-model="splitterModel" horizontal>

      <template v-slot:before>
        <q-tabs v-model="tab" inline-label class="text-white shadow-2 row justify-center"
          style="height:60px; background: #5E8A4B;">

          <q-tab class="text-subtitle1 text-weight-bolder" name="difficulty">難度分類</q-tab>

          <q-btn-dropdown auto-close stretch flat :label="productscategory.category"
            class="text-subtitle1 row justify-center text-weight-bolder" v-for='productscategory in productscategorys'
            :key='productscategory._id'>

            <q-tab clickable :name="categoryname._id" v-for='categoryname in productscategory.sub'
              :key='categoryname._id' @click="filterdata(categoryname._id, categoryname.name)">
              <q-item-section class="q-pa-xs text-subtitle1 text-weight-bolder" style="color:#5E8A4B;">{{
                  categoryname.name
              }}
              </q-item-section>
            </q-tab>
          </q-btn-dropdown>

          <q-tab class="text-subtitle1 text-weight-bolder" name="customized">客製化行程</q-tab>
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels v-model="tab" animated swipeable vertical class="text-weight-bolder" style="color:#5E8A4B;">

          <!-- 難度分類 -->
          <q-tab-panel name="difficulty">
            <div class="text-h4 q-mb-md">難度分類</div>
            <div class="q-py-md">
              <p>百岳：3000公尺以上的特定山峰。</p>
              <p>中級山：1000～3000公尺。</p>
              <p>郊山：1000公尺以下。</p>
            </div>
            <div class="q-py-md">
              <p>百岳 A 級 : 一般健行路線 1 - 3 天</p>
              <p>百岳中高級B、C級 : 中高級路線 3 - 5 天</p>
              <p>百岳高級B、C級 : 4天以上行程</p>
              <p>百岳高級C+級 : 4天以上長天數縱走行程</p>
            </div>

            <!-- 有時間再改成從後台可編輯 -->
            <div class="text-h4">行前須知</div>
            <div>
              <h6>登山技巧</h6>
              <p>登山初行稍慢步幅不宜長，調整步伐速度要穩定，逐漸增加速度，以大腿帶動膝蓋和小腿前進逐步而行，保持平衡及韻律。</p>
              <p>登山步行，上半身稍前傾，將重心置於腰部並保持穩定，腳踏實地，體重由腳平均負擔。可搭配使用登山杖協助行進。</p>
              <p>休息要適當，中途休息不可太久，以每小時5至10分鐘，每3小時大休息1次，時間約為20分鐘為原則。</p>
              <p>上坡最耗體能，需補充大量氧氣，喘氣宜深且穩，並與步伐配合。</p>
              <p>下坡速度應節奏化，不宜過慢以保持熱身狀態，亦不宜過快躁進，以免腳步不穩跌倒甚至踏空墜落。</p>
              <p>攀爬山壁時勿急躁，先以手足試探著力點之穩定性，謹守「三點不動一點動」之原則。</p>
              <p>雪季登山，應有完備之雪攀裝備及受過雪攀之訓練與技巧。</p>
            </div>
          </q-tab-panel>

          <!-- 大小分類商品資料 -->
          <!-- productsubResult[0]?.sub => 抓到商品小分類第一筆資料的小分類 sub 的 id 右邊區塊 tab-panel (用 sub 的 id 對應到左邊欄位 tab) -->
          <!-- v-for 要放在 tab-panel 下一層，因一個 tab 只會對應一個 tab-panel，若放在 tab-panel 同層跑回圈，會抓到 4 個 tab-panel 商品資料，但只能顯示一個其他資料不會顯示，放在 tab-panel 下一層跑回圈，用 tab-panel 包 4 個商品資料，就可以顯示全部商品 -->
          <q-tab-panel class="row q-px-xxxl" :name="productsubResult[0]?.sub">

            <!-- 小分類標題 -->
            <div class="col-12 q-pt-xl flex flex-center text-weight-bold text-h3" style="color: #5E8A4B;">
              <div>{{ mainname }}</div>
            </div>

            <!-- 分隔線 -->
            <div class="col-12">
              <q-separator class="q-my-xl" />
            </div>

            <!-- 行程 card -->
            <div class="col-12 col-md-6 col-lg-4 q-pa-sm " v-for="subResult in productsubResult" :key="subResult.sub">
              <ProductCard :product='subResult' />
              <!-- 測試顯示資料
                <q-card class="test-card q-pa-md q-ma-md column">
                <div>{{productsubResult[0]?.name}}</div>
                <div>{{productsubResult[0]?._id}}</div>
                <div>{{subResult._id}}</div>
                <div>{{subResult.sub}}</div>
                <div>{{'$'+ subResult.price}}</div>
                <div>{{new Date(subResult.product_date).toLocaleDateString()}}</div>
                <q-img :src="subResult.image" />
              </q-card> -->
            </div>

          </q-tab-panel>

          <!-- 客製化行程 -->
          <q-tab-panel name="customized">
            <div class="text-h4 q-mb-md"> 客製化行程 </div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
              quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla
              ullam.
              In, libero.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
              quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla
              ullam.
              In, libero.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
              quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla
              ullam.
              In, libero.</p>
          </q-tab-panel>
        </q-tab-panels>

      </template>
    </q-splitter>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import Swal from 'sweetalert2'
import { api } from '../boot/axios'
import ProductCard from '../components/ProductCard.vue'

// 初始化
const form = reactive({
  sub: ''
})

const tab = ref('difficulty')
const splitterModel = ref(20)

const mainname = ref('')
const products = reactive([])
const productscategorys = reactive([])
const productsubResult = reactive([])

// 已上架商品的小分類sub id
// click 按鈕 function => 左欄位 tab 對應到 右區塊 tab-panels 的 function
const filterdata = async (productsubid, categoryname) => {
  form.sub = productsubid
  mainname.value = categoryname
  // console.log(form.sub)
  try {
    const { data } = await api.post('/products/sub', form)
    // console.log(data.result)
    productsubResult.splice(0, productsubResult.length)
    productsubResult.push(...data.result)
    // console.log(productsubResult[0].sub)
  } catch (error) {
    // console.log(error)
  }
}

const findCategoryIdx = (subid) => {
  let sidx = -1
  const cidx = productscategorys.findIndex(cat => {
    const idx = cat.sub.findIndex(s => s._id === subid)
    if (idx > -1) {
      sidx = idx
      return true
    } else return false
  })
  return { sidx, cidx }
}

// 抓 products_category/all 和 /products 資料
// splice 清空陣列
const init = async () => {
  try {
    const { data: categoryData } = await api.get('/products_category/all')
    // console.log('here')
    productscategorys.splice(0, productscategorys.length)
    // 後台資料存入 productscategorys 陣列中
    productscategorys.push(...categoryData.result)
    // console.log(productscategorys)
    console.log('here')
    const { data } = await api.get('/products')
    products.push(...data.result.map(product => {
      const idxs = findCategoryIdx(product.sub)
      // console.log(idxs)
      // 判斷大小分類狀態顯示
      product.category = {
        _id: productscategorys[idxs.cidx]?._id || '',
        name: productscategorys[idxs.cidx]?.category || '未分類'
      }
      product.sub = {
        _id: productscategorys[idxs.cidx]?.sub[idxs.sidx]?._id || '',
        name: productscategorys[idxs.cidx]?.sub[idxs.sidx]?.name || '未分類'
      }
      return product
    }))
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
