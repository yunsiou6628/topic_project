// 商品分類 models (Schema資料型態)

import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '行程大分類']
  },
  sub: {
    type: [String],
    required: [true, '行程小分類'],
    default: []
    // 預設
  }

}, { versionKey: false }) // 移除 versionKey、__V

export default mongoose.model('products_category', schema)
