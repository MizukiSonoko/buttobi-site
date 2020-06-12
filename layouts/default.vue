<template>
  <v-app id="app">
    <a href="https://github.com/MizukiSonoko/buttobi-site"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://s3.amazonaws.com/github/ribbons/forkme_right_white_ffffff.png" alt="Fork me on GitHub"></a>
    <nuxt id="content" />
    <v-footer
      fixed
      app
      id="footer"
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


<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 8.4pt;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  height: 100%;
}

#__nuxt {
  height: 100%;
}

#__layout {
  height: 100%;
}

body {
  height: 100%;
  background: #005b9f;
}

#footer{
  width: 100%;
  background: #005b9f;
  color: #fff;
}
</style>