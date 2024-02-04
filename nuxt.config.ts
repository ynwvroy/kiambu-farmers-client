// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  build: { transpile: ['vuetify'] },

  css: ['@/assets/scss/main.scss'],

  modules: ["@ant-design-vue/nuxt"],

  runtimeConfig: {
    nodeEnv: process.env.NUXT_NODE_ENV || 'development',
    public: {
      apiBaseURL: process.env.NUXT_API_BASE_URL,
    },
  },
})
