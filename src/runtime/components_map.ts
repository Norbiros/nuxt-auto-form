import type { AutoFormConfig, ComponentsMap } from './types'
import UCheckbox from '@nuxt/ui/components/Checkbox.vue'
import UInput from '@nuxt/ui/components/Input.vue'
import UInputNumber from '@nuxt/ui/components/InputNumber.vue'
import USelect from '@nuxt/ui/components/Select.vue'
import * as z from 'zod'

export interface ComponentDefinition {
  // FIXME: Try using proper types for components
  component: any
  componentProps?: Record<string, any>
}

export const COMPONENTS_MAP: ComponentsMap = {
  number: () => ({ component: UInputNumber }),
  string: () => ({ component: UInput }),
  boolean: () => ({ component: UCheckbox }),
  enum: ({ zodType }) => ({
    component: USelect,
    componentProps: {
      items: Object.values(zodType.def.entries),
    },
  }),
  array: ({ key, zodType, config, state }) => {
    const innerType = zodType.def.element
    if (innerType instanceof z.ZodEnum) {
      const result = mapZodTypeToComponent(key, zodType.unwrap(), config, state) as any
      result.componentProps.multiple = true
      return result
    }
  },
  default: ({ key, zodType, state, config }) => {
    (state as any)[key] = zodType.def.defaultValue
    return mapZodTypeToComponent(key, zodType.unwrap(), config, state)
  },
  email: () => ({
    component: UInput,
    componentProps: { type: 'text' },
  }),
}

export function mapZodTypeToComponent(key: string, zodType: any, config: AutoFormConfig, state: any): ComponentDefinition | null {
  const zodTypeKey = zodType._def.format ?? zodType._def.type
  const component = config.components?.[zodTypeKey]
  if (!component) {
    console.warn(`Unsupported Zod type: ${zodTypeKey}`)
    console.warn('Please update your @norbiros/nuxt-auto-form configuration')
    console.warn('Or report it here https://github.com/Norbiros/nuxt-auto-form')
    return null
  }
  return component({ key, zodType, config, state })
}
