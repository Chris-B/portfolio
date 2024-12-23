'use client'

/* Author of shaders: espisepi */
/* Code based in: https://tympanus.net/codrops/2019/09/06/how-to-create-a-webcam-audio-visualizer-with-three-js/ */
import React, { useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import { useFrame, useLoader, useThree } from "@react-three/fiber";

import { useVideoStore } from "~/providers/video-store-provider"

import VideoShader0 from "~/components/3d/shaders/VideoShader0";
import VideoShader1 from "~/components/3d/shaders/VideoShader1";

function loadVideo(videoSrc: string) {
    const video = document.createElement("video");
    video.autoplay = false;
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.src = videoSrc;
    video.load();
    return video
}

function loadAudio(audioBuffer: AudioBuffer) {

    if(audioBuffer){
        const audioListener = new THREE.AudioListener();
        const audioTemp = new THREE.Audio(audioListener);
        audioTemp.setBuffer(audioBuffer);
        audioTemp.setLoop(true);
        audioTemp.autoplay = false;
        audioTemp.setVolume(0);
        return audioTemp
    }

    return null

}


type VideoProps = {
    type?: string,
}

export const VideoComponent = ({type='MusicShader' }: VideoProps) => {
    const configuration = `
          r = bass + 0.5;
          g = bass;
          b = bass;
          color.r = bass;
          color.g = mid;
          color.b = mid
          distance = 1;
          density = 1;
      `;

    const { videoLoaded, audioLoaded, setLoaded, setAudioLoaded, setIsPlaying, videoElement, setVideoElement, audio, setAudio, videoSrc } = useVideoStore((state) => state)


    useEffect(() => {
        setLoaded(false)
        setAudioLoaded(false)
        setIsPlaying(false)
        console.log("Reset Video and Audio")
    }, [videoSrc]);

    const audioBuffer = useLoader(THREE.AudioLoader, videoSrc!)

    useEffect(() => {
        if(!audioLoaded) {
            const tempAudio = loadAudio(audioBuffer)
            if (tempAudio) {
                setAudio(tempAudio)
            }
            console.log("Loading Audio")
        }
        if(!videoLoaded) {
            setVideoElement(loadVideo(videoSrc!));
            console.log("Loading Video")
        }
    }, [videoSrc]);

    useFrame(() => {
        if (!audioLoaded && audio) {
            console.log("Audio Ready")
            setAudioLoaded(true)
        }
    });

    useFrame(() => {
        if (videoElement?.readyState == 4 && !videoLoaded) {
            console.log("Video Ready")
            console.log(videoElement)
            setLoaded(true)
        }
    });


    if(type === 'MusicShader' && audio){
        return (<MusicShader audio={audio} position={[0,0,-200]} scale={[20,20,20]} />);
    }else if(type === 'VideoPointsShader' && audio){
        return (<VideoPointsShader audio={audio} video={videoElement} configuration={configuration} />);
    }else{
        return null;
    }
}

type Shader = {
    uniforms: {
        iTime: { value: number },
        iResolution: { value: THREE.Vector3 },

        bass: { value: number },
        mid: { value: number },
        treble: { value: number },

        iChannel0: { value: THREE.Texture },
      },
      vertexShader: string,
      fragmentShader: string
}

function getShader(texture: THREE.Texture): Shader {
  return {
    uniforms: {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector3(1, 1, 1) },

      bass: { value: 0.0 },
      mid: { value: 0.0 },
      treble: { value: 0.0 },

      iChannel0: { value: texture },
    },
    vertexShader: `

        varying vec2 vUv;

        uniform float iTime;
        uniform sampler2D iChannel0;

        uniform float bass;
        uniform float mid;
        uniform float treble;


			void main() {
                vUv = uv;

                vec4 textureVideo = texture2D( iChannel0, vec2( vUv.x, vUv.y) );
                float gray = (textureVideo.r + textureVideo.g + textureVideo.b) / 3.0;
                float threshold = 300.0;
                vec3 pos = position;

                float r = bass + 0.5;
                float g = treble;
                float b = mid;
                float distance = 400.0;
                float distance2 = 300.0;
                float distance3 = 100.0;

                float modX = mod(pos.x,0.05);
                float modY = mod(pos.y,0.05);
                pos.z += modY * gray * bass * 30.0;


                float size = 1.0;
				gl_PointSize = size ;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );

			}
        `,
    fragmentShader: `
        #include <common>

        varying vec2 vUv;

        uniform vec3 iResolution;
        uniform float iTime;

        uniform float bass;
        uniform float mid;
        uniform float treble;
        uniform sampler2D iChannel0;

        vec3 colorA = vec3(0.3,0.0,0.0);
        vec3 colorB = vec3(1.0,0.0,0.0);

        void mainImage(out vec4 fragColor, in vec2 fragCoord) {

            vec2 uv = fragCoord.xy / iResolution.xy;
            uv.x *= iResolution.x / iResolution.y;


            //vec3 color = mix(colorA,colorB,bass+0.3);

            vec4 textureVideo = texture2D( iChannel0, vec2( vUv.x, vUv.y) );
            float gray = (textureVideo.r + textureVideo.g + textureVideo.b) / 3.0;
            vec3 color_red = vec3(bass+gray,0.0,0.0);
            vec3 color = textureVideo.rgb;
            color = ( textureVideo.rgb  ) * vec3(bass + 0.5 , bass + 0.5 , bass + 0.5 ) * 1.0;



            fragColor = vec4(color, 1.0 );


        }
        void main() {
            mainImage(gl_FragColor, vUv * iResolution.xy);
        }
        `,
  };
}

