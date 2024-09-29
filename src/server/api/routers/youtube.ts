import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import ytdl from "@distube/ytdl-core";
import { z } from "zod";

export const youtubeRouter = createTRPCRouter({
  getVideoStream: publicProcedure
    .input(
      z.object({
        url: z.string().url(), // Validating the URL input
      })
    )
    .query(async ({ input }) => {
      const { url } = input;

      try {
        const stream = ytdl(url, { filter: "audioandvideo" });
        const videoChunks: Buffer[] = [];

        await new Promise((resolve, reject) => {
          stream.on("data", (chunk: Buffer) => {
            videoChunks.push(chunk);
          });

          stream.on("end", () => {
            console.log("resolved video chunks")
            resolve(videoChunks);
          });

          stream.on("error", (error) => {
            reject(new Error(`Failed to download video: ${error.message}`));
          });
        });

        const videoBuffer = Buffer.concat(videoChunks);
        const base64Video = videoBuffer.toString('base64');

        return { videoData: base64Video }; // Return the base64-encoded video

      } catch (error) {
        throw new Error(`Video download failed: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
    }),
});