<script setup lang="ts">
const modelValue = defineModel<string>({ default: 'Click to clear' })
</script>

<template>
  <UInput
    v-model="modelValue"
    placeholder="Type something..."
    :ui="{ trailing: 'pe-1' }"
  >
    <template v-if="modelValue?.length" #trailing>
      <UButton
        color="neutral"
        variant="link"
        size="sm"
        icon="i-lucide-circle-x"
        aria-label="Clear input"
        @click="modelValue = ''"
      />
    </template>
  </UInput>
</template>
