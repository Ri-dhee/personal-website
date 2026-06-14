import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { TouchDeviceProvider } from '../hooks/TouchDeviceProvider'
import { useIsTouchDevice } from '../hooks/useIsTouchDevice'

function setTouchEnv(opts: { ontouchstart?: unknown; maxTouchPoints?: number }) {
  try {
    delete (window as unknown as { ontouchstart?: unknown }).ontouchstart
  } catch {
    // ignore
  }
  if (opts.ontouchstart !== undefined) {
    try {
      Object.defineProperty(window, 'ontouchstart', {
        value: opts.ontouchstart,
        configurable: true,
        writable: true,
      })
    } catch {
      // ignore
    }
  }
  Object.defineProperty(navigator, 'maxTouchPoints', {
    value: opts.maxTouchPoints ?? 0,
    configurable: true,
  })
}

describe('TouchDeviceProvider / useIsTouchDevice', () => {
  it('returns false when neither touch signal is present', () => {
    setTouchEnv({ ontouchstart: undefined, maxTouchPoints: 0 })
    const { result } = renderHook(() => useIsTouchDevice(), { wrapper: TouchDeviceProvider })
    act(() => {})
    expect(result.current).toBe(false)
  })

  it('returns true when ontouchstart is present', () => {
    setTouchEnv({ ontouchstart: () => {}, maxTouchPoints: 0 })
    const { result } = renderHook(() => useIsTouchDevice(), { wrapper: TouchDeviceProvider })
    act(() => {})
    expect(result.current).toBe(true)
  })

  it('returns true when maxTouchPoints > 0', () => {
    setTouchEnv({ ontouchstart: undefined, maxTouchPoints: 5 })
    const { result } = renderHook(() => useIsTouchDevice(), { wrapper: TouchDeviceProvider })
    act(() => {})
    expect(result.current).toBe(true)
  })
})
