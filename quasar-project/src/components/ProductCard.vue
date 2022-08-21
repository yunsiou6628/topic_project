<!-- ProductViewAll 全部商品頁的 單個卡片 元件 (& link 連結到單一商品頁) -->

<!-- 卡片上的資料 -->
<template>

  <router-link :to="'/product/' + product._id" style="text-decoration:none;">
    <!-- router-link = a 標籤 -->
    <q-card class=" q-pa-md q-ma-md column full-height" style="color: #5E8A4B;">
      <q-img :src="product.image" :ratio="4 / 3" />
      <!-- :src="product.image" => : 為了後面可以接 變數 -->
      <div class="q-px-md q-pt-lg text-h6 text-weight-bold row justify-center">{{ product.name }}</div>

      <q-separator class="q-mx-md q-my-md" />
      <div class="q-px-lg q-py-md text-center text-subtitle1 text-weight-bold ">
        <i class="fa-solid fa-location-dot"></i>
        {{ product.region }}
      </div>

      <div class=" q-px-md text-body2 text-weight-bold description-textbox">{{ product.description }}</div>
    </q-card>
  </router-link>
</template>

<script setup>
// 把外面的值傳入 defineProps 定義傳入資料的變數名稱相同 ProductCard :product='product'=> product.name 、 product.region...
defineProps(['product'])
</script>
