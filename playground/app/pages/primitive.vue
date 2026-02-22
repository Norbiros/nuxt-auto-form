<script setup lang="ts">
import type { FormSubmitEvent, InferOutput } from '@nuxt/ui'
import * as z from 'zod'

const schema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.email('Invalid email'),
})

const state = reactive({ username: '', email: '' })
const formRef = useTemplateRef('form')
const submittedData = ref<InferOutput<typeof schema> | null>(null)
const errorEvent = ref<string | null>(null)

function onSubmit(event: FormSubmitEvent<InferOutput<typeof schema>>) {
  submittedData.value = event.data
}

function onError(_event: any) {
  errorEvent.value = 'Validation failed'
}

function triggerSubmit() {
  formRef.value?.submit()
}

function resetForm() {
  state.username = ''
  state.email = ''
  submittedData.value = null
  errorEvent.value = null
}
</script>

<template>
  <div class="p-8 max-w-md mx-auto">
    <h1 class="text-xl font-bold mb-4">
      AutoFormPrimitive Test
    </h1>

    <div class="mb-4 flex gap-2">
      <UButton label="Trigger Submit" data-testid="trigger-submit" @click="triggerSubmit" />
      <UButton label="Reset" variant="outline" data-testid="reset-btn" @click="resetForm" />
    </div>

    <AutoFormPrimitive
      ref="form"
      :schema="schema"
      :state="state"
      @submit="onSubmit"
      @error="onError"
    >
      <template #submit>
        <UButton type="submit" label="Submit" data-testid="submit-btn" />
      </template>
    </AutoFormPrimitive>

    <div v-if="submittedData" class="mt-4 p-4 bg-green-100 rounded" data-testid="success-message">
      Submitted: {{ JSON.stringify(submittedData) }}
    </div>

    <div v-if="errorEvent" class="mt-4 p-4 bg-red-100 rounded" data-testid="error-message">
      {{ errorEvent }}
    </div>
  </div>
</template>
