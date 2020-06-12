<template>
  <v-app>
    <nuxt />
    <v-footer
      :fixed="fixed"
      app
      class="footer"
    >
      <span>&copy; {{ new Date().getFullYear() }} MizukiSonoko</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {};
  }
}
</script>


<style lang="postcss" scoped>
#__nuxt{
  background: #005b9f;
}
.footer{
  background: #005b9f;
  color: #fff;
}
</style>