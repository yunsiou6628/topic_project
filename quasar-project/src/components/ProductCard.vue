<!-- ProductViewAll 全部商品頁的 單個卡片 元件 (& link 連結到單一商品頁) -->

<!-- 卡片上的資料 -->
<template>
  <router-link :to="'/product/' + product._id">
  <!-- router-link = a 標籤 -->
    <q-card class="my-card q-pa-md q-ma-md column">
      <q-img :src="product.image" />
      <!-- :src="product.image" => : 為了後面可以接 變數 -->
      <div class="q-pa-xs text-h6">{{ product.name }}</div>
      <div class="q-pa-xs text-subtitle2">{{ product.region }}</div>
      <div class="q-pa-xs text-caption">{{ product.description }}</div>
    </q-card>
  </router-link>
</template>

<script setup>
// 把外面的值傳入 defineProps 定義傳入資料的變數名稱相同 ProductCard :product='product'=> product.name 、 product.region...
defineProps(['product'])
</script>
