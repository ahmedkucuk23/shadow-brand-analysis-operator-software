import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { extractText } from "unpdf";

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json(
        { error: "File must be a PDF" },
        { status: 400 }
      );
    }

    // Convert file to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();

    // Extract text using unpdf (serverless-compatible)
    const { text, totalPages } = await extractText(arrayBuffer);

    // text is an array of strings (one per page), join them
    const fullText = Array.isArray(text) ? text.join("\n\n") : text;

    if (!fullText || fullText.trim().length === 0) {
      return NextResponse.json(
        { error: "Could not extract text from PDF. The file may be image-based or corrupted." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      text: fullText,
      numPages: totalPages,
    });
  } catch (error) {
    console.error("Error parsing PDF:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to parse PDF", details: errorMessage },
      { status: 500 }
    );
  }
}
