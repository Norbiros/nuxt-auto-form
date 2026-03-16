<script setup lang="ts">
import * as z from 'zod'

const basicSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
})

const advancedSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
})

const open = ref(false)
const openWithInitial = ref(false)
const openNoCancel = ref(false)
const submittedData = ref<z.infer<typeof basicSchema | typeof advancedSchema> | null>(null)
const formRef = useTemplateRef('form')

const initialData = { title: 'Initial Title', content: 'Initial content here' }

function onSubmit(data: z.infer<typeof basicSchema | typeof advancedSchema>) {
  submittedData.value = data
  open.value = false
  openWithInitial.value = false
  openNoCancel.value = false
}

function reset() {
  submittedData.value = null
}

function _triggerExternalSubmit() {
  formRef.value?.submit()
}
</script>

<template>
  <div class="p-8 max-w-md mx-auto">
    <h1 class="text-xl font-bold mb-4">
      AutoFormModal Test
    </h1>

    <div class="mb-4 flex flex-col gap-2">
      <UButton label="Open Modal" data-testid="open-modal-btn" @click="open = true" />
      <UButton label="Open Modal with Initial State" data-testid="open-initial-btn" @click="openWithInitial = true" />
      <UButton label="Open Modal No Cancel" data-testid="open-no-cancel-btn" @click="openNoCancel = true" />
      <UButton label="Reset" variant="outline" data-testid="reset-btn" @click="reset" />
    </div>

    <div v-if="submittedData" class="mt-4 p-4 bg-green-100 rounded" data-testid="success-message">
      Submitted: {{ JSON.stringify(submittedData) }}
    </div>

    <!-- Basic modal -->
    <AutoFormModal
      ref="form"
      v-model:open="open"
      title="Test Form Modal"
      description="Fill in the form below"
      :schema="basicSchema"
      :config="{ modal: { submitLabel: 'Save', closeLabel: 'Cancel' } }"
      @submit="onSubmit"
    />

    <!-- Modal with initial state -->
    <AutoFormModal
      v-model:open="openWithInitial"
      title="Edit Form"
      description="Edit the existing data"
      :schema="advancedSchema"
      :initial-state="initialData"
      :config="{ modal: { submitLabel: 'Update' } }"
      data-testid="initial-modal"
      @submit="onSubmit"
    />

    <!-- Modal with custom footer slot (no cancel) -->
    <AutoFormModal
      v-model:open="openNoCancel"
      title="Confirm Action"
      :schema="advancedSchema"
      data-testid="no-cancel-modal"
      @submit="onSubmit"
    >
      <template #footer="{ disabled, submit }">
        <UButton label="Confirm" :disabled="disabled" data-testid="confirm-only-btn" @click="submit" />
      </template>
    </AutoFormModal>
  </div>
</template>
