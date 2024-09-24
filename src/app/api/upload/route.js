import { NextResponse } from 'next/server';

export const runtime = 'nodejs'; // You can specify either 'edge' or 'nodejs'
export const sizeLimit = '10mb'; // Set size limit to 10MB

export async function POST(req) {
  const body = await req.json();
  
  // Handle the uploaded body
  return NextResponse.json({ success: true });
}
