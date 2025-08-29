<script setup lang="ts">
import * as z from 'zod'

const schema = z.object({
  boolean: z.boolean(),
})
</script>

<template>
  <AutoForm :schema="schema">
    <template #boolean="{ field, state: stateValue }">
      <USelect
        v-model="stateValue[field]"
        :items="[
          {
            label: 'False Value',
            value: false,
          },
          {
            label: 'True Value',
            value: true,
          },
        ]"
      />
    </template>

    <template #boolean-description>
      <span class="text-green-500">Green description!</span>
    </template>

    <template #boolean-hint>
      <span class="text-purple-500">Purple hint</span>
    </template>
  </AutoForm>
</template>
