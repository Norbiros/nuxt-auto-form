<script setup lang="ts">
import { onUnmounted, ref } from 'vue'

const emit = defineEmits<{ activated: [] }>()

const dots = [
  { color: 'red', class: 'bg-red-500/80 hover:bg-red-500' },
  { color: 'yellow', class: 'bg-yellow-500/80 hover:bg-yellow-500' },
  { color: 'green', class: 'bg-green-500/80 hover:bg-green-500' },
]

const secretSequence = ['red', 'yellow', 'green', 'red', 'yellow', 'green']
const clickSequence = ref<string[]>([])
let resetTimer: ReturnType<typeof setTimeout> | null = null

function press(color: string) {
  if (resetTimer) {
    clearTimeout(resetTimer)
  }

  clickSequence.value.push(color)

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

  if (clickSequence.value.length === secretSequence.length) {
    // eslint-disable-next-line no-console
    console.log('🎉 EASTER EGG ACTIVATED!')
    clickSequence.value = []
    emit('activated')
    return
  }

  resetTimer = setTimeout(() => {
    clickSequence.value = []
  }, 2000)
}

onUnmounted(() => {
  if (resetTimer) {
    clearTimeout(resetTimer)
  }
})
</script>

<template>
  <div class="flex gap-1.5">
    <button
      v-for="dot in dots"
      :key="dot.color"
      type="button"
      class="size-3 cursor-pointer rounded-full transition-colors"
      :class="dot.class"
      :aria-label="`${dot.color} dot`"
      @mousedown="press(dot.color)"
    />
  </div>
</template>
