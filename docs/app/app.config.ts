export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      neutral: 'slate',
    },
  },
  uiPro: {
    footer: {
      slots: {
        root: 'border-t border-default',
        left: 'text-sm text-muted',
      },
    },
  },
  seo: {
    siteName: 'Nuxt Auto Form',
  },
  header: {
    title: '',
    to: '/',
    logo: {
      alt: 'N',
      light: '/logo_light.svg',
      dark: '/logo_dark.svg',
    },
    search: true,
    colorMode: true,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/Norbiros/nuxt-auto-form',
      'target': '_blank',
      'aria-label': 'GitHub',
    }],
  },
  footer: {
    credits: `© ${new Date().getFullYear()}`,
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-npm',
      'to': 'https://npmx.dev/package/@norbiros/nuxt-auto-form',
      'target': '_blank',
      'aria-label': 'Nuxt Auto Form on npmx.dev',
    }, {
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/Norbiros/nuxt-auto-form',
      'target': '_blank',
      'aria-label': 'Nuxt Auto Form on GitHub',
    }],
  },
  toc: {
    title: 'Table of Contents',
    bottom: {
      title: 'Community',
      edit: 'https://github.com/Norbiros/nuxt-auto-form/edit/master/docs/content',
      links: [{
        icon: 'i-lucide-star',
        label: 'Star on GitHub',
        to: 'https://github.com/Norbiros/nuxt-auto-form',
        target: '_blank',
      }, {
        icon: 'i-simple-icons-npm',
        label: 'View on npmx.dev',
        to: 'https://npmx.dev/package/@norbiros/nuxt-auto-form',
        target: '_blank',
      }, {
        icon: 'i-lucide-puzzle',
        label: 'Playground',
        to: 'https://stackblitz.com/github/Norbiros/nuxt-auto-form/tree/master/playground?file=app%2Fcomponents%2FMyForm.vue',
        target: '_blank',
      }],
    },
  },
})