type MusicShaderProps = {
    audio: THREE.Audio,
    img?: string,
    geometry?: THREE.PlaneGeometry,
    position?: [number,number,number],
    rotation?: [number,number,number],
    scale?: [number,number,number]
}

export const MusicShader = ({ audio,
                              img='assets/img/masnaisraelb.png',
                              geometry=new THREE.PlaneGeometry(3,3,100,100),
                              position=[0,0,0],
                              rotation=[0,0,0],
                              scale = [1,1,1] }: MusicShaderProps) => {

    /** Getting mesh ready*/
    const { scene } = useThree();
    const texture = useLoader(THREE.TextureLoader,img);
    const [ mesh, setMesh] = useState<THREE.Mesh>();
    useEffect(()=>{
        const { vertexShader, fragmentShader, uniforms } = getShader(texture);
        const material = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: uniforms
        });
        material.side = THREE.DoubleSide;
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(...position);
        mesh.rotation.set(...rotation);
        mesh.scale.set(...scale);
        scene.add(mesh);
        setMesh(mesh);
        return () => {
            scene.remove(mesh);
            mesh.geometry.dispose();
            mesh.material.dispose();
            texture.dispose();
        };
    },[]);

    const analyser = useMemo(()=>{
        if(audio){
            const fftSize = 2048;
            return new THREE.AudioAnalyser(audio, fftSize);
        }
    },[audio]);
    const frequencyRange = useMemo(()=>{
        return {
            bass: [20, 140],
            lowMid: [140, 400],
            mid: [400, 2600],
            highMid: [2600, 5200],
            treble: [5200, 14000],
        }
    },[]);
    useFrame(({clock})=>{
        let data,bass,mid,treble;
        if(analyser){
            data = analyser.getFrequencyData();
            bass = getFrequencyRangeValue(frequencyRange.bass, data);
            mid = getFrequencyRangeValue(frequencyRange.mid, data);
            treble = getFrequencyRangeValue(frequencyRange.treble, data);
            // console.log( 'bass ' + bass + ' / mid ' + mid + ' / treble ' + treble)
        }
        if(mesh){
            const material = mesh.material as THREE.ShaderMaterial;
            material.uniforms.iTime!.value = clock.elapsedTime;
            material.uniforms.bass!.value = bass;
            material.uniforms.mid!.value = mid;
            material.uniforms.treble!.value = treble;
        }
    });

    return null;

}

type VideoShaderProps = {
    audio: THREE.Audio,
    video: HTMLVideoElement | null,
    shaderType?: string,
    configuration: string,
    position?: [number,number,number],
    rotation?: [number,number,number],
    scale?: [number,number,number],
    colorInput?: THREE.Vector3
}

/** Arguments explanation:
 * audio: THREE.audio
 * video: string => 'https://www.youtube.com/watch?v=CIb...' || 'assets/...mp4' || '' (webcam)
 * configuration: string =>
 *                              const configuration = `
                                    r = bass + 0.5;
                                    g = treble;
                                    b = mid;
                                    color.r = bass;
                                    color.g = mid;
                                    color.b = mid
                                    distance = 2;
                                `;
 */
