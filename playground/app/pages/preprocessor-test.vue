<script setup lang="ts">
import * as z from 'zod'

const schema = z.object({
  username: z.string()
    .min(3, '$i18n:validation.username_min')
    .meta({
      title: '$i18n:form.username',
      input: {
        props: {
          placeholder: '$i18n:form.username_placeholder',
        },
      },
    }),
  code: z.string()
    .regex(/^[A-Z0-9]+$/, '$upper:code must be uppercase alphanumeric')
    .meta({
      title: '$upper:access code',
      description: '$i18n:form.code_description',
    }),
})

function onSubmit(data: Record<string, any>) {
  useToast().add({
    title: 'Form submitted',
    description: JSON.stringify(data, null, 2),
  })
}
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <div class="border rounded p-5 max-w-md">
      <h1 class="text-xl font-bold text-center mb-4">
        Preprocessors Test
      </h1>
      <AutoForm
        :schema="schema"
        @submit="onSubmit"
      />
    </div>
  </div>
</template>
