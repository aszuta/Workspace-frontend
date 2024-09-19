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
  nitro: {
    devProxy: {
      '/api': {
        target: `${process.env.API_URL}/api`,
        changeOrigin: true,
      },
    },
  },
});
