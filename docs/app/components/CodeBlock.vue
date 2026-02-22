<script setup lang="ts">
defineProps<{
  code: string
}>()
</script>

<template>
  <div class="w-full h-full overflow-auto [&>pre]:!bg-transparent [&>pre]:!m-0 [&>pre]:!p-4 [&_.line]:inline-block" v-html="code" />
</template>
