import { NextRequest, NextResponse } from "next/server";

const FOTOGRAPHER_API_URL = "https://api.fotographer.ai/Image-gen/Image-gen";

export async function POST(req: NextRequest) {
  try {
    // Request headers'dan API key ve email'i al
    const apiKey = process.env.NEXT_PUBLIC_FOTOGRAPHER_API_KEY || "";
    const email = process.env.NEXT_PUBLIC_FOTOGRAPHER_EMAIL || "";


    // API key ve email kontrolü
    if (!apiKey || !email) {
      return NextResponse.json(
        { error: "API key and email are required" },
        { status: 400 }
      );
    }

    // Request body'den verileri al
    const body = await req.json();
    const { image, prompt, mode } = body;

    // Gerekli alanların kontrolü
    if (!image || !prompt || !mode) {
      return NextResponse.json(
        { error: "Image, prompt and mode are required" },
        { status: 400 }
      );
    }

    // Fotographer API'ye istek at
    const response = await fetch(FOTOGRAPHER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "x-email": email,
      },
      body: JSON.stringify({
        image,
        prompt,
        mode,
      }),
      redirect: "follow",
    });

    console.log("response status", response);
    const data = await response.text();
    console.log("response", data);

    // API'den hata gelirse
    if (!response.ok) {
      return NextResponse.json(
        { error: data || "Error from Fotographer API" },
        { status: response.status }
      );
    }

    // Başarılı response'u döndür
    return NextResponse.json(data, { status: response.status });

  } catch (error) {
    console.error("Error in image generation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 