import type { AutoFormConfig } from './runtime/types'
import { addComponent, addComponentsDir, addTypeTemplate, createResolver, defineNuxtModule } from '@nuxt/kit'
import { ensureDependencies } from './utils/packages'

export type ModuleOptions = AutoFormConfig

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-auto-form',
    configKey: 'autoForm',
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  async setup(options, nuxt) {
    nuxt.options.runtimeConfig.public.autoForm = options as any
    // Inject module options into app config as defaults so useAppConfig().autoForm picks them up
    // User's app.config.ts takes precedence via Nuxt's app config merging
    nuxt.options.appConfig.autoForm = options as any
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
      name: 'AutoForm',
      filePath: resolver.resolve('runtime/components/AutoForm.vue'),
    })
    addComponent({
      name: 'AutoFormPrimitive',
      filePath: resolver.resolve('runtime/components/AutoFormPrimitive.vue'),
    })
    addComponent({
      name: 'AutoFormModal',
      filePath: resolver.resolve('runtime/components/AutoFormModal.vue'),
    })
    addComponentsDir({
      path: resolver.resolve('runtime/components/input/'),
      prefix: 'AInput',
      pathPrefix: false,
    })
  },
})
