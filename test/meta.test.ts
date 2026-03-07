import type { AutoFormConfig } from '../src/runtime/types'
import { describe, expect, it, vi } from 'vitest'
import { createMetaStringProcessors, processMetaStrings } from '../src/runtime/utils/useMetaProcessor'

describe('createMetaStringProcessors', () => {
  it('should merge builtin processors with config processors', () => {
    const builtin = {
      i18n: vi.fn((value: string) => `translated:${value}`),
    }
    const processors = createMetaStringProcessors({}, builtin)

    expect(processors['$i18n:']).toBeDefined()
    expect(typeof processors['$i18n:']).toBe('function')
    expect(processors['$i18n:']('some.key', { key: 'f', path: '', meta: {}, config: {} })).toBe('translated:some.key')
  })

  it('should merge custom processors from config', () => {
    const customProcessor = vi.fn()
    const config: AutoFormConfig = {
      metaStringProcessors: {
        '$custom:': customProcessor,
      },
    }
    const processors = createMetaStringProcessors(config)
    expect(processors['$custom:']).toBe(customProcessor)
  })

  it('should let config override builtin processors', () => {
    const customI18n = vi.fn(() => 'custom')
    const config: AutoFormConfig = {
      metaStringProcessors: {
        '$i18n:': customI18n,
      },
    }
    const processors = createMetaStringProcessors(config, {
      i18n: () => 'builtin',
    })

    expect(processors['$i18n:']).toBe(customI18n)
  })

  it('should normalize builtin processors to prefixed keys', () => {
    const processors = createMetaStringProcessors({}, {
      upper: value => value.toUpperCase(),
    })

    expect(processors['$upper:']).toBeDefined()
    expect(processors['$upper:']('hello', { key: 'f', path: '', meta: {}, config: {} })).toBe('HELLO')
  })
})

