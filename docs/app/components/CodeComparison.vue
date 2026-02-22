<script setup lang="ts">
import { codeToHtml } from 'shiki'

const withAutoForm = `<script setup lang="ts">
import * as z from 'zod'

const schema = z.object({
  email: z.string().email(),
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
  email: z.string().email(),
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
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" type="email" />
    </UFormGroup>
    
    <UFormGroup label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormGroup>
    
    <UButton type="submit">Submit</UButton>
  </UForm>
</template>`

const highlightedWith = ref('')
const highlightedWithout = ref('')

highlightedWith.value = await codeToHtml(withAutoForm, {
  lang: 'vue',
  theme: 'material-theme-palenight',
})

highlightedWithout.value = await codeToHtml(withoutAutoForm, {
  lang: 'vue',
  theme: 'material-theme-palenight',
})
</script>

<template>
  <div class="space-y-10 py-4 w-full">
    <div class="text-center space-y-3">
      <h2 class="text-4xl font-bold flex items-center justify-center gap-2 ml-4">
        Write 50-60% less code
        <UTooltip text="Calculated based on real-world PRs" :ui="{ content: 'h-12' }">
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
          <UIcon name="i-lucide-info" class="w-4 h-4 text-muted cursor-help" />
        </UTooltip>
      </h2>
      <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
        AutoForm generates all the boilerplate for you. <br> Focus on your schema, not repetitive form code.
      </p>
    </div>

    <div class="grid lg:grid-cols-2 gap-6">
      <div class="space-y-3 w-full overflow-auto">
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-semibold flex items-center gap-2">
            <span class="text-green-500">✓</span>
            With Nuxt Auto Form
          </h3>
          <UBadge color="success" variant="subtle" size="lg">
            14 lines
          </UBadge>
        </div>
        <CodeWindow show-dots no-padding>
          <CodeBlock :code="highlightedWith" />
        </CodeWindow>
      </div>

      <div class="space-y-3 w-full overflow-auto">
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-semibold flex items-center gap-2">
            <span class="text-red-500">✗</span>
            Without Nuxt Auto Form
          </h3>
          <UBadge color="error" variant="subtle" size="lg">
            33 lines
          </UBadge>
        </div>
        <CodeWindow show-dots no-padding class="opacity-60">
          <CodeBlock :code="highlightedWithout" />
        </CodeWindow>
      </div>
    </div>
  </div>
</template>
