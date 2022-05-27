export default {
  // Disable server-side rendering
  ssr: false,

  // Global page headers
  head: {
    title: 'shop',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS
  css: [
    '~assets/styles/index.scss'
  ],

  // Plugins to run before rendering page
  plugins: [
  ],

  // Auto import components
  components: true,

  // Modules for dev and build
  buildModules: [
  ],

  // Modules:
  modules: [
  ],

  // Build Configuration:
  build: {
  }
}
