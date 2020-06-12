import colors from 'vuetify/es5/util/colors'

const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: '/buttobi-site/'
  }
} : {}

export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/buttobi-site/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
    '@nuxtjs/pwa',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  ...routerBase,
  /*
  ** Build configuration
  */
  build: {
     /*
     ** Postcss config
     */
    postcss: require("./postcss.config"),
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  /* PWA */
  manifest: {
    name: 'buttobi-site',
    lang: 'ja',
    short_name: 'buttobi-site',
    title: 'ぶっとびチャレンジサイト',
    'og:title': 'ぶっとびチャレンジサイト',
    description: 'ランダムに目的空港を表示します。飛行機、乗ろう',
    'og:description': 'ランダムに目的空港を表示します。飛行機、乗ろう',
    theme_color: '#005b9f',
    background_color: '#005b9f'
  },
  workbox: {
    dev: true,
  }
}
