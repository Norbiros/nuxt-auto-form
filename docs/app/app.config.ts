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
      alt: '',
      light: '',
      dark: '',
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
    credits: `Copyright © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-npm',
      'to': 'https://www.npmjs.com/package/nuxt-auto-form',
      'target': '_blank',
      'aria-label': 'Nuxt Auto Form on npmjs.com',
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
        label: 'View on npmjs.com',
        to: 'https://www.npmjs.com/package/nuxt-auto-form',
        target: '_blank',
      }],
    },
  },
})
