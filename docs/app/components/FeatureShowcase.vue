<script setup lang="ts">
defineProps<{
  title: string
  description: string
  example: string
  reverse?: boolean
}>()
</script>

<template>
  <div class="grid lg:grid-cols-2 gap-8 items-center" :class="{ 'lg:grid-flow-dense': reverse }">
    <div :class="{ 'lg:col-start-2 lg:justify-self-end lg:max-w-md': reverse }" class="space-y-3">
      <h3 class="text-2xl font-bold">
        {{ title }}
      </h3>
      <p class="text-lg text-muted-foreground">
        {{ description }}
      </p>
    </div>
    <div :class="{ 'lg:col-start-1 lg:row-start-1': reverse }">
      <ComponentPreview :name="example" />
    </div>
  </div>
</template>
