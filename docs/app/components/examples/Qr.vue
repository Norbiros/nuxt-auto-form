<script setup lang="ts">
import * as z from 'zod'

const schema = z.object({
  code: z.array(z.string({ error: 'Kod do rejestracji jest wymagany' })).length(6, 'Kod do rejestracji musi mieć 6 znaków'),
})

const open = defineModel<boolean>()
const formRef = useTemplateRef('form')

async function onSubmit(event: z.infer<typeof schema>) {
  useToast().add({ title: 'Code', description: event.code.join(''), color: 'success' })
  open.value = false
}
</script>

<template>
  <UModal v-model:open="open" title="QR code" :ui="{ footer: 'justify-end' }">
    <UButton label="Open" color="neutral" variant="subtle" />

    <template #body>
      <AutoForm ref="form" :schema="schema" :config="{ submit: false }" @submit="onSubmit">
        <template #code="{ field, state: stateValue }">
          <div class="flex items-center space-x-2">
            <UPinInput v-model="stateValue[field]" class="mr-5" :length="6" />
            <UButton icon="lucide:qr-code" @click="stateValue[field] = '123123'.split('')" />
          </div>
        </template>
      </AutoForm>
    </template>

    <template #footer>
      <UButton label="Close" color="neutral" variant="outline" @click="open = false" />
      <UButton label="Send" @click="formRef?.submit()" />
    </template>
  </UModal>
</template>
