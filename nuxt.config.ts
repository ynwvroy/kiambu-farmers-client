// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width,initial-scale=1,viewport-fit=cover",
    },
  },

  ssr: false,

  runtimeConfig: {
    nodeEnv: process.env.NUXT_NODE_ENV || "development",
    public: {
      apiBaseURL: process.env.NUXT_API_SERVER_URL,
      authBaseURL: process.env.NUXT_AUTH_SERVER_URL,
      domainUrl: process.env.NUXT_DOMAIN_URL,
    },
  },

  typescript: {
    shim: false,
  },
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },

  modules: ["@ant-design-vue/nuxt"],

  nitro: {
    serveStatic: true,
  },
  devServerHandlers: [],
  hooks: {},
});
