<script setup lang="ts">
const { footer } = useAppConfig()
</script>

<template>
  <UFooter>
    <template #left>
      <div class="text-sm">
        Made with 💚 by
        <ULink href="https://github.com/Norbiros/nuxt-auto-form" class="text-primary-500 font-bold" target="_blank">
          Norbiros
        </Ulink>
        {{ footer.credits }}
      </div>
    </template>

    <template #right>
      <UColorModeButton v-if="footer?.colorMode" />

      <template v-if="footer?.links">
        <UButton
          v-for="(link, index) of footer?.links"
          :key="index"
          v-bind="{ color: 'neutral', variant: 'ghost', ...link }"
        />
      </template>
    </template>
  </UFooter>
</template>
