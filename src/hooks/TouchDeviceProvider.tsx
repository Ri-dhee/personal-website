import { useEffect, useState, type ReactNode } from 'react'
import { TouchDeviceContext } from './touchDeviceContext'

export function TouchDeviceProvider({ children }: { children: ReactNode }) {
  const [isTouch, setIsTouch] = useState(false)
  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])
  return <TouchDeviceContext.Provider value={isTouch}>{children}</TouchDeviceContext.Provider>
}
