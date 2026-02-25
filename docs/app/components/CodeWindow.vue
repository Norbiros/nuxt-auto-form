<script setup lang="ts">
defineProps<{
  showDots?: boolean
  noPadding?: boolean
}>()
</script>

<template>
  <div class="border border-default rounded-xl overflow-hidden bg-elevated">
    <div v-if="showDots" class="border-b border-default bg-muted px-4 py-3">
      <div class="flex gap-1.5">
        <div class="w-3 h-3 rounded-full bg-red-500/80" />
        <div class="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div class="w-3 h-3 rounded-full bg-green-500/80" />
      </div>
    </div>
    <div :class="{ 'p-8': !noPadding }">
      <slot />
    </div>
  </div>
</template>
