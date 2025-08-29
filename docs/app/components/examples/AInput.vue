<script setup lang="ts">
import { AInputPasswordToggle, AInputWithClear }
  from '#components'
import * as z from 'zod'

const schema = z.object({
  with_clear: z.string()
    .default('Press to clear!')
    .meta({
      input: {
        component: AInputWithClear,
      },
    }),
  password: z.string().meta({
    input: {
      component: AInputPasswordToggle,
    },
  }),
})
</script>

<template>
  <AutoForm :schema="schema" />
</template>
