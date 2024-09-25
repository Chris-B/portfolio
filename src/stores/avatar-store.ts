import { createStore } from 'zustand/vanilla'

export type AvatarState = {
  isSitting: boolean,
  isSpeaking: boolean,
  isDancing: boolean
}

export type AvatarActions = {
  sitDown: () => void
  standUp: () => void
  togglePosition: () => void
  introSpeech: () => void
  stopSpeaking: () => void
  toggleDancing: () => void
}

export type AvatarStore = AvatarState & AvatarActions

export const defaultInitState: AvatarState = {
  isSitting: false,
  isSpeaking: false,
  isDancing: false,
}

export const createAvatarStore = (
  initState: AvatarState = defaultInitState,
) => {
  return createStore<AvatarStore>()((set) => ({
          ...initState,
          sitDown: () => set((state) => ({ isDancing: false, isSitting: true })),
          standUp: () => set((state) => ({ isDancing: false, isSitting: false })),
          togglePosition: () => set((state) => ({ isDancing: false, isSitting: !state.isSitting })),
          introSpeech: () => set((state) => ({ isSpeaking: true })),
          stopSpeaking: () => set((state) => ({ isSpeaking: false })),
          toggleDancing: () => set((state) => ({ isSitting: !state.isDancing ? false : state.isSitting, isDancing: !state.isDancing })),
  }))
}