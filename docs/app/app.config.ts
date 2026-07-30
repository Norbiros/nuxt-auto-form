export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      neutral: 'slate',
    },
  },
  seo: {
    title: 'Nuxt Auto Form',
    description: 'Auto-generate Nuxt UI forms from Zod 4 schemas.',
  },
  header: {
    title: 'Nuxt Auto Form',
    logo: {
      alt: 'Nuxt Auto Form',
      light: '/logo_light.svg',
      dark: '/logo_dark.svg',
    },
  },
  github: {
    url: 'https://github.com/Norbiros/nuxt-auto-form',
    branch: 'master',
    rootDir: 'docs',
  },
  socials: {
    npm: 'https://npmx.dev/package/@norbiros/nuxt-auto-form',
  },
  toc: {
    title: 'On this page',
    bottom: {
      title: 'Community',
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
