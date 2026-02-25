<script setup lang="ts">
import { codeToHtml } from 'shiki'
import { computed, onUnmounted, ref, watch } from 'vue'

const props = defineProps<{ name: string }>()

const colorMode = useColorMode()
const selectedTab = ref('0')
const highlightedCode = ref('')
const easterEggActive = ref(false)
const clickSequence = ref<string[]>([])
let resetTimer: ReturnType<typeof setTimeout> | null = null

const isDark = computed(() => colorMode.value === 'dark')

async function updateHighlightedCode() {
  const modules = import.meta.glob('../components/examples/*.vue', { eager: true, as: 'raw' })
  const sourceCode = modules[`./examples/${props.name}.vue`] as string
  highlightedCode.value = await codeToHtml(sourceCode, { lang: 'vue', theme: isDark.value ? 'material-theme-palenight' : 'github-light' })
}

watch(isDark, updateHighlightedCode)

const secretSequence = ['red', 'yellow', 'green', 'red', 'yellow', 'green']

function handleButtonClick(color: string) {
  if (resetTimer)
    clearTimeout(resetTimer)

  clickSequence.value.push(color)

  if (clickSequence.value.length > secretSequence.length) {
    clickSequence.value.shift()
  }

  const currentIndex = clickSequence.value.length - 1
  if (clickSequence.value[currentIndex] !== secretSequence[currentIndex]) {
    // eslint-disable-next-line no-console
    console.log(`Oh you broke it! Expected ${secretSequence[currentIndex]} but got ${color}. Starting over...`)
    clickSequence.value = [color]
  }
  else {
    // eslint-disable-next-line no-console
    console.log(`Warmer.. Warmer.. Warmer... (${clickSequence.value.join(' → ')})`)
  }

  if (JSON.stringify(clickSequence.value) === JSON.stringify(secretSequence)) {
    // eslint-disable-next-line no-console
    console.log('🎉 EASTER EGG ACTIVATED!')
    easterEggActive.value = true
    clickSequence.value = []
    setTimeout(() => {
      easterEggActive.value = false
    }, 3000)
    return
  }

  resetTimer = setTimeout(() => {
    clickSequence.value = []
  }, 2000)
}

onUnmounted(() => {
  if (resetTimer)
    clearTimeout(resetTimer)
})

const modules = import.meta.glob('../components/examples/*.vue', { eager: true })
const componentModule = modules[`./examples/${props.name}.vue`] as any

updateHighlightedCode()

const tabs = [
  { label: 'Preview', icon: 'i-lucide-eye', key: 'preview' },
  { label: 'Code', icon: 'i-lucide-code', key: 'code' },
]
</script>

<template>
  <div
    class="rounded-xl overflow-hidden bg-elevated backdrop-blur transition-all duration-300"
    :class="easterEggActive ? 'rainbow-border animate-wiggle' : 'border border-default'"
  >
    <div class="border-b border-default bg-muted">
      <div class="flex items-center justify-between px-4 py-3">
        <div class="flex gap-1.5">
          <button
            class="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer"
            @mousedown="handleButtonClick('red')"
          />
          <button
            class="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer"
            @mousedown="handleButtonClick('yellow')"
          />
          <button
            class="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors cursor-pointer"
            @mousedown="handleButtonClick('green')"
          />
        </div>

        <UTabs
          v-model="selectedTab"
          variant="pill"
          :items="tabs"
          :content="false"
          class="gap-1"
        />

        <div class="w-[52px]" />
      </div>
    </div>

    <Transition name="fade" mode="out-in">
      <div v-if="selectedTab === '0'" key="preview" class="p-8 min-h-[300px] flex items-center justify-center" :class="isDark ? 'bg-gradient-to-br from-muted/30 to-elevated/30' : ''">
        <div class="w-full max-w-md">
          <component :is="componentModule?.default" />
        </div>
      </div>

      <div v-else key="code" class="overflow-auto max-h-[500px] bg-elevated">
        <CodeBlock :code="highlightedCode" />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.rainbow-border {
  border: 2px solid;
  animation: rainbow 0.5s linear infinite;
  box-shadow: 0 0 20px rgba(255, 100, 100, 0.5);
}

@keyframes rainbow {
  0% { border-color: #ff0000; box-shadow: 0 0 20px #ff0000; }
  14% { border-color: #ff7f00; box-shadow: 0 0 20px #ff7f00; }
  28% { border-color: #ffff00; box-shadow: 0 0 20px #ffff00; }
  42% { border-color: #00ff00; box-shadow: 0 0 20px #00ff00; }
  57% { border-color: #0000ff; box-shadow: 0 0 20px #0000ff; }
  71% { border-color: #4b0082; box-shadow: 0 0 20px #4b0082; }
  85% { border-color: #8f00ff; box-shadow: 0 0 20px #8f0082; }
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
