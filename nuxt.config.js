import purgecss from '@fullhuman/postcss-purgecss';

export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: 'Austin Barrett | Striped Purple',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {
        hid: 'description',
        name: 'description',
        content: 'Photographer, Developer, &amp; Magician Extraordinaire ♣️♥️♠️♦️'
      },
      // Facebook
      {hid: "og:url", property: "og:url", content: "https://stripedpurple.io/"},
      {hid: "og:type", property: "og:type", content: "website"},
      {hid: "og:title", property: "og:title", content: "Austin Barrett | Striped Purple"},
      {
        hid: "og:description",
        property: "og:description",
        content: "Photographer, Developer, &amp; Magician Extraordinaire ♣️♥️♠️♦️"
      },
      {hid: "og:image", property: "og:image", content: "https://stripedpurple.io/img/social-banner.jpg"},
      // twitter
      {hid: "twitter:url", property: "twitter:url", content: "https://stripedpurple.io/"},
      {hid: "twitter:card", name: "twitter:card", content: "summary_large_image"},
      {hid: "twitter:title", name: "twitter:title", content: "Austin Barrett | Striped Purple"},
      {
        hid: "twitter:description",
        name: "twitter:description",
        content: "Photographer, Developer, &amp; Magician Extraordinaire ♣️♥️♠️♦️"
      },
      {hid: "twitter:image", name: "twitter:image", content: "https://stripedpurple.io/img/social-banner.jpg"},
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.png'}
    ],
    script: [
      {src: '/js/wow.min.js', async: true}
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    {src: '~/assets/styles/style.sass', lang: 'sass'}
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
    'nuxt-fontawesome'

  ],
  buefy: {
  //   materialDesignIcons: false,
  //   defaultIconPack: 'fas',
  //   defaultIconComponent: 'font-awesome-icon'
  // },
  // fontawesome: {
  //   component: 'font-awesome-icon',
  //   imports: [
  //     {
  //       set: '@fortawesome/free-brands-svg-icons',
  //       icons: ['fab']
  //     },
  //     {
  //       set: '@fortawesome/free-solid-svg-icons',
  //       icons: ['fas']
  //     }
  //   ]
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    analyze: true
  },
  sitemap: {
    hostname: 'https://stripedpurple.io',
    exclude: [
      '/teapot',
    ]
  }
}
