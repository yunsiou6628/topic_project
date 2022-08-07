// 訂單 models (Schema資料型態)

import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  // 存是誰的訂單
  user: {
    type: mongoose.ObjectId,
    ref: 'users'
  },
  products: [
    {
      product: {
        type: mongoose.ObjectId,
        ref: 'products',
        required: [true, '商品欄位未填寫']
      },
      quantity: {
        type: Number,
        required: [true, '數量欄位未填寫']
      }
    }
  ],
  // 商品訂單日期
  date: {
    type: Date,
    default: Date.now()
    // 以目前時間當預設值
  }
}, { versionKey: false }) // 移除 versionKey、__V

export default mongoose.model('orders', schema)
