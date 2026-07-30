<script setup lang="ts">
const withAutoForm = `<script setup lang="ts">
import * as z from 'zod'

const schema = z.object({
  email: z.email(),
  password: z.string().min(8),
})

function onSubmit(data: z.infer<typeof schema>) {
  console.log(data)
}
<\/script>

<template>
  <AutoForm :schema="schema" @submit="onSubmit" />
</template>`

const withoutAutoForm = `<script setup lang="ts">
import * as z from 'zod'

const schema = z.object({
  email: z.email(),
  password: z.string().min(8),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
})

function onSubmit(data: Schema) {
  console.log(data)
}
<\/script>

<template>
  <UForm :schema="schema" :state="state" @submit="onSubmit">
    <UFormField label="Email" name="email">
      <UInput v-model="state.email" type="email" />
    </UFormField>
    <UFormField label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormField>
    <UButton type="submit">Submit</UButton>
  </UForm>
</template>`

function lineCount(code: string) {
  return code.trim().split('\n').length
}
</script>

<template>
  <div class="w-full space-y-10 py-4">
    <div class="space-y-3 text-center">
      <h2 class="text-3xl font-bold sm:text-4xl flex items-center justify-center gap-2">
        Write 50-60% less code
        <UTooltip text="Calculated based on real-world PRs" :ui="{ content: 'h-12' }">
          <UIcon name="i-lucide-info" class="w-4 h-4 text-muted cursor-help" />

          <template #content>
            <div class="space-y-1">
              <p>Based on code reductions from:</p>
              <ULink to="https://github.com/Hack4Krak/Hack4KrakSite/pull/694" target="_blank">
                Hack4KrakSite#694
              </ULink>
              <ULink to="https://github.com/Hack4Krak/Hack4KrakSite/pull/637" target="_blank">
                Hack4KrakSite#637
              </ULink>
            </div>
          </template>
        </UTooltip>
      </h2>
      <p class="mx-auto max-w-2xl text-lg text-muted">
        AutoForm generates all the boilerplate for you. <br> Focus on your schema, not repetitive form code.
      </p>
    </div>

    <div class="grid gap-6 lg:grid-cols-2">
      <div class="min-w-0 space-y-3">
        <div class="flex items-center justify-between gap-4">
          <h3 class="font-semibold text-highlighted flex items-center gap-2">
            <span class="text-green-500">✓</span>
            With Nuxt Auto Form
          </h3>
          <UBadge color="success" variant="subtle" size="lg">
            {{ lineCount(withAutoForm) }} lines
          </UBadge>
        </div>
        <CodeSnippet :code="withAutoForm" class="text-left [&>div]:my-0 [&_pre]:max-h-120 [&_pre]:overflow-y-auto" />
      </div>

      <div class="min-w-0 space-y-3 opacity-70">
        <div class="flex items-center justify-between gap-4">
          <h3 class="font-semibold text-highlighted flex items-center gap-2">
            <span class="text-red-500">✗</span>
            Without Nuxt Auto Form
          </h3>
          <UBadge color="error" variant="subtle" size="lg">
            {{ lineCount(withoutAutoForm) }} lines
          </UBadge>
        </div>
        <CodeSnippet :code="withoutAutoForm" class="text-left [&>div]:my-0 [&_pre]:max-h-120 [&_pre]:overflow-y-auto" />
      </div>
    </div>
  </div>
</template>
