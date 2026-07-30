<script setup lang="ts">
import type { Component } from 'vue'
import { defineAsyncComponent, ref } from 'vue'

const props = defineProps<{ name: string }>()

const components = import.meta.glob<Component>('./examples/*.vue', { import: 'default' })
const sources = import.meta.glob<string>('./examples/*.vue', { query: '?raw', import: 'default' })

const path = `./examples/${props.name}.vue`
const loadExample = components[path]
const example = loadExample ? defineAsyncComponent(loadExample) : undefined

const { data: source } = await useAsyncData(
  `component-preview-${props.name}`,
  () => sources[path]?.() ?? Promise.resolve(''),
)

const tab = ref('preview')
const tabs = [
  { label: 'Preview', icon: 'i-lucide-eye', value: 'preview' },
  { label: 'Code', icon: 'i-lucide-code', value: 'code' },
]

const easterEggActive = ref(false)
function activateEasterEgg() {
  easterEggActive.value = true
  setTimeout(() => {
    easterEggActive.value = false
  }, 3000)
}
</script>

<template>
  <div
    class="not-prose my-6 overflow-hidden rounded-lg bg-default transition-all duration-300"
    :class="easterEggActive ? 'rainbow-border animate-wiggle' : 'border border-default'"
  >
    <div class="flex items-center justify-between border-b border-default bg-muted px-4 py-2">
      <PreviewDots @activated="activateEasterEgg" />

      <UTabs
        v-model="tab"
        :items="tabs"
        :content="false"
        variant="pill"
        size="sm"
      />

      <div class="w-12" aria-hidden="true" />
    </div>

    <!-- The preview panel alone sizes the frame; the code panel overlays it and scrolls,
         so the height stays stable when switching tabs. -->
    <div class="relative">
      <div :class="tab === 'preview' ? '' : 'invisible'" class="flex min-h-72 items-center justify-center bg-muted/30 p-6 sm:p-8">
        <div class="w-full max-w-md">
          <component :is="example" v-if="example" />
          <p v-else class="text-center text-sm text-muted">
            Example "{{ name }}" not found.
          </p>
        </div>
      </div>

      <div :class="tab === 'code' ? '' : 'invisible'" class="absolute inset-0 overflow-y-auto">
        <CodeSnippet
          :code="source ?? ''"
          class="[&>div]:my-0 [&_pre]:rounded-none [&_pre]:border-0"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.rainbow-border {
  border: 2px solid;
  animation: rainbow 0.5s linear infinite;
}

@keyframes rainbow {
  0% { border-color: #ff0000; box-shadow: 0 0 20px #ff0000; }
  14% { border-color: #ff7f00; box-shadow: 0 0 20px #ff7f00; }
  28% { border-color: #ffff00; box-shadow: 0 0 20px #ffff00; }
  42% { border-color: #00ff00; box-shadow: 0 0 20px #00ff00; }
  57% { border-color: #0000ff; box-shadow: 0 0 20px #0000ff; }
  71% { border-color: #4b0082; box-shadow: 0 0 20px #4b0082; }
  85% { border-color: #8f00ff; box-shadow: 0 0 20px #8f00ff; }
  100% { border-color: #ff0000; box-shadow: 0 0 20px #ff0000; }
}

.animate-wiggle {
  animation: wiggle 0.3s ease-in-out infinite, rainbow 0.5s linear infinite;
}

@keyframes wiggle {
  0%, 100% { transform: rotate(-1deg); }
  50% { transform: rotate(1deg); }
}
</style>
