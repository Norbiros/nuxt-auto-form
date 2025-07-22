# 🧾 Nuxt Auto Form

[![pnpm version][pnpm-version-src]][pnpm-version-href]
[![pnpm downloads][pnpm-downloads-src]][pnpm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Auto-generate Nuxt UI forms from Zod 4 schemas

> [!WARNING]
> This module is in early development. Many features are missing and the API may change.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
- [📖 &nbsp;Documentation](https://nuxt-auto-form.norbiros.dev)
<!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/nuxt-auto-form?file=playground%2Fapp.vue) -->

## Features

* ❤️ **Powered by Zod & Nuxt UI**: Reduce your boilerplate in seconds, without complex rewrites.
* 📋 **Schema-Driven Forms**: Automatically generates forms based on Zod schemas, ensuring type safety and validation.
* 🎨 **Good Looking**: Leverages Nuxt UI components for a consistent and modern design.
* 🔄 **Dynamic Field Rendering**: Supports various field types, including text inputs, selects, checkboxes, and more.
* ⚙️ **Customizable**: Easily customize any button, field, and input.

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add nuxt-auto-form
```

That's it! You can now use Nuxt Auto Form in your Nuxt app ✨

## Contribution

```bash
# Install dependencies
pnpm install

# Generate type stubs
pnpm dev:prepare

# Develop with the playground
pnpm dev

# Develop documentation
pnpm docs:dev

# Run ESLint
pnpm lint
pnpm lint:fix

# Run e2e tests
pnpm e2e

# Release new version
pnpm run release
```

## License

Made with 💚

Published under the [MIT License](./LICENCE).

<!-- Badges -->
[pnpm-version-src]: https://img.shields.io/pnpm/v/nuxt-auto-form/latest.svg?style=flat&colorA=020420&colorB=00DC82
[pnpm-version-href]: https://pnpmjs.com/package/nuxt-auto-form

[pnpm-downloads-src]: https://img.shields.io/pnpm/dm/nuxt-auto-form.svg?style=flat&colorA=020420&colorB=00DC82
[pnpm-downloads-href]: https://pnpm.chart.dev/nuxt-auto-form

[license-src]: https://img.shields.io/pnpm/l/nuxt-auto-form.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://pnpmjs.com/package/nuxt-auto-form

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
