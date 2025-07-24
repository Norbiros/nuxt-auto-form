<script setup lang="ts">
defineProps<{
  disabled?: boolean
}>()
</script>

<template>
  <UButton
    type="submit"
    color="neutral"
    :disabled
    class="w-full flex justify-center cursor-pointer"
    label="My custom send button"
  />
</template>
