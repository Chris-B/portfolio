import { createStore } from 'zustand/vanilla'

export type AvatarState = {
  isSitting: boolean,
  isSpeaking: boolean,
}

export type AvatarActions = {
  sitDown: () => void
  standUp: () => void
  togglePosition: () => void
  introSpeech: () => void
  stopSpeaking: () => void
}

export type AvatarStore = AvatarState & AvatarActions

export const defaultInitState: AvatarState = {
  isSitting: false,
  isSpeaking: false,
}

export const createAvatarStore = (
  initState: AvatarState = defaultInitState,
) => {
  return createStore<AvatarStore>()((set) => ({
          ...initState,
          sitDown: () => set((state) => ({ isSitting: true })),
          standUp: () => set((state) => ({ isSitting: false })),
          togglePosition: () => set((state) => ({ isSitting: !state.isSitting })),
          introSpeech: () => set((state) => ({ isSpeaking: true })),
          stopSpeaking: () => set((state) => ({ isSpeaking: false })),
  }))
}