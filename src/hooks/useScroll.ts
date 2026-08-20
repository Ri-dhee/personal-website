import { useSyncExternalStore } from 'react'

const subscribers = new Set<() => void>()
let scrollY = 0
let progress = 0
let ticking = false
let snap: { y: number; p: number } | null = null

function getSnapshot() {
  if (snap) return snap
  snap = { y: scrollY, p: progress }
  return snap
}

function recompute() {
  scrollY = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0
  snap = null
  subscribers.forEach((cb) => cb())
  ticking = false
}

function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(recompute)
}

let initialized = false
function subscribe(cb: () => void) {
  subscribers.add(cb)
  if (!initialized) {
    initialized = true
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    recompute()
  }
  return () => {
    subscribers.delete(cb)
    if (subscribers.size === 0) {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      initialized = false
    }
  }
}

export function useScrollPosition(): number {
  return useSyncExternalStore(subscribe, () => getSnapshot().y, () => 0)
}

export function useScrollProgress(): number {
  return useSyncExternalStore(subscribe, () => getSnapshot().p, () => 0)
}

export const __scrollTestHelpers = { subscribers, recompute }
