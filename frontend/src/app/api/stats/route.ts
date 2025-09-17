import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(process.env.BACKEND_URL || "http://127.0.0.1:8001/stats");
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (e) {
    return NextResponse.json({ error: "Backend not reachable" }, { status: 502 });
  }
}


