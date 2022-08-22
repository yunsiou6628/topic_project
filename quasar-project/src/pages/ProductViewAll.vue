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
          <!-- 有時間再改成從後台可編輯 -->
          <q-tab-panel name="difficulty" class="row justify-center " style="color: #5E8A4B;">
            <div class="col-12 row justify-center text-h4 q-pa-lg text-weight-bold">難度分類</div>

            <div class="col-12 row justify-center">
              <q-separator class="q-my-lg " style="width:80%" />
            </div>

            <div
              class="col-12 q-py-md column justify-center content-center items-start text-weight-bold text-subtitle1">
              <p>百岳：3000公尺以上的特定山峰。</p>
              <p>中級山：1000～3000公尺。</p>
              <p>郊山：1000公尺以下。</p>
            </div>
            <div
              class="col-12 q-py-md column justify-center content-center items-start text-weight-bold text-subtitle1">
              <p>百岳 A 級 : 一般健行路線 1 - 3 天</p>
              <p>百岳中高級B、C級 : 中高級路線 3 - 5 天</p>
              <p>百岳高級B、C級 : 4天以上行程</p>
              <p>百岳高級C+級 : 4天以上長天數縱走行程</p>
            </div>

            <div class="col-12 row justify-center">
              <q-separator class="q-my-lg " style="width:80%" />
            </div>

            <div class="col-12 row justify-center text-h4 q-pa-lg text-weight-bold">行前須知</div>

            <div class="col-12 q-py-md text-h6 text-weight-bold" style="width:800px">登山技巧</div>
            <div class="col-12 q-py-md column justify-center text-weight-bold text-subtitle1" style="width:800px">
              <p>◆ 登山初行稍慢步幅不宜長，調整步伐速度要穩定，逐漸增加速度，以大腿帶動膝蓋和小腿前進逐步而行，保持平衡及韻律。</p>
              <p>◆ 登山步行，上半身稍前傾，將重心置於腰部並保持穩定，腳踏實地，體重由腳平均負擔。可搭配使用登山杖協助行進。</p>
              <p>◆ 休息要適當，中途休息不可太久，以每小時5至10分鐘，每3小時大休息1次，時間約為20分鐘為原則。</p>
              <p>◆ 上坡最耗體能，需補充大量氧氣，喘氣宜深且穩，並與步伐配合。</p>
              <p>◆ 下坡速度應節奏化，不宜過慢以保持熱身狀態，亦不宜過快躁進，以免腳步不穩跌倒甚至踏空墜落。</p>
              <p>◆ 攀爬山壁時勿急躁，先以手足試探著力點之穩定性，謹守「三點不動一點動」之原則。</p>
              <p>◆ 雪季登山，應有完備之雪攀裝備及受過雪攀之訓練與技巧。</p>
            </div>

            <div class="col-12 q-py-md text-h6 text-weight-bold" style="width:800px">登山安全</div>
            <div class="col-12 q-py-md column justify-center text-weight-bold text-subtitle1" style="width:800px">
              <p>活動前須知 :</p>
              <p>◆ 尊重大自然、敬愛大自然，不要以輕忽或征服的心態從事登山活動。</p>
              <p>◆ 平時即鍛練體能，培養登山技能，並多吸收野外活動知識。</p>
              <p>◆ 攀登高山前行程需先前瞭解，並將行程告知家人。</p>
              <p>◆ 對於登山裝備及糧食，應準備齊全不可短缺，且於活動前徹底檢查。</p>
              <br>
              <p>活動中須知 :</p>
              <p>◆ 與領隊、同伴同行，嚴禁脫隊獨行、擅離路線。</p>
              <p>◆ 領隊將依照行程計畫進行，視隊員狀況調整行程，請遵守團體同進退規範，確保安全。</p>
              <p>◆ 山區水源缺乏，將水壺隨時裝滿水；口渴時喝水，不可大量喝，潤喉即可。</p>
              <p>◆ 行進間留心路面，看風景時，須停下腳步，勿邊走邊看。</p>
              <p>◆ 行進中途休息或營地餐後或睡前，食物宜包裝收拾，以免動物吃食。</p>
              <br>
              <p>活動中 - 領隊提醒事項 :</p>
              <p>◆ 山區午後常佈滿雲霧，不可沿途逗留過久，應儘早抵達宿營地點。</p>
              <p>◆ 注意途中各種景觀特徵，休息時核對 GPS，了解自己的方位、地點。</p>
              <p>◆ 若行進中若發現蜂、蛇或熊等動物時，勿攻擊或驚嚇牠，迅速撤離該地或繞道。</p>
              <p>◆ 若要自行炊煮，請選擇無雜草、枯枝之空曠地炊食，且應隨時注意水源，睡前或離開時務必確實熄滅爐具火源以免發生火災。</p>
              <p>◆ 登山活動中須隨時注意氣候狀況，遇有颱風或豪雨應提前下山，或尋找避難處所躲避。</p>
              <p>◆ 迷路時應折回原路或尋找避難處所靜待救援保持體力，切勿驚慌隨處亂走。謹守STOP原則。</p>
              <p>◆ 登山時如遭遇惡劣氣候，發生缺糧或高山病等事件時，應即設法與外界連繫，以立即救援。</p>
            </div>
          </q-tab-panel>

          <!-- 大小分類商品資料 -->
          <!-- productsubResult[0]?.sub => 抓到商品小分類第一筆資料的小分類 sub 的 id 右邊區塊 tab-panel (用 sub 的 id 對應到左邊欄位 tab) -->
          <!-- v-for 要放在 tab-panel 下一層，因一個 tab 只會對應一個 tab-panel，若放在 tab-panel 同層跑回圈，會抓到 4 個 tab-panel 商品資料，但只能顯示一個其他資料不會顯示，放在 -->
          <!-- tab-panel 下一層跑回圈，用 tab-panel 包 4 個商品資料，就可以顯示全部商品 -->
          <q-tab-panel class="row q-px-xxxl" :name="productsubResult[0]?.sub">

            <!-- 小分類標題 -->
            <div class="col-12 q-pt-xl flex flex-center text-weight-bold text-h4" style="color: #5E8A4B;">
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
          <q-tab-panel name="customized" class="row justify-center q-px-xxl q-py-xl" style="color: #5E8A4B;">
            <div class="col-12 q-py-lg row justify-center text-h4 q-mb-md text-weight-bold"> 客製化登山行程 </div>

            <div class="col-12">
              <q-separator class="q-my-sm" />
            </div>

            <div class="col-6 q-pa-xl q-mt-xl column justify-center content-center items-start text-weight-bold text-h6"
              style="background: #F4F8EE; color: #5E8A4B;">
              <p>想要爬山又不知道如何規劃</p>
              <p>目前架上的時間行程無法配合</p>
              <p>或想彈性一些的行程嗎?</p>
              <br>
              <p>歡迎掃 QRcode 加 line 詢問 或 點聯絡我們留言唷!</p>
            </div>

            <div style="border: 3px solid #FFF;"></div>

            <div
              class="col-5 q-pa-lg q-mt-xl column justify-center content-center items-center text-weight-bold text-h6"
              style="background: #F4F8EE; color: #5E8A4B;">
              <q-img src="https://i.imgur.com/s8Dl6Jq.png" class="q-ma-lg" style="width:50%"></q-img>
              <q-btn to="/ContactUs" class="q-mt-md q-mb-lg text-weight-bold text-h6"
                style="width:60%; background: #5E8A4B; color: #fff;">聯絡我們</q-btn>
              <p class="text-subtitle2 text-weight-bold">訊息請提供預算、需求、喜好、人數，謝謝您!</p>
            </div>
          </q-tab-panel>
        </q-tab-panels>

      </template>
    </q-splitter>
  </div>

  <!-- 所有商品卡片內容 測試 ---------------->
  <!-- 商品顯示 => 把 init() 從後台抓取到的資料放入 products 後，對 products 跑回圈，前台商品頁就會顯示跑過的每一筆資料(全部商品) -->
  <!-- ProductCard => components 的 ProductCard.vue (=> 重複 code 寫成一個元件) -->
  <!-- :product='product' => 把 products 陣列裡面的 'product' 商品物件資料，放到 components 裡面 ProductCard.vue 相對應位置 :product 中 -->

  <!-- <div class=" q-pa-md row items-start q-gutter-md">
                <div class="row">
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
          <!-- 有時間再改成從後台可編輯 -->
          <q-tab-panel name="difficulty" class="row justify-center q-px-xl" style="color: #5E8A4B;">
            <div class="col-12 row justify-center text-h4 q-pa-lg text-weight-bold">難度分類</div>

            <div class="col-12 row justify-center">
              <q-separator class="q-my-lg " style="width:80%" />
            </div>

            <div
              class="col-12 q-py-md column justify-center content-center items-start text-weight-bold text-subtitle1">
              <p>百岳：3000公尺以上的特定山峰。</p>
              <p>中級山：1000～3000公尺。</p>
              <p>郊山：1000公尺以下。</p>
            </div>
            <div
              class="col-12 q-py-md column justify-center content-center items-start text-weight-bold text-subtitle1">
              <p>百岳 A 級 : 一般健行路線 1 - 3 天</p>
              <p>百岳中高級B、C級 : 中高級路線 3 - 5 天</p>
              <p>百岳高級B、C級 : 4天以上行程</p>
              <p>百岳高級C+級 : 4天以上長天數縱走行程</p>
            </div>

            <div class="col-12 row justify-center">
              <q-separator class="q-my-lg " style="width:80%" />
            </div>

            <div class="col-12 row justify-center text-h4 q-pa-lg text-weight-bold">行前須知</div>

            <div class="col-12 q-py-md text-h6 text-weight-bold" style="width:800px">登山技巧</div>
            <div class="col-12 q-py-md column justify-center text-weight-bold text-subtitle1" style="width:800px">
              <p>◆ 登山初行稍慢步幅不宜長，調整步伐速度要穩定，逐漸增加速度，以大腿帶動膝蓋和小腿前進逐步而行，保持平衡及韻律。</p>
              <p>◆ 登山步行，上半身稍前傾，將重心置於腰部並保持穩定，腳踏實地，體重由腳平均負擔。可搭配使用登山杖協助行進。</p>
              <p>◆ 休息要適當，中途休息不可太久，以每小時5至10分鐘，每3小時大休息1次，時間約為20分鐘為原則。</p>
              <p>◆ 上坡最耗體能，需補充大量氧氣，喘氣宜深且穩，並與步伐配合。</p>
              <p>◆ 下坡速度應節奏化，不宜過慢以保持熱身狀態，亦不宜過快躁進，以免腳步不穩跌倒甚至踏空墜落。</p>
              <p>◆ 攀爬山壁時勿急躁，先以手足試探著力點之穩定性，謹守「三點不動一點動」之原則。</p>
              <p>◆ 雪季登山，應有完備之雪攀裝備及受過雪攀之訓練與技巧。</p>
            </div>

            <div class="col-12 q-py-md text-h6 text-weight-bold" style="width:800px">登山安全</div>
            <div class="col-12 q-py-md column justify-center text-weight-bold text-subtitle1" style="width:800px">
              <p>活動前須知 :</p>
              <p>◆ 尊重大自然、敬愛大自然，不要以輕忽或征服的心態從事登山活動。</p>
              <p>◆ 平時即鍛練體能，培養登山技能，並多吸收野外活動知識。</p>
              <p>◆ 攀登高山前行程需先前瞭解，並將行程告知家人。</p>
              <p>◆ 對於登山裝備及糧食，應準備齊全不可短缺，且於活動前徹底檢查。</p>
              <br>
              <p>活動中須知 :</p>
              <p>◆ 與領隊、同伴同行，嚴禁脫隊獨行、擅離路線。</p>
              <p>◆ 領隊將依照行程計畫進行，視隊員狀況調整行程，請遵守團體同進退規範，確保安全。</p>
              <p>◆ 山區水源缺乏，將水壺隨時裝滿水；口渴時喝水，不可大量喝，潤喉即可。</p>
              <p>◆ 行進間留心路面，看風景時，須停下腳步，勿邊走邊看。</p>
              <p>◆ 行進中途休息或營地餐後或睡前，食物宜包裝收拾，以免動物吃食。</p>
              <br>
              <p>活動中 - 領隊提醒事項 :</p>
              <p>◆ 山區午後常佈滿雲霧，不可沿途逗留過久，應儘早抵達宿營地點。</p>
              <p>◆ 注意途中各種景觀特徵，休息時核對 GPS，了解自己的方位、地點。</p>
              <p>◆ 若行進中若發現蜂、蛇或熊等動物時，勿攻擊或驚嚇牠，迅速撤離該地或繞道。</p>
              <p>◆ 若要自行炊煮，請選擇無雜草、枯枝之空曠地炊食，且應隨時注意水源，睡前或離開時務必確實熄滅爐具火源以免發生火災。</p>
              <p>◆ 登山活動中須隨時注意氣候狀況，遇有颱風或豪雨應提前下山，或尋找避難處所躲避。</p>
              <p>◆ 迷路時應折回原路或尋找避難處所靜待救援保持體力，切勿驚慌隨處亂走。謹守STOP原則。</p>
              <p>◆ 登山時如遭遇惡劣氣候，發生缺糧或高山病等事件時，應即設法與外界連繫，以立即救援。</p>
            </div>
          </q-tab-panel>

          <!-- 大小分類商品資料 -->
          <!-- productsubResult[0]?.sub => 抓到商品小分類第一筆資料的小分類 sub 的 id 右邊區塊 tab-panel (用 sub 的 id 對應到左邊欄位 tab) -->
          <!-- v-for 要放在 tab-panel 下一層，因一個 tab 只會對應一個 tab-panel，若放在 tab-panel 同層跑回圈，會抓到 4 個 tab-panel 商品資料，但只能顯示一個其他資料不會顯示，放在 tab-panel 下一層跑回圈，用 tab-panel 包 4 個商品資料，就可以顯示全部商品 -->
          <q-tab-panel class="row q-px-xl" :name="productsubResult[0]?.sub">

            <!-- 小分類標題 -->
            <div class="col-12 q-pt-xl flex flex-center text-weight-bold text-h4" style="color: #5E8A4B;">
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
          <q-tab-panel name="customized" class="row justify-center q-px-md q-py-xl" style="color: #5E8A4B;">
            <div class="col-12 q-pb-xl row justify-center text-h4 text-weight-bold"> 客製化登山行程 </div>

            <div style="width: 80%; background: #F4F8EE; color: #5E8A4B;">
              <div
                class="col-12 q-py-md q-px-xl q-mt-lg column justify-center content-center items-center text-weight-bold text-subtitle1">
                <p>想要爬山又不知道如何規劃</p>
                <p>目前架上的時間行程無法配合</p>
                <p>或想彈性一些的行程嗎?</p>
                <br>
                <p>歡迎掃 QRcode 加 line 詢問 或 點聯絡我們留言唷</p>
              </div>

              <div style="border: 3px solid #FFF;"></div>

              <div
                class="col-5 q-py-md q-px-xl q-mt-nd column justify-center content-center items-center text-weight-bold text-subtitle1">
                <q-img src="https://i.imgur.com/s8Dl6Jq.png" class="q-ma-lg" style="width:50%"></q-img>
                <q-btn to="/ContactUs" class="q-mt-md q-mb-lg text-weight-bold text-subtitle1"
                  style="width:80%; background: #5E8A4B; color: #fff;">聯絡我們</q-btn>
                <p class="text-subtitle2 text-weight-bold">訊息請提供預算、需求、喜好、人數，謝謝您!</p>
              </div>
            </div>
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
// splice 清空陣列 (0,8) => 起始和結束值
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
