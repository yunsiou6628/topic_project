<!-- ProductViewAll 全部商品頁的 單個卡片 元件 (& link 連結到單一商品頁) -->

<!-- 卡片上的資料 -->
<template>
  <router-link :to="'/product/' + product._id">
  <!-- router-link = a 標籤 -->
    <q-card class="my-card q-pa-xl q-ma-md">
      <q-img :src="product.image" />
      <!-- :src="product.image" => : 為了後面可以接 變數 -->
      <q-h1>{{ product.name }}</q-h1>
      <!-- <q-h2>{{ product.region }}</q-h2> -->
      <q-p>{{ product.description }}</q-p>

    </q-card>
  </router-link>
</template>

<script setup>
// import { useUserStore } from '@/stores/user'
// const user = useUserStore()
// const { addCart } = user
defineProps(['product'])

</script>
