'use client'

import { useMemo, useState } from "react";
import { PerspectiveCamera, Environment, OrbitControls } from "@react-three/drei";
import { ChrisAvatar } from '~/components/3d/Avatar'
import { Office } from '~/components/3d/Office'

import { ProjectMenu, ProjectDetails, type Project } from '~/components/3d/ProjectContent'

import { Canvas } from '@react-three/fiber'

export default function SceneCanvas() {

  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const cameraProps = useMemo(
    () => ({
      makeDefault: true,
      zoom: 1,
      near: 1,
      far: 2000,
      position: [0, 0.6, 2] as [number, number, number],
      rotation: [-0.22, 0, 0] as [number, number, number],
    }),
    [],
  );

  const officeProps = useMemo(() => ({
    scale: [0.9, 0.9, 0.9] as [number, number, number],
    rotation: [0, -Math.PI / 2, 0] as [number, number, number],
    position: [0, -1, 0] as [number, number, number],
  }), [])

  return (
      <Canvas>
        <ChrisAvatar position={[0, -0.99, -1] as [number, number, number]} />
        <Office {...officeProps} />
        <PerspectiveCamera {...cameraProps} />
        <Environment preset="apartment" environmentIntensity={0.5}/>
      </Canvas>
  )
}