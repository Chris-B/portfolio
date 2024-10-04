// src/server/api/youtubeRouter.ts
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { z } from 'zod';

export const youtubeRouter = createTRPCRouter({
  getVideoStream: publicProcedure
    .input(z.object({ url: z.string().url() })) // Validating the URL input
    .query(({ input }) => {
      const { url } = input;
      // Return the API route for streaming
      return { videoUrl: `https://chrisyoutuberserverdomaincustom.cc:3000/youtube/stream?url=${encodeURIComponent(url)}` };
    }),
});