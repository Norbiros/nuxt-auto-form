export default defineNuxtConfig({
  modules: [
    '@nuxtjs/i18n',
    '@norbiros/nuxt-auto-form',
    '@nuxt/ui',
    '@nuxt/test-utils/module',
  ],
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2025-07-16',

  i18n: {
    defaultDirection: 'ltr',
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        language: 'en-GB',
        name: 'English',
        file: 'en-GB.json',
      },
    ],
  },
})
