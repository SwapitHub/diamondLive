// src/app/api/upload/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();

  // handle the uploaded body
  return NextResponse.json({ success: true });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb' // Set size limit to 10MB
    },
  },
};
