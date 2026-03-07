import type { ComputedRef } from 'vue'
import type { AutoFormConfig } from '../types'
import { getCurrentInstance } from 'vue'

export interface MetaStringProcessorContext {
  key: string
  path: string
  meta: Record<string, any>
  config: AutoFormConfig
}

export type MetaStringProcessor = (value: string, context: MetaStringProcessorContext) => any
export type MetaStringProcessors = Record<string, MetaStringProcessor>

const PREFIX_PATTERN = /^\$[\w-]+:/

export function createMetaStringProcessors(
  config: AutoFormConfig,
  builtinProcessors: MetaStringProcessors = {},
): MetaStringProcessors {
  return {
    ...normalizeMetaStringProcessors(builtinProcessors),
    ...normalizeMetaStringProcessors(config?.metaStringProcessors ?? {}),
  }
}

export function processMetaStrings<T>(
  value: T,
  options: {
    key: string
    meta: Record<string, any>
    config: AutoFormConfig
    processors: MetaStringProcessors
    warn?: (message: string) => void
    warnedPrefixes?: Set<string>
    path?: string
  },
): T {
  const processorKeys = Object.keys(options.processors)
    .sort((a, b) => b.length - a.length)
  const warnedPrefixes = options.warnedPrefixes ?? new Set<string>()

  function findProcessorPrefix(text: string) {
    return processorKeys.find(prefix => text.startsWith(prefix))
  }

  function warnMissingPrefix(prefix: string, path: string) {
    if (!options.warn || warnedPrefixes.has(prefix))
      return
    warnedPrefixes.add(prefix)
    options.warn(`[@norbiros/nuxt-auto-form] No meta string processor registered for prefix "${prefix}" (field: "${options.key}", path: "${path}").`)
  }

  function processValue(current: any, path: string): any {
    if (typeof current === 'string') {
      const matchedPrefix = findProcessorPrefix(current)
      if (matchedPrefix) {
        const processor = options.processors[matchedPrefix]
        if (processor) {
          return processor(current.slice(matchedPrefix.length), {
            key: options.key,
            path,
            meta: options.meta,
            config: options.config,
          })
        }
      }

      const prefixMatch = current.match(PREFIX_PATTERN)
      if (prefixMatch)
        warnMissingPrefix(prefixMatch[0], path)

      return current
    }

    if (Array.isArray(current))
      return current.map((item, index) => processValue(item, `${path}[${index}]`))

    if (isPlainObject(current)) {
      const result: Record<string, any> = {}
      for (const [key, value] of Object.entries(current))
        result[key] = processValue(value, path ? `${path}.${key}` : key)
      return result
    }

    return current
  }

  return processValue(value, options.path ?? '') as T
}

export function useMetaProcessor(
  appConfig: ComputedRef<AutoFormConfig>,
) {
  const warnedPrefixes = new Set<string>()

  function processFieldMeta(rawMeta: Record<string, any>, key: string): Record<string, any> {
    const processors = createMetaStringProcessors(appConfig.value, resolveDefaultMetaStringProcessors())

    if (Object.keys(processors).length === 0)
      return rawMeta

    return processMetaStrings(rawMeta, {
      key,
      meta: rawMeta,
      config: appConfig.value,
      processors,
      warn: msg => console.warn(msg),
      warnedPrefixes,
    })
  }

  return { processFieldMeta }
}

function normalizeMetaStringProcessors(processors: Record<string, MetaStringProcessor>): MetaStringProcessors {
  const normalized: MetaStringProcessors = {}

  for (const [key, processor] of Object.entries(processors)) {
    const normalizedKey = key.startsWith('$') && key.endsWith(':') ? key : `$${key}:`
    normalized[normalizedKey] = processor
  }

  return normalized
}

function resolveDefaultMetaStringProcessors(): MetaStringProcessors {
  const globalProperties = getCurrentInstance()?.appContext.config.globalProperties as {
    $i18n?: {
      t?: (key: string) => string
    }
    $t?: (key: string) => string
  } | undefined

  const translate = typeof globalProperties?.$i18n?.t === 'function'
    ? globalProperties.$i18n.t.bind(globalProperties.$i18n)
    : typeof globalProperties?.$t === 'function'
      ? globalProperties.$t.bind(globalProperties)
      : undefined

  if (!translate)
    return {}

  return {
    i18n: value => translate(value),
  }
}

function isPlainObject(value: unknown): value is Record<string, any> {
  if (typeof value !== 'object' || value === null)
    return false
  const proto = Object.getPrototypeOf(value)
  return proto === Object.prototype || proto === null
}
