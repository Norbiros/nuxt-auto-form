<script setup lang="ts">
import * as z from 'zod'

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
  enum: z.enum(['1', '2', '3'])
    .meta({
      title: 'Enum Input',
    }),
  custom_bool: z.boolean()
    .meta({ title: 'Input with custom slot' }),
})
</script>

<template>
  <AutoForm
    :schema="schema"
    :config="{ submit: { props: { label: 'Send!!!' } } }"
  />
</template>
