<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

// Override of docus' DocsAsideLeftBody.vue.
//
// Nuxt UI's UContentNavigation resolves each leaf link's active state via ULink,
// which defaults to non-exact (ancestor/prefix) route matching. A section's index
// page (e.g. /getting-started) is a path-prefix of its sibling pages
// (e.g. /getting-started/usage), so both end up highlighted as active at once.
// ULink reads its `exact` prop from the navigation item itself (unknown keys are
// forwarded as-is), so setting `exact: true` on every item restores the expected
// "only the current page is active" behaviour without touching Nuxt UI/docus.
function withExactMatch(items: ContentNavigationItem[]): ContentNavigationItem[] {
  return items.map(item => ({
    ...item,
    exact: true,
    children: item.children ? withExactMatch(item.children) : item.children,
  }))
}

const { sidebarNavigation } = useSubNavigation()
const navigation = computed(() => withExactMatch(sidebarNavigation.value))

const contentNavVariants = useUIConfig('contentNavigation')
</script>

<template>
  <UContentNavigation
    :collapsible="false"
    :highlight="contentNavVariants.highlight ?? true"
    :highlight-color="contentNavVariants.highlightColor"
    :variant="contentNavVariants.variant ?? 'link'"
    :color="contentNavVariants.color"
    :navigation="navigation"
  />
</template>
