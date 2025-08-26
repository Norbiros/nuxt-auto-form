<script setup lang="ts">
import * as z from 'zod'

const schema = z.object({
  username: z.string().nonempty().meta({ title: 'Username' }),
  favoriteLanguage: z
    .enum(['JavaScript', 'TypeScript', 'Java', 'CoffeeScript'])
    .meta({
      title: 'Favorite Language',
      description: 'Choose wisely',
    }),
  yearsOfExperience: z.number().min(0).max(100),
  deployedOnFriday: z.boolean().default(true),
  text_description: z.string(),
})
</script>

<template>
  <AutoForm :schema="schema" />
</template>
