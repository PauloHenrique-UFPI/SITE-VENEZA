<template>
  <q-page
    class="flex flex-center"
    :style="{
      backgroundImage: `url(${require('../assets/pizza.png')})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }"
  >

  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>
