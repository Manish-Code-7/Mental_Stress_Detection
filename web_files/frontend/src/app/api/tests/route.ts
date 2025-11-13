import { NextResponse } from "next/server";
import { BACKEND_ENDPOINTS } from "@/lib/backend-config";

export async function GET() {
  try {
    const response = await fetch(BACKEND_ENDPOINTS.tests, {
      cache: "no-store",
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (e) {
    return NextResponse.json({ error: "Backend not reachable" }, { status: 502 });
  }
}


