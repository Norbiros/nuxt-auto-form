<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()

useHead({
  htmlAttrs: {
    lang: 'en',
  },
})

useSeoMeta({
  title: 'Page not found',
  description: 'We are sorry but this page could not be found.',
})

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('docs'))
const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('docs'), {
  server: false,
})

provide('navigation', navigation)
</script>

<template>
  <UApp>
    <AppHeader />

    <UError :error="error" class="min-h-[75vh]" />

    <div class="text-center py-8 text-neutral-500 text-sm">
      <p class="opacity-60 hover:opacity-100 transition-opacity cursor-default">
        PSST... try clicking the traffic lights on top of component preview: 🔴 🟡 🟢 🔴 🟡 🟢
      </p>
    </div>

    <AppFooter />

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
      />
    </ClientOnly>
  </UApp>
</template>
