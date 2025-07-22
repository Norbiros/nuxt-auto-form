<script setup lang="ts">
defineProps({
  disabled: Boolean,
})
</script>

<template>
  <UButton
    type="submit"
    color="neutral"
    :disabled="!disabled"
    class="w-full flex justify-center cursor-pointer"
    :class="disabled ? 'bg-primary' : ''"
    label="My custom send button"
  />
</template>
