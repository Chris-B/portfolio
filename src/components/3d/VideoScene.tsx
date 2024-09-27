'use client'

import {
    createRef,
    Suspense,
    useEffect,
    useRef,
    useState,
  } from "react";

  import { Canvas, useFrame, useThree } from "@react-three/fiber";

  import { OrbitControls } from "@react-three/drei";
  import { VideoComponent } from "~/components/3d/shaders/VideoComponent";
import { VideoControls } from "~/components/ui/video-controls";

  export function Scene() {

      const { camera } = useThree();
      useEffect(()=>{
          camera.position.z = -650;
      });
      const [orbitEnabled,setOrbitEnabled] = useState(false);
      const  [firstTime, setFirstTime] = useState(true);
      const loadingRef = createRef();

      useFrame(()=>{
          if(firstTime && loadingRef.current === null){
              setFirstTime(false);
              setOrbitEnabled(true);
          }
      })

      const orbitRef = useRef(null)

      return(
          <>
            <ambientLight args={[0x443333, 0.5]} />
            <Suspense>
              <VideoComponent type='VideoPointsShader' />
            </Suspense>
            {/* <Picture /> */}
            <OrbitControls ref={orbitRef} enabled={orbitEnabled} enablePan={false} autoRotateSpeed={1.6} />
          </>
      );
  }

  export default function VideoScene() {
      return (
          <>
              <Canvas className="canvas" style={{backgroundColor:'#000000', position:'absolute', width:'100%', height:'100vh'}} camera={{far:20000}}>
                <VideoControls/>
                <Scene/>
              </Canvas>
          </>
      )
  }