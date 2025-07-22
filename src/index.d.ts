import type { ConcreteComponent } from '@vue/runtime-core'

declare module 'zod' {
  interface GlobalMeta {
    /** Configuration related to `nuxt-auto-form` Nuxt module */
    autoForm?: {
      /** Float input box to the right of the label */
      floatRight?: boolean
    }
  }
}

interface AutoFormConfig {
  /** Primary app color */
  submitButtonComponent?: ConcreteComponent | string
}

declare module 'nuxt/schema' {
  interface AppConfigInput {
    /** Theme configuration */
    autoForm?: AutoFormConfig | undefined
  }

  interface AppConfig {
    autoForm?: AutoFormConfig | undefined
  }
}

export {}
