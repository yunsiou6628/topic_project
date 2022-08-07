// 商品 models (Schema資料型態)

import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '商品名稱未填寫']
  },
  price: {
    type: Number,
    min: [0, '價格格式錯誤'],
    required: [true, '價格未填寫']
  },
  product_date: {
    type: Number
    // 為啥 AdminProduct 會顯示 String ???
    // required: [true, '行程日期未填寫']
  },
  // 縣市區域
  region: {
    type: String
  },
  // 庫存
  reserve: {
    type: String
    // required: [true, '商品庫存未填寫']
  },
  // 公告提醒
  bulletin: {
    type: String
  },
  // 說明
  description: {
    type: String
  },
  image: {
    type: String
  },
  // 是否上架
  sell: {
    type: Boolean,
    default: false
    // 預設不上架
  }
}, { versionKey: false }) // 移除 versionKey、__V

export default mongoose.model('products', schema)
