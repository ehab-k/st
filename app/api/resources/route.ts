import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("studyshare");
    const resources = await db.collection("resources")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(resources);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch resources" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("studyshare");
    const data = await request.json();

    const newResource = {
      ...data,
      createdAt: new Date(),
      likes: 0,
      saved: false
    };

    const result = await db.collection("resources").insertOne(newResource);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create resource" }, { status: 500 });
  }
}