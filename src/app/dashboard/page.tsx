import AvatarControls from "~/components/ui/avatar-controls";

import { Suspense } from "react";
import Loading from "./loading";
import SceneCanvas from "~/components/3d/Scene";

import NowPlayingCard from "~/components/ui/now-playing";

import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {

    void api.spotify.getListening.prefetch();

  return (
      <HydrateClient>
        <div className="h-full w-full">

            <Suspense fallback={<Loading/>}>
                <NowPlayingCard/>
                <AvatarControls/>
              <div className="relative h-full w-full">
                  <div className="absolute inset-0 z-0">
                     <SceneCanvas/>
                  </div>
              </div>
            </Suspense>
        </div>
      </HydrateClient>
  );
}