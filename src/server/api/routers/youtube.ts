import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import ytdl from "@distube/ytdl-core";
import { z } from "zod";
import * as fs from "node:fs";
import * as path from "node:path";

export const youtubeRouter = createTRPCRouter({
  getVideoUrl: publicProcedure
    .input(
      z.object({
        url: z.string().url(), // Validating the URL input
      })
    )
    .query(async ({ input }) => {
      const { url } = input;
      const videoPath = "public/video.mp4"

      return new Promise((resolve, reject) => {
        try {
          const stream = ytdl(url, { filter: "audioandvideo" })
            .pipe(fs.createWriteStream(videoPath));

          stream.on("finish", () => {
            resolve({ videoPath }); // Return the video path on success
          });

          stream.on("error", (error) => {
            reject(new Error(`Failed to download video: ${error.message}`));
          });
        } catch (error) {
          if (error instanceof Error) {
            reject(new Error(`Unexpected error: ${error.message}`));
          } else {
            reject(new Error("An unknown error occurred."));
          }
        }
      });
    }),
});