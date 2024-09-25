import { currentlyPlayingSong } from "~/lib/spotify";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export type SpotifyJSON = {
  progress_ms: number
  item: {
    is_playing: boolean
    duration_ms: number
    album: {
      name: string
      images: [
        {url: string}
      ]
    }
    artists: [
      {name: string}
    ]
    name: string
    external_urls: {
      spotify: string
    }
  }
}

export const spotifyRouter = createTRPCRouter({
  getListening: publicProcedure.query(async (): Promise<SpotifyJSON> => {
    const spotifyResponse = await currentlyPlayingSong();
    if (spotifyResponse.status === 204 || spotifyResponse.status > 400) {
      return {} as SpotifyJSON
    }

    return await spotifyResponse.json() as SpotifyJSON
    }),
});