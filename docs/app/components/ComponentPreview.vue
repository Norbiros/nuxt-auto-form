<script setup lang="ts">
import { codeToHtml } from 'shiki'
import { ref } from 'vue'

const props = defineProps<{ name: string }>()

const highlightedCode = ref('')

const modules = import.meta.glob('../components/examples/*.vue', { eager: true })
const componentModule = modules[`./examples/${props.name}.vue`] as any

const rawModules = import.meta.glob('../components/examples/*.vue', {
  eager: true,
  as: 'raw',
})
const sourceCode = rawModules[`./examples/${props.name}.vue`]

highlightedCode.value = await codeToHtml(sourceCode!, { lang: 'vue', theme: 'material-theme-palenight' })
</script>

<template>
  <div class="flex flex-col md:flex-row p-4 rounded-lg shadow-lg">
    <ProseCode class="p-5">
      <div class="[&>pre]:bg-transparent! [&_.line]:inline-block!" v-html="highlightedCode" />
    </ProseCode>
    <div class="flex-1 p-4 bg-muted">
      <component :is="componentModule?.default" />
    </div>
  </div>
</template>
