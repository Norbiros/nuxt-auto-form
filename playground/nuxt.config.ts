export default defineNuxtConfig({
  modules: [
    '@norbiros/nuxt-auto-form',
    '@nuxt/ui',
    '@nuxt/test-utils/module',
  ],
  devtools: { enabled: true },

  autoForm: {
    submit: {
      props: {
        color: 'primary',
      },
    },
    components: {
      email: () => ({ component: 'UInput', componentProps: { type: 'email' } }),
    },
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2025-07-16',
})
