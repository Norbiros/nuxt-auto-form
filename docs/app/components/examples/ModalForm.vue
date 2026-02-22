<script setup lang="ts">
import * as z from 'zod'

const isOpen = ref(false)

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

function onSubmit(data: z.infer<typeof schema>) {
  useToast().add({
    title: 'Message sent!',
    description: `Thank you ${data.name}, we'll be in touch soon.`,
    color: 'success',
  })
  isOpen.value = false
}
</script>

<template>
  <div class="space-y-4">
    <div>
      <h3 class="text-lg font-semibold mb-2">
        Contact Us
      </h3>
      <p class="text-sm text-muted mb-4">
        Click the button to open a modal form
      </p>
    </div>

    <UButton size="lg" @click="isOpen = true">
      Open Contact Form
    </UButton>

    <AutoFormModal
      v-model:open="isOpen"
      :schema="schema"
      title="Get in Touch"
      description="Send us a message and we'll respond as soon as possible."
      @submit="onSubmit"
    />
  </div>
</template>
