<script setup lang="ts">
import * as z from 'zod'

const schema = z.object({
  email: z.email(),
  role: z.enum(['Developer', 'Designer', 'Founder']),
})
</script>

<template>
  <AutoForm :schema="schema" />
</template>
