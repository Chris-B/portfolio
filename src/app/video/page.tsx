import { HydrateClient } from "~/trpc/server";

import AudioVisualizer from "~/components/3d/AudioVisualizer";
import VideoControls from "~/components/ui/video-controls";

export default async function Home() {

  return (
      <HydrateClient>
          <VideoControls/>
        <div className="relative h-full w-full">
            <div className="absolute inset-0 z-0">
                <AudioVisualizer/>
            </div>
        </div>
      </HydrateClient>
  );
}