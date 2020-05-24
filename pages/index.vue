<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <MyButton text="Go travel"/>
    </v-flex>
  </v-layout>
</template>

<script>
import MyButton from '~/components/Button.vue'

export default {
  components: {
    MyButton
  }
}
</script>
