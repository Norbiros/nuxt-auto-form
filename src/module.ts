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
      filename: 'runtime/types/nuxt-auto-form.d.ts',
      src: resolver.resolve('runtime/types/index.d.ts'),
    })
    addTypeTemplate({
      filename: 'runtime/types/nuxt-auto-form-zod.d.ts',
      src: resolver.resolve('runtime/types/zod.d.ts'),
    })

    addComponent({
      name: 'AutoForm', // name of the component to be used in vue templates
      filePath: resolver.resolve('runtime/components/AutoForm.vue'),
    })
  },
})
