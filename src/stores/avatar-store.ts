import { createStore } from 'zustand/vanilla'

export type AvatarState = {
  isSitting: boolean,
  initializing: boolean
}

export type AvatarActions = {
  sitDown: () => void
  standUp: () => void
  togglePosition: () => void
  initialized: () => void
}

export type AvatarStore = AvatarState & AvatarActions

export const defaultInitState: AvatarState = {
  isSitting: false,
  initializing: true
}

export const createAvatarStore = (
  initState: AvatarState = defaultInitState,
) => {
  return createStore<AvatarStore>()((set) => ({
    ...initState,
    sitDown: () => set((state) => ({ isSitting: true })),
    standUp: () => set((state) => ({ isSitting: false })),
    togglePosition: () => set((state) => ({ isSitting: !state.isSitting })),
    initialized: () => set((state) => ({ initializing: false })),
  }))
}