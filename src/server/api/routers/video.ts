import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { z } from 'zod';

export const videoRouter = createTRPCRouter({
  getVideoStream: publicProcedure
    .input(z.object({ url: z.string().url() })) // Validating the URL input
    .query(({ input }) => {
      const { url } = input;
      // Return the API route for streaming
      //return { videoUrl: `https://chrisyoutuberserverdomaincustom.cc:3000/video/stream?url=${encodeURIComponent(url)}` };

      return { videoUrl: `http://localhost:3001/video/stream?url=${encodeURIComponent(url)}` };
    }),
});