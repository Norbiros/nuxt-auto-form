<script setup lang="ts">
import type { TabsItem } from '#ui/components/Tabs.vue'
import * as z from 'zod'

const items: TabsItem[] = [
  {
    label: 'Code',
    icon: 'i-lucide-user',
    slot: 'code' as const,
  },
  {
    label: 'Preview',
    icon: 'i-lucide-lock',
    slot: 'preview' as const,
  },
]

const org = `z.object({
  username: z.string().nonempty().meta({ title: 'Username' }),
  favoriteLanguage: z.enum(['JavaScript', 'TypeScript', 'Java', 'CoffeeScript'])
    .meta({
      title: 'Favorite Language',
      description: 'Choose wisely',
    }),
  yearsOfExperience: z.number().min(0).max(100),
  deployedOnFriday: z.boolean().default(true),
  text_description: z.string(),
})`

function runEval(code: any, context = {}) {
  // eslint-disable-next-line no-new-func
  return new Function(...Object.keys(context), `return ${code}`)(...Object.values(context))
}

const schema = runEval(org, { z })

const code = computed(() => {
  return [
    '```ts',
    `const schema = ${org}`,
    '```',
  ].join('\n')
})
</script>

<template>
  <UTabs class="w-full" :items="items">
    <template #code>
      <MDC :value="code" />
    </template>

    <template #preview>
      <div class="p-4 border rounded">
        <AutoForm :schema="schema" />
      </div>
    </template>
  </UTabs>
</template>
