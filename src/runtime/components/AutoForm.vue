<script setup lang="ts" generic="T extends z.ZodObject<any>">
import type { FormErrorEvent, FormSubmitEvent, InferOutput } from '@nuxt/ui'
import type * as z from 'zod'
import type { AutoFormConfig, AutoFormState } from '../types'
import { useAppConfig } from '#app'
import UButton from '@nuxt/ui/components/Button.vue'
import defu from 'defu'
import { computed, reactive, ref, useTemplateRef } from 'vue'
import AutoFormPrimitive from './AutoFormPrimitive.vue'

const props = withDefaults(defineProps<{
  schema: T
  initialState?: AutoFormState<T>
  config?: AutoFormConfig
}>(), {
  initialState: () => ({}),
})

const emit = defineEmits<{
  submit: [data: InferOutput<T>]
  error: [payload: FormErrorEvent]
}>()

const state = reactive({ ...props.initialState }) as AutoFormState<T>
const formRef = useTemplateRef('form')
const loading = ref(false)

const appConfig = computed<AutoFormConfig>(() => {
  return defu(props.config, useAppConfig().autoForm)
})

const isButtonDisabled = computed(() => !props.schema.safeParse(state).success)

const submitButton = computed(() => {
  if (appConfig.value?.submit !== false)
    return appConfig.value?.submit
  return undefined
})

const submitButtonProps = computed(() => ({
  'aria-disabled': isButtonDisabled.value,
  ...submitButton.value?.props,
}))

defineExpose({ submit })

async function onSubmit(event: FormSubmitEvent<InferOutput<T>>) {
  event.preventDefault()
  loading.value = true
  try {
    emit('submit', event.data)
  }
  finally {
    loading.value = false
  }
}

function submit() {
  formRef.value?.submit()
}
</script>

<template>
  <AutoFormPrimitive
    ref="form"
    :schema="schema"
    :state="state as AutoFormState<T>"
    :config="config"
    @submit="onSubmit"
    @error="emit('error', $event)"
  >
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData ?? {}" />
    </template>

    <template #submit>
      <slot name="submit" :disabled="isButtonDisabled">
        <div v-if="appConfig?.submit !== false">
          <template v-if="submitButton?.component">
            <component :is="submitButton.component" v-bind="submitButtonProps" />
          </template>
          <UButton
            v-else
            type="submit"
            label="Send"
            v-bind="submitButtonProps"
          />
        </div>
      </slot>
    </template>
  </AutoFormPrimitive>
</template>
