<script setup lang="ts">
import * as z from 'zod'

const schema = z.object({
  text: z.string().nonempty(),
  enum: z.enum(['1', '2', '3'])
    .meta({
      description: 'With description',
    }),
  custom_bool: z.boolean()
    .meta({ title: 'Title' }),
})
</script>

<template>
  <AutoForm :schema="schema" />
</template>
