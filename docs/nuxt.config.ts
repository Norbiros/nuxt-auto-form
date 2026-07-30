// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['docus'],

  modules: [
    '@norbiros/nuxt-auto-form',
    '@nuxt/eslint',
  ],

  devtools: {
    enabled: true,
  },

  site: {
    name: 'Nuxt Auto Form',
  },

  mdc: {
    highlight: {
      noApiRoute: false,
    },
  },

  compatibilityDate: '2026-02-21',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs',
      },
    },
  },

  llms: {
    domain: 'https://nuxt-auto-form.norbiros.dev',
    title: 'Nuxt Auto Form',
    description: 'Auto-generate Nuxt UI forms from Zod 4 schemas.',
    full: {
      title: 'Nuxt Auto Form - Full Documentation',
      description: 'Complete documentation for Nuxt Auto Form.',
    },
  },
})
