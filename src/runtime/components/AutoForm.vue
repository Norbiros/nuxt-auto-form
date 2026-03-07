<script setup lang="ts" generic="T extends z.ZodObject<any>">
import type { FormSubmitEvent, InferInput, InferOutput } from '@nuxt/ui'
import type * as z from 'zod'
import type { AutoFormConfig } from '../types'
import { useAppConfig } from '#app'
import UButton from '@nuxt/ui/components/Button.vue'
import defu from 'defu'
import { computed, reactive, ref, useTemplateRef } from 'vue'
import AutoFormPrimitive from './AutoFormPrimitive.vue'

const props = withDefaults(defineProps<{
  schema: T
  initialState?: Partial<InferInput<T>>
  config?: AutoFormConfig
}>(), {
  initialState: () => ({}),
})

const emit = defineEmits<{
  (e: 'submit', data: InferOutput<T>): void
}>()

const state = reactive({ ...props.initialState })
const formRef = useTemplateRef('form')
const loading = ref(false)

// Only resolve config needed for the submit button — full defaults live in AutoFormPrimitive.
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
    :state="(state as Record<string, any>)"
    :config="config"
    @submit="onSubmit"
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