export const VideoPointsShader = ({ audio, video, shaderType='VideoShader0', configuration, position=[0,0,0], rotation=[Math.PI, Math.PI, 0], scale=[1,1,1], colorInput = new THREE.Vector3(0,0,0) }: VideoShaderProps) => {
    configuration = configuration || `
                                                r = bass + 0.5;
                                                g = treble;
                                                b = mid;
                                                color.r = bass;
                                                color.g = mid;
                                                color.b = mid
                                                distance = 2;
                                            `;

    const fftSize = 2048;
    const frequencyRange = {
        bass: [20, 140],
        lowMid: [140, 400],
        mid: [400, 2600],
        highMid: [2600, 5200],
        treble: [5200, 14000],
    };

    const { audioLoaded } = useVideoStore((state) => state)

    const [analyser, setAnalyser] = useState<THREE.AudioAnalyser>();

    useEffect(()=>{
        if(audio){
            console.log("Set Audio Analyser")
            setAnalyser(new THREE.AudioAnalyser(audio, fftSize));
        }
    },[audioLoaded]);

    const {scene} = useThree();

    const [particles, setParticles] = useState<THREE.Points | null>(null);

    useEffect(()=>{
        return () => {
            if(particles) {
                scene.remove(particles);
            }
        }
    },[particles])

    useFrame(({clock})=>{

        if( !particles && video && video.readyState === 4 ){
            console.log('setting particles')
            const res = createParticles(video, shaderType);
            res.position.set(...position);
            res.rotation.set(...rotation);
            res.scale.set(...scale);
            scene.add(res);
            setParticles(res);
        }

        let data, bass, mid, treble;
        if(analyser){
            data = analyser.getFrequencyData();
            bass = getFrequencyRangeValue(frequencyRange.bass, data);
            mid = getFrequencyRangeValue(frequencyRange.mid, data);
            treble = getFrequencyRangeValue(frequencyRange.treble, data);
            // console.log( 'bass ' + bass + ' / mid ' + mid + ' / treble ' + treble)
        }
        if(particles){
            const material = particles.material as THREE.ShaderMaterial;
            material.uniforms.iTime!.value = clock.elapsedTime;
            material.uniforms.bass!.value = bass;
            material.uniforms.mid!.value = mid;
            material.uniforms.treble!.value = treble;
            material.uniforms.colorInput!.value = colorInput;
        }

    });

    return null;
};

function createParticles(video: HTMLVideoElement, shaderType: string){

    const imageData = getImageData(video);
    const textureVideo = new THREE.VideoTexture(video);

    let shaderMaterial;
    if(shaderType==='videoshader1'){
        shaderMaterial = VideoShader1(textureVideo);
    }else{
        shaderMaterial = VideoShader0(textureVideo);
    }
    const material = shaderMaterial;

    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const uvs = [];
    for (let y = 0, height = imageData.height; y < height; y += 1) {
        for (let x = 0, width = imageData.width; x < width; x += 1) {
            const vertex = new THREE.Vector3(
                x - imageData.width / 2,
                -y + imageData.height / 2,
                0
            );
            positions.push( vertex.x, vertex.y, vertex.z );
            uvs.push( x / imageData.width, y / imageData.height );
        }
    }
    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
    geometry.setAttribute( 'uv', new THREE.Float32BufferAttribute( uvs, 2 ) );

    return new THREE.Points(geometry, material);
}

function getImageData(video: HTMLVideoElement) {
    const canvas = document.createElement('CANVAS') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);

    ctx.drawImage(video, 0, 0);
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function getFrequencyRangeValue (_frequencyRange: number[], frequencyData: Uint8Array) {
    const data = frequencyData;
    const nyquist = 48000 / 2;
    const lowIndex = Math.round(_frequencyRange[0]! / nyquist * data.length);
    const highIndex = Math.round(_frequencyRange[1]! / nyquist * data.length);
    let total = 0;
    let numFrequencies = 0;

    for (let i = lowIndex; i <= highIndex; i++) {
        total += data[i]!;
        numFrequencies += 1;
    }

    return total / numFrequencies / 255;
}

