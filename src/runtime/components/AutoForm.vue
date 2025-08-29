<script setup lang="ts" generic="T extends z.ZodObject<any>">
import type { FormSubmitEvent, InferInput, InferOutput } from '@nuxt/ui'
import type * as z from 'zod'
import type { AutoFormConfig } from '../types'
import { useAppConfig } from '#app'
import UButton from '@nuxt/ui/components/Button.vue'
import UForm from '@nuxt/ui/components/Form.vue'
import UFormField from '@nuxt/ui/components/FormField.vue'

import defu from 'defu'
import { splitByCase, upperFirst } from 'scule'
import { computed, reactive, ref, toRaw, useTemplateRef } from 'vue'
import { COMPONENTS_MAP, mapZodTypeToComponent } from '../components_map'

const props = withDefaults(defineProps<{
  schema: T
  initialState?: Partial<InferInput<T>>
  config?: AutoFormConfig
}>(), {
  initialState: () => ({}),
})

const emit = defineEmits<{
  (e: 'submit', data: InferOutput<T>): void
}>()

const state = reactive({ ...props.initialState })

defineExpose({ submit })

const formRef = useTemplateRef('form')
const loading = ref(false)
const shape = (props.schema as z.ZodObject<any>).shape

const isButtonDisabled = computed(() => !props.schema.safeParse(state).success)

const defaults: Partial<AutoFormConfig> = {
  components: COMPONENTS_MAP,
}

const appConfig = computed<AutoFormConfig>(() => {
  return defu(props.config, useAppConfig().autoForm, defaults)
})

const fields = Object.entries(shape).map(([key, zodType]: [string, any]) => {
  const result = mapZodTypeToComponent(key, zodType, appConfig.value, state)
  if (!result)
    return null

  const meta = typeof zodType.meta === 'function' ? zodType.meta() || {} : {}

  return {
    key,
    formField: {
      name: key,
      ...parseMeta(meta, key),
    },
    component: meta?.input?.component ?? result.component,
    props: defu(meta?.input?.props, result.componentProps ?? {}),
  }
}).filter((field): field is NonNullable<typeof field> => field != null)

function parseMeta(meta: any, key: string) {
  return {
    label: meta.title ?? upperFirst(splitByCase(key).join(' ').toLowerCase()),
    required: meta.required,
    description: meta.description,
    hint: meta.hint,
    help: meta.help,
    class: meta.autoForm?.floatRight ? 'flex items-center justify-between text-left' : '',
  }
}

async function onSubmit(event: FormSubmitEvent<InferOutput<T>>) {
  event.preventDefault()
  loading.value = true
  try {
    emit('submit', toRaw(event.data))
  }
  finally {
    loading.value = false
  }
}

function submit() {
  formRef.value?.submit()
}

const submitButtonComponent = computed(() => {
  return appConfig.value?.submit?.component
})

const submitButtonProps = computed(() => {
  return {
    ...appConfig.value?.submit?.props,
    disabled: isButtonDisabled.value,
  }
})
</script>

<template>
  <UForm
    ref="form"
    :schema="schema"
    :state="(state as any)"
    class="space-y-4"
    @submit="onSubmit"
  >
    <slot name="before-fields" />

    <UFormField
      v-for="field in fields"
      :key="field.key"
      :ui="{ description: 'text-left' }"
      v-bind="field.formField"
    >
      <slot
        :name="field.key"
        :field="field.key"
        :state="(state as Record<string, any>)"
      >
        <component
          :is="field.component"
          v-bind="field.props"
          v-model="(state as Record<string, any>)[field.key]"
        >
          <slot :name="`${field.key}-content`" />
        </component>
      </slot>
    </UFormField>

    <slot name="after-fields" />

    <slot name="submit" :disabled="isButtonDisabled">
      <template v-if="submitButtonComponent">
        <component :is="toRaw(submitButtonComponent)" v-bind="submitButtonProps" />
      </template>
      <UButton
        v-else
        type="submit"
        label="Send"
        v-bind="submitButtonProps"
      />
    </slot>
  </UForm>
</template>
