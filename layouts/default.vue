<template>
  <v-app>
    <nuxt />
    <v-footer
      :fixed="fixed"
      app
      class="footer"
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-airplane-takeoff',
          title: 'Smart-U25 challenge!',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Smart-u25 challenge!'
    }
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