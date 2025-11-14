import { NextResponse } from "next/server";
import { BACKEND_BASE_URL } from "@/lib/backend-config";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    const response = await fetch(`${BACKEND_BASE_URL}/figures/${filename}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Figure not found" },
        { status: response.status }
      );
    }

    // Get the image blob
    const imageBlob = await response.blob();

    // Return the image with proper headers
    return new NextResponse(imageBlob, {
      status: 200,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "image/png",
        "Cache-Control": "public, max-age=31536000",
      },
    });
  } catch (e) {
    console.error("Error fetching figure:", e);
    return NextResponse.json(
      { error: "Failed to fetch figure" },
      { status: 502 }
    );
  }
}
