# Changelog


## v0.6.1

[compare changes](https://github.com/Norbiros/nuxt-auto-form/compare/v0.6.0...v0.6.1)

> [!IMPORTANT]
> If you are using the `closeLabel` or `submitLabel` props in `AutoFormModal`, update your code to use the new configuration format:
>
> `:config="{ modal: { submitLabel: 'Save', closeLabel: 'Cancel' } }"`

### 🚀 Enhancements

- Add global config for `AutoFormModal` button labels ([#28](https://github.com/Norbiros/nuxt-auto-form/pull/28))

### ❤️ Contributors

- Lajczi ([@lajczi](https://github.com/lajczi))

## v0.6.0

[compare changes](https://github.com/Norbiros/nuxt-auto-form/compare/v0.5.0...v0.6.0)


Major changes for this release include:
- [`AutoFormModal`](https://nuxt-auto-form.norbiros.dev/components/form-modal) - component for modal-based forms
- [`AutoFormPrimitive`](https://nuxt-auto-form.norbiros.dev/components/form-primitive) - basic reusable form component that matches as close as possible `NuxtUI`'s `UForm` component
- Improved support for optional fields
- Added support for i18n using [preprocessors](https://nuxt-auto-form.norbiros.dev/customization/preprocessors#built-in-i18n)

### 🚀 Enhancements

- Document exposed methods for `<AutoForm/>` ([c46bc77](https://github.com/Norbiros/nuxt-auto-form/commit/c46bc77))
- Mark button as `aria-disabled` instead of really disabling it ([e5e7ef3](https://github.com/Norbiros/nuxt-auto-form/commit/e5e7ef3))
- Add support for optional fields ([600c48b](https://github.com/Norbiros/nuxt-auto-form/commit/600c48b))
- Add AutoFormModal component for modal-based forms ([98acbe7](https://github.com/Norbiros/nuxt-auto-form/commit/98acbe7))
- Change logo depending on color theme ([#27](https://github.com/Norbiros/nuxt-auto-form/pull/27))
- Add meta string processors for custom transformations in AutoForm ([0dd0c18](https://github.com/Norbiros/nuxt-auto-form/commit/0dd0c18))
- **ci:** New publish workflow used for Trusted Publishing ([f9ec7e8](https://github.com/Norbiros/nuxt-auto-form/commit/f9ec7e8))
- Forward `error` event emission in `<AutoForm/>` ([#15](https://github.com/Norbiros/nuxt-auto-form/pull/15))

### 🩹 Fixes

- **ci:** Resolve issues related to playwright browser installation ([438b447](https://github.com/Norbiros/nuxt-auto-form/commit/438b447))

### 💅 Refactors

- Optional and nullable field handling in components map ([690b315](https://github.com/Norbiros/nuxt-auto-form/commit/690b315))
- Extract AutoFormPrimitive for reusable form logic ([bf390b3](https://github.com/Norbiros/nuxt-auto-form/commit/bf390b3))
- Unify bg colors with Nuxt UI semantic classes and add dark/light mode code highlighting ([52d30c6](https://github.com/Norbiros/nuxt-auto-form/commit/52d30c6))
- Make `AutoForm` use the `AutoFormPrimitive` component ([be581e2](https://github.com/Norbiros/nuxt-auto-form/commit/be581e2))

### 📖 Documentation

- Enhance documentation with improved layout and examples ([2339658](https://github.com/Norbiros/nuxt-auto-form/commit/2339658))

### 🏡 Chore

- **deps:** ⚠️  Update dependencies (`@nuxt/ui` v4, `@nuxt` v4.3) ([03968b6](https://github.com/Norbiros/nuxt-auto-form/commit/03968b6))

#### ⚠️ Breaking Changes

- **deps:** ⚠️  Update dependencies (`@nuxt/ui` v4, `@nuxt` v4.3) ([03968b6](https://github.com/Norbiros/nuxt-auto-form/commit/03968b6))

### ❤️ Contributors

- Norbiros <norbiros@protonmail.com>
- Sanielia

## v0.5.0

[compare changes](https://github.com/Norbiros/nuxt-auto-form/compare/v0.4.3...v0.5.0)

### 🩹 Fixes

- Resolve some issues related to submit button ([67f9769](https://github.com/Norbiros/nuxt-auto-form/commit/67f9769))

### ❤️ Contributors

- Norbiros ([@Norbiros](https://github.com/Norbiros))

## v0.4.3

[compare changes](https://github.com/Norbiros/nuxt-auto-form/compare/v0.4.2...v0.4.3)

### 🚀 Enhancements

- Create `theme` property and document it ([f892ea3](https://github.com/Norbiros/nuxt-auto-form/commit/f892ea3))

### ❤️ Contributors

- Norbiros ([@Norbiros](https://github.com/Norbiros))

## v0.4.2

[compare changes](https://github.com/Norbiros/nuxt-auto-form/compare/v0.4.1...v0.4.2)

### 🚀 Enhancements

- Add support for disabling submit button ([3efc959](https://github.com/Norbiros/nuxt-auto-form/commit/3efc959))
- Add QR code modal example ([6a19b13](https://github.com/Norbiros/nuxt-auto-form/commit/6a19b13))

### 🩹 Fixes

- Add missing import for `useSlots` composable ([1244b80](https://github.com/Norbiros/nuxt-auto-form/commit/1244b80))

### ❤️ Contributors

- Norbiros ([@Norbiros](https://github.com/Norbiros))

## v0.4.1

[compare changes](https://github.com/Norbiros/nuxt-auto-form/compare/v0.4.0...v0.4.1)

### 🚀 Enhancements

- Support dynamic form field slots ([40b0fb8](https://github.com/Norbiros/nuxt-auto-form/commit/40b0fb8))

### 📖 Documentation

- Improved form & migration documentation ([b303b64](https://github.com/Norbiros/nuxt-auto-form/commit/b303b64))

### ❤️ Contributors

- Norbiros ([@Norbiros](https://github.com/Norbiros))

## v0.4.0

[compare changes](https://github.com/Norbiros/nuxt-auto-form/compare/v0.3.0...v0.4.0)

### 🚀 Enhancements

- Create online playground on stackblitz ([#7](https://github.com/Norbiros/nuxt-auto-form/pull/7))
- Add multiple `UFormField` configuration options ([a6e55a5](https://github.com/Norbiros/nuxt-auto-form/commit/a6e55a5))
- Allow customizing input component & props ([1289ef0](https://github.com/Norbiros/nuxt-auto-form/commit/1289ef0))
- Add an option to customize default components for fields ([158b802](https://github.com/Norbiros/nuxt-auto-form/commit/158b802))
- Docs revisit ([a3f57b1](https://github.com/Norbiros/nuxt-auto-form/commit/a3f57b1))
- Add custom logo ([081b1ef](https://github.com/Norbiros/nuxt-auto-form/commit/081b1ef))
- Enhance email field handling in AutoForm component ([93a8de4](https://github.com/Norbiros/nuxt-auto-form/commit/93a8de4))
- Add `AInput` components ([#6](https://github.com/Norbiros/nuxt-auto-form/pull/6))
- Update status to beta in `AppHeader` and `README.md` ([fb33ff6](https://github.com/Norbiros/nuxt-auto-form/commit/fb33ff6))

### 🩹 Fixes

- **github:** Use proper issue templates ([8550158](https://github.com/Norbiros/nuxt-auto-form/commit/8550158))
- **docs:** Resolve issues with line height in `ComponentPreview` ([9b41993](https://github.com/Norbiros/nuxt-auto-form/commit/9b41993))

### 💅 Refactors

- ⚠️  Rename `ui` prop to `config` in AutoForm component ([700f706](https://github.com/Norbiros/nuxt-auto-form/commit/700f706))
- Move `COMPONENTS_MAP` to a separate file ([20f77e3](https://github.com/Norbiros/nuxt-auto-form/commit/20f77e3))
- ⚠️  Move configuration to `app.config.ts` ([#8](https://github.com/Norbiros/nuxt-auto-form/pull/8))

### 📖 Documentation

- Fix documentation url in `README` ([e77fd89](https://github.com/Norbiros/nuxt-auto-form/commit/e77fd89))
- Add more info in installation docs ([4c19c6b](https://github.com/Norbiros/nuxt-auto-form/commit/4c19c6b))
- Completely rewrite docs to mention the new features ([d41399f](https://github.com/Norbiros/nuxt-auto-form/commit/d41399f))

#### ⚠️ Breaking Changes

- ⚠️  Rename `ui` prop to `config` in AutoForm component ([700f706](https://github.com/Norbiros/nuxt-auto-form/commit/700f706))
- ⚠️  Move configuration to `app.config.ts` ([#8](https://github.com/Norbiros/nuxt-auto-form/pull/8))

### ❤️ Contributors

- Norbiros ([@Norbiros](https://github.com/Norbiros))

## v0.3.0

[compare changes](https://github.com/Norbiros/nuxt-auto-form/compare/v0.2.0...v0.3.0)

### 🚀 Enhancements

- Add `homepage` field to package.json ([60c7c85](https://github.com/Norbiros/nuxt-auto-form/commit/60c7c85))
- Add `after-fields` and `before-fields` slots ([78212c5](https://github.com/Norbiros/nuxt-auto-form/commit/78212c5))
- Bind props to submit button, add submit slot ([#2](https://github.com/Norbiros/nuxt-auto-form/pull/2))

### 🩹 Fixes

- Use correct module name in README.md ([c97ed13](https://github.com/Norbiros/nuxt-auto-form/commit/c97ed13))

### 💅 Refactors

- Simplify component mapping logic in AutoForm ([41252ac](https://github.com/Norbiros/nuxt-auto-form/commit/41252ac))

### 📖 Documentation

- Add missing `submit` slot info in `AutoForm` docs ([05b9b30](https://github.com/Norbiros/nuxt-auto-form/commit/05b9b30))

### 🏡 Chore

- Improve default configuration in `.vscode` ([be3a921](https://github.com/Norbiros/nuxt-auto-form/commit/be3a921))

### ❤️ Contributors

- Norbiros ([@Norbiros](https://github.com/Norbiros))
- Daniele Nicosia ([@zAlweNy26](https://github.com/zAlweNy26))

## v0.2.0

[compare changes](https://github.com/Norbiros/nuxt-auto-form/compare/v0.1.0...v0.2.0)

### 🚀 Enhancements

- **docs:** Start writing Customization docs section ([e1ac732](https://github.com/Norbiros/nuxt-auto-form/commit/e1ac732))
- **docs:** Start documenting specific components ([50d7eed](https://github.com/Norbiros/nuxt-auto-form/commit/50d7eed))
- New `ui` prop on `AutoForm` ([2438442](https://github.com/Norbiros/nuxt-auto-form/commit/2438442))

### 🩹 Fixes

- Handle edge case for zod version retrieval ([7a489cf](https://github.com/Norbiros/nuxt-auto-form/commit/7a489cf))
- ⚠️  Rename submit button property to `isButtonEnabled` ([2f209f9](https://github.com/Norbiros/nuxt-auto-form/commit/2f209f9))
- Update selector in `basic.test.ts` ([5633538](https://github.com/Norbiros/nuxt-auto-form/commit/5633538))

### 💅 Refactors

- Reorganize types to `runtime/types/` ([c988e7b](https://github.com/Norbiros/nuxt-auto-form/commit/c988e7b))
- Create `parseMeta` utility function ([aa91775](https://github.com/Norbiros/nuxt-auto-form/commit/aa91775))

#### ⚠️ Breaking Changes

- ⚠️  Rename submit button property to `isButtonEnabled` ([2f209f9](https://github.com/Norbiros/nuxt-auto-form/commit/2f209f9))

### ❤️ Contributors

- Norbiros ([@Norbiros](https://github.com/Norbiros))

## v0.1.0

[compare changes](https://github.com/Norbiros/nuxt-auto-form/compare/v0.0.2...v0.1.0)

### 🚀 Enhancements

- ⚠️  Rename module to `@norbiros/nuxt-auto-form` ([e8ce116](https://github.com/Norbiros/nuxt-auto-form/commit/e8ce116))

### 🩹 Fixes

- Resolve a lot of issues from basic testing ([240e676](https://github.com/Norbiros/nuxt-auto-form/commit/240e676))

#### ⚠️ Breaking Changes

- ⚠️  Rename module to `@norbiros/nuxt-auto-form` ([e8ce116](https://github.com/Norbiros/nuxt-auto-form/commit/e8ce116))

### ❤️ Contributors

- Norbiros ([@Norbiros](https://github.com/Norbiros))

## v0.0.2


### 🚀 Enhancements

- Initialize nuxt module ([fb640e1](https://github.com/Norbiros/nuxt-auto-form/commit/fb640e1))
- Migrate source code from `Hack4Krak/Hack4KrakSite` ([3f0a5f3](https://github.com/Norbiros/nuxt-auto-form/commit/3f0a5f3))
- Create docs from `@nuxt/ui-pro` starter ([142665c](https://github.com/Norbiros/nuxt-auto-form/commit/142665c))
- Switch to `@antfu/eslint-config` for linting ([68b24b7](https://github.com/Norbiros/nuxt-auto-form/commit/68b24b7))
- Add GitHub issue templates ([48960ee](https://github.com/Norbiros/nuxt-auto-form/commit/48960ee))
- **docs:** Start customization ([da38e42](https://github.com/Norbiros/nuxt-auto-form/commit/da38e42))
- Configure playwright tests ([daf2e9d](https://github.com/Norbiros/nuxt-auto-form/commit/daf2e9d))
- **playground:** Configure very basic test ([d4c30e5](https://github.com/Norbiros/nuxt-auto-form/commit/d4c30e5))
- **docs:** Add features section to the landing site ([a7bb2a7](https://github.com/Norbiros/nuxt-auto-form/commit/a7bb2a7))
- Add dependency checks ([cad9a1c](https://github.com/Norbiros/nuxt-auto-form/commit/cad9a1c))
- Add basic type declarations for `zod/GlobalMeta` ([87bea37](https://github.com/Norbiros/nuxt-auto-form/commit/87bea37))
- Implement customizable submit button proof of concept ([7b67d1f](https://github.com/Norbiros/nuxt-auto-form/commit/7b67d1f))
- Customize `README.md` ([6b0f3f0](https://github.com/Norbiros/nuxt-auto-form/commit/6b0f3f0))
- Update package.json with author info and keywords ([a548a29](https://github.com/Norbiros/nuxt-auto-form/commit/a548a29))

### 🩹 Fixes

- Update CI configuration to use 'master' branch instead of 'main' ([37f0131](https://github.com/Norbiros/nuxt-auto-form/commit/37f0131))
- Fix build issues ([6b3c767](https://github.com/Norbiros/nuxt-auto-form/commit/6b3c767))

### 💅 Refactors

- **docs:** Unify eslint config ([487dcc0](https://github.com/Norbiros/nuxt-auto-form/commit/487dcc0))

### ❤️ Contributors

- Norbiros ([@Norbiros](https://github.com/Norbiros))

