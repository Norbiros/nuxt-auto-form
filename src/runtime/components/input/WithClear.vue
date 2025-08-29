<script setup lang="ts">
import UButton from '@nuxt/ui/components/Button.vue'
import UInput from '@nuxt/ui/components/Input.vue'

const modelValue = defineModel<string>({ default: '' })
</script>

<template>
  <UInput
    v-model="modelValue"
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
