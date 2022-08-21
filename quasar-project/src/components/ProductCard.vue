<!-- ProductViewAll 全部商品頁的 單個卡片 元件 (& link 連結到單一商品頁) -->

<!-- 卡片上的資料 -->
<template>

  <router-link :to="'/product/' + product._id" style="text-decoration:none;">
    <!-- router-link = a 標籤 -->
    <q-card class=" q-pa-md q-ma-md column" style="color: #5E8A4B;">
      <q-img :src="product.image" />
      <!-- :src="product.image" => : 為了後面可以接 變數 -->
      <div class="q-pa-xs text-h6 text-weight-bold">{{ product.name }}</div>
      <div class="q-pa-xs text-subtitle2 text-weight-bold"> <i class="fa-solid fa-location-dot"></i> {{ product.region
      }}</div>
      <div class="q-pa-xs text-caption text-weight-bold" id="description-textbox">{{ product.description }}</div>
    </q-card>
  </router-link>
</template>

<script setup>
// 把外面的值傳入 defineProps 定義傳入資料的變數名稱相同 ProductCard :product='product'=> product.name 、 product.region...
defineProps(['product'])
</script>
