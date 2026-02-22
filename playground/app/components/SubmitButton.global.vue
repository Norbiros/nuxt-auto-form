<script setup lang="ts">
defineProps<{
  disabled?: boolean
  ariaDisabled?: boolean | string
}>()
</script>

<template>
  <UButton
    type="submit"
    color="neutral"
    :disabled="disabled"
    :aria-disabled="ariaDisabled"
    class="w-full flex justify-center cursor-pointer"
    label="My custom send button"
  />
</template>
