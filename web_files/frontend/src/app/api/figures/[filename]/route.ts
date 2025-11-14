import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { filename: string } }
) {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ||
                      process.env.BACKEND_URL ||
                      "http://127.0.0.1:8001";

    const { filename } = params;
    const response = await fetch(`${backendUrl}/figures/${filename}`, {
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
