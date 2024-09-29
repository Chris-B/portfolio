// app/api/youtube/stream/route.ts
import { NextResponse } from 'next/server';
import ytdl from '@distube/ytdl-core';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url || typeof url !== 'string') {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  try {
    const stream = ytdl(url, { filter: 'audioandvideo' });
    console.log('Stream created successfully:', stream); // Debug log

    // Create a new ReadableStream from the ytdl stream
    const readableStream = new ReadableStream({
      start(controller) {
        stream.on('data', (chunk) => {
          controller.enqueue(chunk); // Push each chunk to the ReadableStream
        });
        stream.on('end', () => {
          controller.close(); // Close the stream when done
        });
        stream.on('error', (err) => {
          controller.error(err); // Handle any errors
        });
      },
    });

    // Return the stream in the response
    return new Response(readableStream, {
      headers: {
        'Content-Type': 'video/mp4',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error) {
    // Narrowing the error type safely
    console.error('Error fetching video:', error); // Log the error
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}