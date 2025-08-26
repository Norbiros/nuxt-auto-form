<script setup lang="ts">
import * as z from 'zod'

const schema = z.object({
  form_field: z.string()
    .nonempty()
    .meta({
      title: 'Title',
      required: true,
      description: 'Description',
      hint: 'Hint',
      help: 'Help',
    }),
  input: z.number().meta({ input: {
    props: {
      placeholder: '69420',
    },
  } }),
  style: z.boolean()
    .meta({ autoForm: { floatRight: true } }),
})
</script>

<template>
  <AutoForm :schema="schema" />
</template>
