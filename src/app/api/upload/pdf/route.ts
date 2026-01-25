import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { PDFParse } from "pdf-parse";

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

    // Parse PDF and extract text
    const parser = new PDFParse({
      data: new Uint8Array(arrayBuffer),
    });
    const textResult = await parser.getText();

    if (!textResult.text || textResult.text.trim().length === 0) {
      return NextResponse.json(
        { error: "Could not extract text from PDF. The file may be image-based or corrupted." },
        { status: 400 }
      );
    }

    // Clean up
    await parser.destroy();

    return NextResponse.json({
      text: textResult.text,
      numPages: textResult.pages?.length || 1,
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
