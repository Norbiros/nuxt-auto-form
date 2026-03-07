<script setup lang="ts" generic="T extends z.ZodObject<any>">
import type { FormError, FormErrorEvent, FormSubmitEvent, InferOutput } from '@nuxt/ui'
import type * as z from 'zod'
import type { AutoFormConfig } from '../types'
import { useAppConfig } from '#app'
import UForm from '@nuxt/ui/components/Form.vue'
import UFormField from '@nuxt/ui/components/FormField.vue'
import defu from 'defu'
import { splitByCase, upperFirst } from 'scule'
import { computed, useSlots, useTemplateRef } from 'vue'
import { COMPONENTS_MAP, mapZodTypeToComponent } from '../components_map'
import { useMetaProcessor } from '../utils/useMetaProcessor'

const props = defineProps<{
  schema: T
  state: Record<string, any>
  config?: AutoFormConfig
  id?: string | number
  validate?: (state: Partial<InferOutput<T>>) => FormError[] | Promise<FormError[]>
  validateOn?: ('input' | 'change' | 'blur')[]
  disabled?: boolean
  validateOnInputDelay?: number
  transform?: boolean
  loadingAuto?: boolean
}>()

const emits = defineEmits<{
  submit: [payload: FormSubmitEvent<InferOutput<T>>]
  error: [payload: FormErrorEvent]
}>()

const slots = useSlots()
const formRef = useTemplateRef('form')
const shape = (props.schema as z.ZodObject<any>).shape

const defaults: Partial<AutoFormConfig> = {
  components: COMPONENTS_MAP,
  theme: {
    wFull: true,
  },
}

const appConfig = computed<AutoFormConfig>(() => {
  return defu(props.config, useAppConfig().autoForm, defaults)
})

const { processFieldMeta } = useMetaProcessor(appConfig)

const fields = computed(() => {
  return Object.entries(shape).map(([key, zodType]: [string, any]) => {
    const result = mapZodTypeToComponent(key, zodType, appConfig.value, props.state)
    if (!result)
      return null

    const rawMeta = typeof zodType.meta === 'function' ? zodType.meta() || {} : {}
    const meta = processFieldMeta(rawMeta, key)

    const defaultProps = {
      class: appConfig.value?.theme?.wFull ? 'w-full' : '',
    }

    return {
      key,
      formField: {
        name: key,
        slots: findSlots(key),
        ...parseMeta(meta, key),
      },
      component: meta?.input?.component ?? result.component,
      props: defu(defaultProps, meta?.input?.props, result.componentProps ?? {}),
    }
  }).filter((field): field is NonNullable<typeof field> => field != null)
})

function findSlots(key: string): string[] {
  return Object.keys(slots)
    .filter(name => name.startsWith(`${key}-`))
    .map(name => name.slice(key.length + 1))
}

function parseMeta(meta: any, key: string) {
  return {
    label: meta.title ?? upperFirst(splitByCase(key).join(' ').toLowerCase()),
    required: meta.required,
    description: meta.description,
    hint: meta.hint,
    help: meta.help,
    class: meta.theme?.floatRight ? 'flex items-center justify-between text-left' : '',
  }
}

function updateFieldValue(key: string, value: any) {
  // Intentionally mutate reactive state prop
  ;(props.state as Record<string, any>)[key] = value
}

const formProps = computed(() => ({
  schema: props.schema,
  state: props.state,
  id: props.id,
  validate: props.validate,
  validateOn: props.validateOn,
  disabled: props.disabled,
  validateOnInputDelay: props.validateOnInputDelay,
  transform: props.transform,
  loadingAuto: props.loadingAuto,
}))

defineExpose({
  form: formRef,
  submit: () => formRef.value?.submit(),
  validate: (opts?: any) => formRef.value?.validate(opts),
  clear: (path?: string | RegExp) => formRef.value?.clear(path as any),
  getErrors: (path?: string | RegExp) => formRef.value?.getErrors(path as any),
  setErrors: (errors: FormError[], name?: string | RegExp) => formRef.value?.setErrors(errors, name as any),
  errors: computed(() => formRef.value?.errors),
  disabled: computed(() => formRef.value?.disabled),
  dirty: computed(() => formRef.value?.dirty),
  dirtyFields: computed(() => formRef.value?.dirtyFields),
  touchedFields: computed(() => formRef.value?.touchedFields),
  blurredFields: computed(() => formRef.value?.blurredFields),
})
</script>

<template>
  <UForm
    :id="formProps.id"
    ref="form"
    :schema="formProps.schema"
    :state="(formProps.state as any)"
    :validate="formProps.validate as any"
    :validate-on="formProps.validateOn"
    :disabled="formProps.disabled"
    :validate-on-input-delay="formProps.validateOnInputDelay"
    :transform="formProps.transform"
    :loading-auto="formProps.loadingAuto"
    class="space-y-4"
    @submit="emits('submit', $event)"
    @error="emits('error', $event)"
  >
    <slot name="before-fields" />

    <UFormField
      v-for="field in fields"
      :key="field.key"
      :ui="{ description: 'text-left' }"
      v-bind="field.formField"
    >
      <template v-for="slot in field.formField.slots" #[slot]>
        <slot :name="`${field.key}-${slot}`" />
      </template>

      <slot
        :name="field.key"
        :field="field.key"
        :state="props.state"
      >
        <component
          :is="field.component"
          v-bind="field.props"
          :model-value="(props.state as Record<string, any>)[field.key]"
          @update:model-value="(value: any) => updateFieldValue(field.key, value)"
        >
          <slot :name="`${field.key}-content`" />
        </component>
      </slot>
    </UFormField>

    <slot name="after-fields" />

    <slot name="submit" />
  </UForm>
</template>
