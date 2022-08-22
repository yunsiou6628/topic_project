<!-- ContactUs -->
<template>
  <div class="row justify-center q-px-xxl q-py-xl"
    style=" width:100vw; height: 100vh; color: #5E8A4B; background-image: linear-gradient(to bottom,#F4F8EE, #fff); z-index: -1;">
    <div class="col-12 q-pa-md bg-blue" style="max-width: 80%">

      <div class="col-12 text-h4 text-center text-weight-bold bg-yellow">聯絡我們</div>

      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input filled v-model="name" label="Your name *" hint="Name and surname" lazy-rules
          :rules="[val => val && val.length > 0 || 'Please type something']" />

        <q-input filled type="number" v-model="age" label="Your age *" lazy-rules :rules="[
          val => val !== null && val !== '' || 'Please type your age',
          val => val > 0 && val < 100 || 'Please type a real age'
        ]" />

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'

export default {
  setup() {
    const name = ref(null)
    const age = ref(null)

    return {
      name,
      age,

      onReset() {
        name.value = null
        age.value = null
      }
    }
  }
}
</script>
