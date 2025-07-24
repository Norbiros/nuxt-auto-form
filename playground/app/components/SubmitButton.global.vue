<script setup lang="ts">
defineProps({
  isButtonEnabled: Boolean,
})
</script>

<template>
  <UButton
    type="submit"
    color="neutral"
    :disabled="!isButtonEnabled"
    class="w-full flex justify-center cursor-pointer"
    :class="isButtonEnabled ? 'bg-primary' : ''"
    label="My custom send button"
  />
</template>
