import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  externals: ['@vue/shared', '@vue/reactivity', '@vue/runtime-core'],
})
