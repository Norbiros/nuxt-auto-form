<script setup lang="ts" generic="T extends z.ZodObject<any>">
import type { FormSubmitEvent, InferOutput, ModalProps } from '@nuxt/ui'
import type * as z from 'zod'
import type { AutoFormConfig, AutoFormState } from '../types'
import UButton from '@nuxt/ui/components/Button.vue'
import UModal from '@nuxt/ui/components/Modal.vue'
import { computed, reactive, toRaw, useTemplateRef } from 'vue'
import AutoFormPrimitive from './AutoFormPrimitive.vue'

export interface AutoFormModalProps<TSchema extends z.ZodObject<any>> {
  open?: boolean
  schema: TSchema
  initialState?: AutoFormState<TSchema>
  config?: AutoFormConfig
  title?: string
  description?: string
  submitLabel?: string
  closeLabel?: string
  modalProps?: Partial<ModalProps>
}

const props = withDefaults(defineProps<AutoFormModalProps<T>>(), {
  open: false,
  initialState: () => ({}),
  submitLabel: 'Submit',
  closeLabel: 'Cancel',
  modalProps: () => ({}),
})

const emit = defineEmits<{
  'submit': [data: InferOutput<T>]
  'update:open': [value: boolean]
}>()

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
          :label="closeLabel"
          color="neutral"
          variant="outline"
          @click="close"
        />
        <UButton
          :label="submitLabel"
          :disabled="isButtonDisabled"
          @click="formRef?.form?.submit()"
        />
      </slot>
    </template>
  </UModal>
</template>
