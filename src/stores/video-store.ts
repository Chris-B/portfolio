import { createStore } from 'zustand/vanilla'

export type VideoState = {
  isPlaying: boolean,
}

export type VideoActions = {
  toggleVideo: () => void
}

export type VideoStore = VideoState & VideoActions

export const defaultInitState: VideoState = {
  isPlaying: false,
}

export const createVideoStore = (
  initState: VideoState = defaultInitState,
) => {
  return createStore<VideoStore>()((set) => ({
          ...initState,
          toggleVideo: () => set((state) => ({ isPlaying: !state.isPlaying })),

  }))
}