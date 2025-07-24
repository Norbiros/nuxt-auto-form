<script setup lang="ts" generic="T extends z.ZodObject<any>">
import type { FormSubmitEvent, InferInput, InferOutput } from '@nuxt/ui'
import type { AutoFormConfig } from '../types'
import { useAppConfig } from '#app'
import UButton from '@nuxt/ui/components/Button.vue'
import UCheckbox from '@nuxt/ui/components/Checkbox.vue'
import UForm from '@nuxt/ui/components/Form.vue'
import UFormField from '@nuxt/ui/components/FormField.vue'
import UInput from '@nuxt/ui/components/Input.vue'
import UInputNumber from '@nuxt/ui/components/InputNumber.vue'
import USelect from '@nuxt/ui/components/Select.vue'
import defu from 'defu'

import { splitByCase, upperFirst } from 'scule'

import { computed, reactive, ref, toRaw, useTemplateRef } from 'vue'
import * as z from 'zod'

const props = withDefaults(defineProps<{
  schema: T
  initialState?: Partial<InferInput<T>>
  ui?: AutoFormConfig
}>(), {
  initialState: () => ({}),
})

const emit = defineEmits<{
  (e: 'submit', data: InferOutput<T>): void
}>()

const state = reactive({ ...props.initialState })

defineExpose({ submit })

const formRef = useTemplateRef('form')
const loading = ref(false)
const shape = (props.schema as z.ZodObject<any>).shape

const isButtonDisabled = computed(() => !props.schema.safeParse(state).success)

type Output = InferOutput<T>

const fields = Object.entries(shape).map(([key, zodType]) =>
  getComponentForZodType(key, zodType),
)

function parseMeta(zodType: any, key: string) {
  const meta = typeof zodType.meta === 'function' ? zodType.meta() || {} : {}

  return {
    label: meta.title ?? upperFirst(splitByCase(key).join(' ').toLowerCase()),
    description: meta.description,
    class: meta.autoForm?.floatRight ? 'flex items-center justify-between text-left' : '',
  }
}

function getComponentForZodType(key: string, zodType: any) {
  let component = UInput as any
  let componentProps = {}

  if (zodType instanceof z.ZodEmail) {
    componentProps = { type: 'email' }
  }
  else if (zodType instanceof z.ZodNumber) {
    component = UInputNumber
  }
  else if (zodType instanceof z.ZodBoolean) {
    component = UCheckbox
  }
  else if (zodType instanceof z.ZodEnum) {
    component = USelect
    componentProps = { items: [Object.values(zodType.def.entries)] }
  }
  else if (zodType instanceof z.ZodArray) {
    const sub_element = zodType.def.element
    if (sub_element instanceof z.ZodEnum) {
      const result = getComponentForZodType(key, zodType.unwrap()) as any
      result.props.multiple = true

      result.formField = {
        ...result.formField,
        ...parseMeta(zodType, key),
      }
      return result
    }
  }
  else if (zodType instanceof z.ZodDefault) {
    (state as any)[key] = zodType.def.defaultValue
    return getComponentForZodType(key, zodType.unwrap())
  }
  else if (zodType instanceof z.ZodString) {
    component = UInput
  }
  else {
    console.warn('Unknown zod type', zodType.constructor.name)
  }

  const meta = parseMeta(zodType, key)
  return {
    key,
    formField: {
      name: key,
      ...meta,
    },
    component,
    props: componentProps,
  }
}

async function onSubmit(event: FormSubmitEvent<Output>) {
  event.preventDefault()
  loading.value = true
  try {
    emit('submit', toRaw(event.data))
  }
  finally {
    loading.value = false
  }
}

function submit() {
  formRef.value?.submit()
}

const appConfig = computed<AutoFormConfig>(() => {
  return defu(props.ui, useAppConfig().autoForm)
})

const submitButtonComponent = computed(() => {
  return appConfig.value?.submit?.component
})

const submitButtonProps = computed(() => {
  return {
    ...appConfig.value?.submit?.props,
    disabled: isButtonDisabled.value,
  }
})
</script>

<template>
  <UForm
    ref="form"
    :schema="schema"
    :state="(state as any)"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormField
      v-for="field in fields"
      :key="field.formField.key"
      :ui="{ description: 'text-left' }"
      v-bind="field.formField"
    >
      <slot
        :name="field.key"
        :field="field.key"
        :state="(state as Record<string, any>)"
      >
        <component
          :is="field.component"
          v-bind="field.props"
          v-model="(state as Record<string, any>)[field.key]"
        />
      </slot>
    </UFormField>
    <slot name="submit" :disabled="isButtonDisabled">
      <template v-if="submitButtonComponent">
        <component :is="toRaw(submitButtonComponent)" v-bind="submitButtonProps" />
      </template>
      <UButton
        v-else
        type="submit"
        label="Send"
        v-bind="submitButtonProps"
      />
    </slot>
  </UForm>
</template>
