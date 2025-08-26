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
  </AutoForm>
</template>
