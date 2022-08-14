// 商品分類 models (Schema資料型態)

import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  // 行程大分類
  category: {
    type: String,
    required: [true, '大分類未填寫']
  },
  // 行程小分類
  sub: {
    type: [{
      name: String
    }],
    required: [true, '小分類未填寫'],
    default: []
  }

  // 分類管理先寫出來(用小分類去分類)，後台寫好controllers products，前台用axios去抓取到後台分類資料顯示，把後台資料放入前台 options，先寫好增加修改刪除，再來寫分類

}, { versionKey: false }) // 移除 versionKey、__V

export default mongoose.model('products_category', schema)
