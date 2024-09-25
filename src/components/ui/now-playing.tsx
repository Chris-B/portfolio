'use client'

import React, { useState } from "react";
import { Music } from 'lucide-react'
import { Progress } from "~/components/ui/progress"

import { api } from "~/trpc/react";
import { useFrame } from "@react-three/fiber";


export default function NowPlayingCard() {

  const song = api.spotify.getListening.useQuery()

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!song.item) {
    return null
  }

  return (
    <div className="fixed left-0 top-1/3 backdrop-blur-md w-full max-w-sm mx-auto p-4 bg-black/30 border border-purple-500 rounded-lg shadow-lg text-white z-50">
      <div className="flex items-center mb-4">
        <Music className="w-6 h-6 mr-2 text-cyan-400" />
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
          Now Playing
        </h2>
      </div>
      <div className="flex mb-4">
        <img
          src={song.item.album.images[0].url}
          alt={`${song.item.album.name} cover`}
          className="w-24 h-24 rounded-md mr-4 border border-purple-500"
        />
        <div className="flex flex-col justify-center">
          <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            {song.item.name}
          </h3>
          <p className="text-gray-300">{song.item.artists.map((_artist) => _artist.name).join(", ")}</p>
          <p className="text-gray-400 text-sm">{song.item.album.name}</p>
        </div>
      </div>
      <div className="mb-2">
        <Progress
          value={(song.progress_ms / song.item.duration_ms) * 100}
          className="h-1 bg-gray-700"
        />
      </div>
      <div className="flex justify-between text-sm text-gray-400">
        <span>{formatTime(song.progress_ms / 1000)}</span>
        <span>{formatTime(song.item.duration_ms / 1000)}</span>
      </div>
    </div>
  );
}