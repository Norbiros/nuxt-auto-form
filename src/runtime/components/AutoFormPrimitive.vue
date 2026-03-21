<script setup lang="ts" generic="T extends z.ZodObject<any>">
import type { Form, FormError, FormErrorEvent, FormSubmitEvent, InferOutput } from '@nuxt/ui'
import type * as z from 'zod'
import type { ComponentDefinition } from '../components_map'
import type { AutoFormConfig, AutoFormState } from '../types'
import { useAppConfig } from '#app'
import UForm from '@nuxt/ui/components/Form.vue'
import UFormField from '@nuxt/ui/components/FormField.vue'
import defu from 'defu'
import { splitByCase, upperFirst } from 'scule'
import { computed, useSlots, useTemplateRef } from 'vue'
import { COMPONENTS_MAP, mapZodTypeToComponent } from '../components_map'
import { useMetaProcessor } from '../utils/useMetaProcessor'

type FormInstance = Form<T>
type FieldKey = keyof AutoFormState<T> & string

interface FieldDefinition {
  key: FieldKey
  formField: ReturnType<typeof parseMeta> & {
    name: FieldKey
    slots: string[]
  }
  component: ComponentDefinition['component']
  props: NonNullable<ComponentDefinition['componentProps']>
}

const props = defineProps<{
  schema: T
  state: AutoFormState<T>
  config?: AutoFormConfig
  id?: string | number
  validate?: (state: AutoFormState<T>) => FormError[] | Promise<FormError[]>
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
const formRef = useTemplateRef<FormInstance>('form')
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

const fields = computed<FieldDefinition[]>(() => {
  const resolvedFields: FieldDefinition[] = []

  for (const key of Object.keys(shape) as FieldKey[]) {
    const zodType = shape[key]
    const result = mapZodTypeToComponent(key, zodType, appConfig.value, props.state)
    if (!result)
      continue

    const rawMeta = typeof zodType.meta === 'function' ? zodType.meta() || {} : {}
    const meta = processFieldMeta(rawMeta, key)

    const defaultProps = {
      class: appConfig.value?.theme?.wFull ? 'w-full' : '',
    }

    resolvedFields.push({
      key,
      formField: {
        name: key,
        slots: findSlots(key),
        ...parseMeta(meta, key, appConfig.value),
      },
      component: meta?.input?.component ?? result.component,
      props: defu(defaultProps, meta?.input?.props, result.componentProps ?? {}),
    })
  }

  return resolvedFields
})

function findSlots(key: string): string[] {
  return Object.keys(slots)
    .filter(name => name.startsWith(`${key}-`))
    .map(name => name.slice(key.length + 1))
}

function parseMeta(meta: any, key: string, config: AutoFormConfig) {
  const showLabel = meta.title !== false && config?.theme?.label !== false
  return {
    label: showLabel ? (meta.title ?? upperFirst(splitByCase(key).join(' ').toLowerCase())) : undefined,
    required: meta.required,
    description: meta.description,
    hint: meta.hint,
    help: meta.help,
    class: meta.theme?.floatRight ? 'flex items-center justify-between text-left' : '',
  }
}

function getFieldValue(key: string) {
  return props.state[key as keyof AutoFormState<T>]
}

function updateFieldValue(key: string, value: unknown) {
  ;(props.state as Record<string, unknown>)[key] = value
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
    :state="formProps.state"
    :validate="formProps.validate"
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
          :model-value="getFieldValue(field.key)"
          @update:model-value="(value: unknown) => updateFieldValue(field.key, value)"
        >
          <slot :name="`${field.key}-content`" />
        </component>
      </slot>
    </UFormField>

    <slot name="after-fields" />

    <slot name="submit" />
  </UForm>
</template>
