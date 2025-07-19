import antfu from '@antfu/eslint-config'

export default antfu({
  features: {
    // Rules for module authors
    tooling: true,
    // Rules for formatting
    stylistic: true,
  },
})
