import { NextResponse } from "next/server";
import { BACKEND_ENDPOINTS } from "@/lib/backend-config";

export async function POST(req: Request) {
  const { text } = await req.json();

  if (!text || typeof text !== "string" || !text.trim()) {
    return NextResponse.json({ error: "Invalid text" }, { status: 400 });
  }

  try {
    const response = await fetch(BACKEND_ENDPOINTS.predict, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Backend not reachable" },
      { status: 502 }
    );
  }
}


