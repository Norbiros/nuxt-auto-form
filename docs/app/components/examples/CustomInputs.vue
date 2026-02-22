<script setup lang="ts">
import { AInputPasswordToggle, AInputWithClear } from '#components'
import * as z from 'zod'

const schema = z.object({
  search: z.string()
    .meta({
      title: 'Search Query',
      description: 'Clear button appears when typing',
      input: {
        component: AInputWithClear,
        props: {
          placeholder: 'Search for anything...',
          icon: 'i-lucide-search',
        },
      },
    }),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .meta({
      title: 'Password',
      description: 'Toggle to show/hide password',
      input: {
        component: AInputPasswordToggle,
        props: {
          placeholder: 'Enter your password',
        },
      },
    }),
})
</script>

<template>
  <div class="space-y-4">
    <div>
      <h3 class="text-lg font-semibold mb-2">
        Custom Input Components
      </h3>
      <p class="text-sm text-muted mb-4">
        Easily use custom components for enhanced UX
      </p>
    </div>
    <AutoForm :schema="schema" />
  </div>
</template>
