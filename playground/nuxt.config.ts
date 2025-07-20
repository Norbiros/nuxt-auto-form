export default defineNuxtConfig({
  modules: [
    '../src/module',
    '@nuxt/ui',
    '@nuxt/test-utils/module',
  ],
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2025-07-16',
})
