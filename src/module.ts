import { addComponent, addTypeTemplate, createResolver, defineNuxtModule } from '@nuxt/kit'
import { ensureDependencies } from './utils/packages'

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-auto-form',
    configKey: 'autoForm',
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  async setup(options, nuxt) {
    nuxt.options.runtimeConfig.public.autoForm = options
    if (!await ensureDependencies()) {
      return
    }

    const resolver = createResolver(import.meta.url)

    addTypeTemplate({
      filename: 'types/nuxt-auto-form.d.ts',
      getContents: () => `
        declare module 'zod' {
          interface GlobalMeta {
            /** Configuration related to \`nuxt-auto-form\` Nuxt module */
            autoForm?: {
              /** Float input box to the right of the label */
              floatRight?: boolean
            }
          }
        }

        export {}`,
    })

    addComponent({
      name: 'AutoForm', // name of the component to be used in vue templates
      filePath: resolver.resolve('runtime/components/AutoForm.vue'),
    })
    //
    // addComponent({
    //   name: 'SubmitButton', // name of the component to be used in vue templates
    //   filePath: resolver.resolve('runtime/components/customization/SubmitButton.vue'),
    // })

    // nuxt.hook('components:dirs', (dirs) => {
    //   console.log('DIRS')
    //   dirs.push({
    //     path: resolver.resolve('runtime/components'),
    //     prefix: 'nuxt-auto-form',
    //     pathPrefix: false,
    //     priority: -10,
    //   })7
    // })

    // // todo: if index.vue works in compnents use it
    // addComponentsDir({
    //   path: resolver.resolve('./runtime/components/customization/'),
    //   global: true,
    //   prefix: 'AutoForm',
    //   // pathPrefix: false,
    //   priority: -10,
    // })
  },
})
