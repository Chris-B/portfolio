import { HydrateClient } from "~/trpc/server";

import VideoScene from "~/components/3d/VideoScene";
import VideoControls from "~/components/ui/video-controls";

export default function Home() {

  return (
      <HydrateClient>
        <div className="h-full w-full">
          <VideoControls/>
          <div className="relative h-full w-full">
              <div className="absolute inset-0 z-0">
                  <VideoScene/>
              </div>
          </div>
        </div>
      </HydrateClient>
  );
}