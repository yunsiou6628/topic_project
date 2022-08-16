<template>
<q-page id="aaa">
  <div>
    <q-carousel
      animated
      v-model="slide"
      navigation
      infinite
      :autoplay="autoplay"
      arrows
      transition-prev="slide-right"
      transition-next="slide-left"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
    >
      <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
      <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
      <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
      <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
      <q-carousel-slide :name="5" img-src="https://i.imgur.com/lblUOEF.jpg" />
    </q-carousel>
</div>
    <!-- 測試卡片 https://quasar.dev/vue-components/card -->
    <div style="width: 50%; height: 600px; background: gainsboro;"></div>
    <div>
    <img
      alt="Quasar logo"
      src="https://kitpro.site/hayka/wp-content/uploads/sites/75/2022/03/female-hiker-looking-up-in-forest-sarsy-village-2022-03-07-23-58-37-utc.jpg"
      style="width: 200px; height: 200px;"
      class="flex flex-right"
    >

    <img
      alt="Quasar logo"
      src="https://kitpro.site/hayka/wp-content/uploads/sites/75/2022/03/hiking-sunrise-2022-03-05-20-21-43-utc-800x533.jpg"
      style="width: 400px; height: 300px;"
      class="flex flex-right"
    >

    <img
      alt="Quasar logo"
      src="https://kitpro.site/hayka/wp-content/uploads/sites/75/2022/03/hikers-uphilling-at-mountain-forest-back-view-2021-08-29-03-30-49-utc-800x550.jpg"
      style="width: 300px; height: 200px;"
      class="flex flex-right"
    >
    </div>

  </q-page>

  <!-- <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="https://i.imgur.com/uzJHT8E.jpg"
      style="width: 200px; height: 200px"
    >
  </q-page> -->
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      slide: ref(1),
      autoplay: ref(true)
    }
  }
}

// import { defineComponent } from 'vue'

// export default defineComponent({
//   name: 'IndexPage'
// })
</script>