describe('processMetaStrings', () => {
  const mockConfig: AutoFormConfig = {}

  it('should process simple string with matching prefix', () => {
    const mockT = vi.fn(val => `translated:${val}`)
    const processors = {
      '$i18n:': (value: string) => mockT(value),
    }

    const result = processMetaStrings('$i18n:common.label', {
      key: 'testField',
      meta: {},
      config: mockConfig,
      processors,
    })

    expect(result).toBe('translated:common.label')
    expect(mockT).toHaveBeenCalledWith('common.label')
  })

  it('should not process strings without matching prefix', () => {
    const processors = {
      '$i18n:': vi.fn(),
    }

    const result = processMetaStrings('plain text', {
      key: 'testField',
      meta: {},
      config: mockConfig,
      processors,
    })

    expect(result).toBe('plain text')
    expect(processors['$i18n:']).not.toHaveBeenCalled()
  })

  it('should process nested objects', () => {
    const mockT = vi.fn(val => `t:${val}`)
    const processors = {
      '$i18n:': (value: string) => mockT(value),
    }

    const input = {
      label: '$i18n:field.label',
      description: '$i18n:field.description',
      nested: {
        placeholder: '$i18n:field.placeholder',
      },
    }

    const result = processMetaStrings(input, {
      key: 'testField',
      meta: {},
      config: mockConfig,
      processors,
    })

    expect(result).toEqual({
      label: 't:field.label',
      description: 't:field.description',
      nested: {
        placeholder: 't:field.placeholder',
      },
    })
  })

  it('should process arrays', () => {
    const mockT = vi.fn(val => `t:${val}`)
    const processors = {
      '$i18n:': (value: string) => mockT(value),
    }

    const input = ['$i18n:item1', 'plain', '$i18n:item3']

    const result = processMetaStrings(input, {
      key: 'testField',
      meta: {},
      config: mockConfig,
      processors,
    })

    expect(result).toEqual(['t:item1', 'plain', 't:item3'])
  })

  it('should handle arrays within objects', () => {
    const mockT = vi.fn(val => `t:${val}`)
    const processors = {
      '$i18n:': (value: string) => mockT(value),
    }

    const input = {
      options: [
        { label: '$i18n:opt.one', value: '1' },
        { label: '$i18n:opt.two', value: '2' },
      ],
    }

    const result = processMetaStrings(input, {
      key: 'testField',
      meta: {},
      config: mockConfig,
      processors,
    })

    expect(result).toEqual({
      options: [
        { label: 't:opt.one', value: '1' },
        { label: 't:opt.two', value: '2' },
      ],
    })
  })

  it('should prioritize longer prefixes when multiple prefixes overlap', () => {
    const shortProcessor = vi.fn(() => 'short')
    const longProcessor = vi.fn(() => 'long')

    const processors = {
      '$i18n:': shortProcessor,
      '$i18n:custom:': longProcessor,
    }

    const result = processMetaStrings('$i18n:custom:key', {
      key: 'testField',
      meta: {},
      config: mockConfig,
      processors,
    })

    expect(result).toBe('long')
    expect(longProcessor).toHaveBeenCalledWith('key', expect.any(Object))
    expect(shortProcessor).not.toHaveBeenCalled()
  })

  it('should warn for unknown prefix pattern once', () => {
    const warnSpy = vi.fn()
    const processors = {}
    const warnedPrefixes = new Set<string>()

    processMetaStrings('$unknown:key1', {
      key: 'field1',
      meta: {},
      config: mockConfig,
      processors,
      warn: warnSpy,
      warnedPrefixes,
    })

    processMetaStrings('$unknown:key2', {
      key: 'field2',
      meta: {},
      config: mockConfig,
      processors,
      warn: warnSpy,
      warnedPrefixes,
    })

    expect(warnSpy).toHaveBeenCalledTimes(1)
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('No meta string processor registered for prefix "$unknown:"'),
    )
  })

  it('should not warn for plain text without prefix pattern', () => {
    const warnSpy = vi.fn()
    const processors = {}

    processMetaStrings('plain text', {
      key: 'field1',
      meta: {},
      config: mockConfig,
      processors,
      warn: warnSpy,
    })

    expect(warnSpy).not.toHaveBeenCalled()
  })

  it('should preserve non-string values unchanged', () => {
    const processors = {
      '$i18n:': vi.fn(),
    }

    const input = {
      number: 42,
      boolean: true,
      nullValue: null,
      undefinedValue: undefined,
      date: new Date('2024-01-01'),
    }

    const result = processMetaStrings(input, {
      key: 'testField',
      meta: {},
      config: mockConfig,
      processors,
    })

    expect(result.number).toBe(42)
    expect(result.boolean).toBe(true)
    expect(result.nullValue).toBe(null)
    expect(result.undefinedValue).toBe(undefined)
    expect(result.date).toBeInstanceOf(Date)
  })

  it('should pass correct context to processor', () => {
    const processorSpy = vi.fn()
    const processors = {
      '$i18n:': processorSpy,
    }
    const testMeta = { foo: 'bar' }
    const testConfig: AutoFormConfig = { metaStringProcessors: {} }

    processMetaStrings('$i18n:key', {
      key: 'testField',
      meta: testMeta,
      config: testConfig,
      processors,
      path: 'root.nested',
    })

    expect(processorSpy).toHaveBeenCalledWith('key', {
      key: 'testField',
      path: 'root.nested',
      meta: testMeta,
      config: testConfig,
    })
  })

  it('should build correct path for nested values', () => {
    const processorSpy = vi.fn()
    const processors = {
      '$i18n:': processorSpy,
    }

    processMetaStrings(
      {
        nested: {
          deep: {
            value: '$i18n:key',
          },
        },
      },
      {
        key: 'testField',
        meta: {},
        config: mockConfig,
        processors,
      },
    )

    expect(processorSpy).toHaveBeenCalledWith('key', expect.objectContaining({
      path: 'nested.deep.value',
    }))
  })

  it('should build correct path for array indices', () => {
    const processorSpy = vi.fn()
    const processors = {
      '$i18n:': processorSpy,
    }

    processMetaStrings(
      {
        items: ['$i18n:key1', '$i18n:key2'],
      },
      {
        key: 'testField',
        meta: {},
        config: mockConfig,
        processors,
      },
    )

    expect(processorSpy).toHaveBeenNthCalledWith(1, 'key1', expect.objectContaining({
      path: 'items[0]',
    }))
    expect(processorSpy).toHaveBeenNthCalledWith(2, 'key2', expect.objectContaining({
      path: 'items[1]',
    }))
  })
})
