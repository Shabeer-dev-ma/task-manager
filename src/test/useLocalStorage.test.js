import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import useLocalStorage from '../hooks/useLocalStorage'

const localStorageMock = (() => {
  let store = {}
  return {
    getItem: (key) => store[key] ?? null,
    setItem: (key, value) => { store[key] = String(value) },
    clear: () => { store = {} },
  }
})()

vi.stubGlobal('localStorage', localStorageMock)

describe('useLocalStorage', () => {
  beforeEach(() => localStorageMock.clear())

  it('returns the initial value when nothing is stored', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 42))
    expect(result.current[0]).toBe(42)
  })

  it('persists value to localStorage on update', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 0))
    act(() => result.current[1](99))
    expect(JSON.parse(localStorageMock.getItem('test-key'))).toBe(99)
  })

  it('reads existing value from localStorage', () => {
    localStorageMock.setItem('test-key', JSON.stringify('hello'))
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'))
    expect(result.current[0]).toBe('hello')
  })
})
