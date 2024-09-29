// app/api/youtube/stream/route.ts
import { NextResponse } from 'next/server';

import { YtdlCore } from '@ybd-project/ytdl-core';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url || typeof url !== 'string') {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  try {

    const NORMAL_OAUTH2 = new YtdlCore.OAuth2({
      accessToken: 'ya29.a0AcM612y-agn17IELODzXsYfgsoTFCkccZQHC4pfKEwWRlE0_0Y6f4tn-4eyHJFDykNTWiHXBmaZGhfvHhQGiYyJuZm9TvC8hJpGv5bpxm7A75U8IJz5zir4RiWxXDCRglKoxNwImpBltIbYUu3IXpgtCmizQGBegUaGvAzlG5X3lRoxXLs4EaCgYKAWISARESFQHGX2MidMzLCfXPHv4iKNgTBwl0jQ0187',
      refreshToken: '1//06tdtu6piLYZJCgYIARAAGAYSNwF-L9IrdJ-EMKtQVzr4k8_zXbDCrtS27g586xeWnqC74FjUJzH31GYfRgP3Ab0xZ64Pznby18E',
      expiryDate: '2024-09-30T02:40:35.470Z',
    });

    const ytdl = new YtdlCore({
      filter: 'audioandvideo',
      oauth2: NORMAL_OAUTH2,
      requestOptions: {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
        }
      }
    });

    const stream = ytdl.download(url);
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
          console.error('Stream error:', err);
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