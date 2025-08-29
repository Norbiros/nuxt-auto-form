import { defineNuxtPlugin } from '#app'
import { UInput } from '#components'

export default defineNuxtPlugin((_) => {
  updateAppConfig(
    {
      autoForm: {
        components: {
          email: () => ({ component: UInput, componentProps: { type: 'email', trailingIcon: 'i-lucide-at-sign' } }),
        },
      },
    },
  )
})
