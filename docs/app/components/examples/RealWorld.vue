<script setup lang="ts">
import * as z from 'zod'

const REFERRAL_SOURCES = [
  'Linkedin',
  'Facebook',
  'Instagram',
  'Friend',
  'Internet',
  'Other',
]

enum Age {
  '10-13' = 10,
  '14-16' = 14,
  '16-18' = 16,
  '19-22' = 19,
  '23+' = 23,
}

const ageKeys = Object.keys(Age).filter(key => Number.isNaN(Number(key)))

const schema = z.object({
  first_name: z.string()
    .nonempty({ error: 'First name is required' })
    .meta({ title: 'First Name' }),
  age: z.enum(ageKeys, { message: 'Age is required' })
    .meta({ title: 'Age' }),
  location: z.string({ error: 'Location is required' })
    .meta({ title: 'Location', description: 'City or town where you live' }),
  organization: z.string({ error: 'Organization is required' })
    .meta({ title: 'Organization', description: 'Your school, university, or company' }),
  is_vegetarian: z.boolean({ error: 'Selection is required' })
    .meta({ title: 'Dietary preferences' }),
  marketing_consent: z.boolean()
    .meta({
      title: 'Do you want to receive information about future Hack4Krak events?',
      theme: { floatRight: true },
    }),
  referral_source: z
    .array(z.enum(REFERRAL_SOURCES))
    .min(1, 'Please select at least one referral source.')
    .meta({ title: 'How did you hear about us? (multiple choice)' }),
})

// Normally you could use `.default()` in the schema, but sometimes you need
// to fill the initial state from an external source, like an API call.
const state = {
  age: 10,
}

async function onSubmit(_data: z.infer<typeof schema>) {
  // Send data to the server
  // BTW I suggest using nuxt-auto-form for that
  //
  // await useNuxtApp().$auth('/account/submit_personal_information', {
  //   method: 'POST',
  //   body: data
  // })

  useToast().add({ title: 'Success', description: 'Data successfully submitted', color: 'success' })

  await refreshNuxtData()
  navigateTo('/panel')
}
</script>

<template>
  <div class="">
    <h1 class="text-2xl font-medium mb-2">
      Provide additional information
    </h1>

    <div class="text-sm mb-4 space-y-3">
      <p>
        Before you start using the site, please provide additional account information.
      </p>
      <p>
        The information you provide here will only be visible to the event organizers and is required for the event to run smoothly.
      </p>
    </div>

    <AutoForm :schema="schema" :initial-state="state" @submit="onSubmit">
      <template #is_vegetarian="{ field, state: stateValue }">
        <USelect
          v-model="stateValue[field]"
          :items="[
            {
              label: 'Meat diet',
              value: false,
            },
            {
              label: 'Vegan/vegetarian diet',
              value: true,
            },
          ]"
        />
      </template>
    </AutoForm>
  </div>
</template>
