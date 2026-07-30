<script setup lang="ts">
const appConfig = useAppConfig()
const { headerLightUrl, headerDarkUrl } = useLogoAssets()
</script>

<template>
  <div class="flex items-center gap-2">
    <UColorModeImage
      :light="headerLightUrl"
      :dark="headerDarkUrl"
      :alt="appConfig.header?.logo?.alt || appConfig.header?.title"
      class="h-8 w-auto shrink-0"
    />
    <span class="font-bold text-xl">
      {{ appConfig.header?.title }}
    </span>
    <UBadge variant="subtle" size="sm">
      Beta
    </UBadge>
  </div>
</template>
