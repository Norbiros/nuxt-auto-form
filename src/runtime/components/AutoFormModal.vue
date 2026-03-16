<script setup lang="ts" generic="T extends z.ZodObject<any>">
import type { FormSubmitEvent, InferOutput, ModalProps } from '@nuxt/ui'
import type * as z from 'zod'
import type { AutoFormConfig, AutoFormState } from '../types'
import { useAppConfig } from '#app'
import UButton from '@nuxt/ui/components/Button.vue'
import UModal from '@nuxt/ui/components/Modal.vue'
import defu from 'defu'
import { computed, reactive, toRaw, useTemplateRef } from 'vue'
import AutoFormPrimitive from './AutoFormPrimitive.vue'

export interface AutoFormModalProps<TSchema extends z.ZodObject<any>> {
  open?: boolean
  schema: TSchema
  initialState?: AutoFormState<TSchema>
  title?: string
  description?: string
  config?: AutoFormConfig
  modalProps?: Partial<ModalProps>
}

const props = withDefaults(defineProps<AutoFormModalProps<T>>(), {
  open: false,
  initialState: () => ({}),
  modalProps: () => ({}),
})

const emit = defineEmits<{
  'submit': [data: InferOutput<T>]
  'update:open': [value: boolean]
}>()

const defaults: Partial<AutoFormConfig> = {
  modal: { submitLabel: 'Submit', closeLabel: 'Cancel' },
}

const appConfig = computed<AutoFormConfig>(() => {
  return defu(
    props.config,
    useAppConfig().autoForm,
    defaults,
  )
})

const state = reactive<AutoFormState<T>>({ ...props.initialState })
const formRef = useTemplateRef('form')

const isButtonDisabled = computed(() => !props.schema.safeParse(state).success)

const open = computed({
  get: () => props.open,
  set: value => emit('update:open', value),
})

defineExpose({
  submit: () => formRef.value?.submit(),
  form: formRef,
})

async function onSubmit(event: FormSubmitEvent<InferOutput<T>>) {
  event.preventDefault()
  emit('submit', toRaw(event.data) as InferOutput<T>)
}

function close() {
  open.value = false
}
</script>

<template>
  <UModal
    v-model:open="open"
    :title="title"
    :description="description"
    :ui="{ footer: 'justify-end' }"
    v-bind="modalProps"
  >
    <template #body>
      <AutoFormPrimitive
        ref="form"
        :schema="schema"
        :state="state as AutoFormState<T>"
        :config="config"
        @submit="onSubmit"
      >
        <template v-for="(_, name) in $slots" #[name]="slotData">
          <slot :name="name" v-bind="slotData" />
        </template>
      </AutoFormPrimitive>
    </template>

    <template #footer>
      <slot name="footer" :disabled="isButtonDisabled" :submit="() => formRef?.form?.submit()" :close="close">
        <UButton
          :label="appConfig.modal?.closeLabel"
          color="neutral"
          variant="outline"
          @click="close"
        />
        <UButton
          :label="appConfig.modal?.submitLabel"
          :disabled="isButtonDisabled"
          @click="formRef?.form?.submit()"
        />
      </slot>
    </template>
  </UModal>
</template>
