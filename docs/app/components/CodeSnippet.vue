<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  code: string
  lang?: string
  filename?: string
}>()

const markdown = computed(() => {
  const info = [props.lang ?? 'vue', props.filename && `[${props.filename}]`]
    .filter(Boolean)
    .join(' ')
  return `\`\`\`\`${info}\n${props.code.trim()}\n\`\`\`\``
})
</script>

<template>
  <MDC :value="markdown" />
</template>
