<script setup lang="ts">
import { AInputPasswordToggle, AInputWithClear } from '#components'
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
      autoForm: { floatRight: true },
    }),
  multiple_input: z
    .array(z.enum(ENUM_MULTIPLE))
    .meta({ title: 'Multiple Enum Input' }),
  password: z.string().nonempty().meta({ input: { component: AInputPasswordToggle } }),
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
    <template #custom_bool="{ field, state }">
      <USelect
        v-model="state[field]"
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
