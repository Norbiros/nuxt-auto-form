<template>
  <UPageHero orientation="horizontal" :ui="{ container: 'lg:py-30' }">
    <template #title>
      Nuxt Auto Form
    </template>
    <template #description>
      Build forms faster with tools you already know and love.
      Generate fully customizable Nuxt UI forms straight from your Zod schemas.
    </template>
    <template #links>
      <UButton size="xl" to="/getting-started" trailing-icon="i-lucide-arrow-right">
        Get started
      </UButton>
      <UButton size="xl" to="https://github.com/Norbiros/nuxt-auto-form" variant="subtle" trailing-icon="i-simple-icons-github" target="_blank" color="neutral">
        View source code
      </UButton>
    </template>

    <ComponentPreview name="LandingSimple" class="leading-0" />
  </UPageHero>
</template>
