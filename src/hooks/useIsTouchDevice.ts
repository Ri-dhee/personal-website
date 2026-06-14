import { useContext } from 'react'
import { TouchDeviceContext } from './touchDeviceContext'

export function useIsTouchDevice(): boolean {
  return useContext(TouchDeviceContext)
}
