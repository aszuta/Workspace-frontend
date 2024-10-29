// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: process.env.NODE_ENV === 'development' },
  runtimeConfig: {
    baseURL: process.env.BASE_URL,
    public: {
      baseURL: process.env.PUBLIC_BASE_URL,
    },
  },
  build: {
    transpile: [
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-regular-svg-icons',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/vue-fontawesome',
    ],
  },
  css: [
    '~/assets/scss/style.scss',
    '@fortawesome/fontawesome-svg-core/styles.css',
  ],
  modules: [
    '@pinia/nuxt',
  ],
  nitro: {
    devProxy: {
      '/api': {
        target: `${process.env.API_URL}/api`,
        changeOrigin: true,
      },
    },
  },
});
