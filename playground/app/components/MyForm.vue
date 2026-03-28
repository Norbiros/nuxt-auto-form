<script setup lang="ts">
import { AInputWithClear } from '#components'
import * as z from 'zod'

const ENUM_MULTIPLE = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
]

const schema = z.object({
  text: z.string()
    .nonempty()
    .meta({
      title: 'Text Input',
      required: true,
      input: {
        props: {
          placeholder: 'Placeholder',
        },
      },
    }),
  optional_number: z.number()
    .optional()
    .meta({
      title: 'Optional Number Input',
    }),
  email: z.email()
    .nonempty(),
  enum: z.enum(['1', '2', '3'])
    .meta({
      title: 'Enum Input',
    }),
  text_description: z.string()
    .meta({
      description: 'with description',
      hint: 'with hint',
      input: {
        component: AInputWithClear,
      },
    }),
  custom_bool: z.boolean()
    .meta({ title: 'Input with custom slot' }),
  bool: z.boolean()
    .default(true)
    .meta({
      title: 'Boolean Input with floatRight',
      theme: { floatRight: true },
    }),
  multiple_input: z
    .array(z.enum(ENUM_MULTIPLE))
    .meta({ title: 'Multiple Enum Input' }),
  title_null_field: z.string()
    .optional()
    .meta({ title: null }),
})

function onSubmit(data: Record<string, any>) {
  useToast().add({
    title: 'Form submitted',
    description: JSON.stringify(data, null, 2),
  })
}
</script>

<template>
  <AutoForm
    :schema="schema"
    @submit="onSubmit"
  >
    <template #text-hint>
      <NuxtLink to="https://norbiros.dev">
        Who?
      </NuxtLink>
    </template>
    <template #custom_bool="{ state }">
      <USelect
        v-model="state.custom_bool"
        :items="[
          {
            label: 'False',
            value: false,
          },
          {
            label: 'True',
            value: true,
          },
        ]"
      />
    </template>
  </AutoForm>
</template>
