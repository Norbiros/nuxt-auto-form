import type { ConcreteComponent } from '@vue/runtime-core'

interface AutoFormConfig {
  /** Primary app color */
  submitButtonComponent?: ConcreteComponent | string
}

declare module 'nuxt/schema' {
  interface AppConfigInput {
    /** Theme configuration */
    autoForm?: AutoFormConfig
  }

  interface AppConfig {
    autoForm: AutoFormConfig
  }
}

export {}
