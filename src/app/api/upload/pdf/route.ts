import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

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

    // Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Dynamically import pdf-parse-new (CommonJS module)
    const pdfParse = (await import("pdf-parse-new")).default;

    // Parse PDF
    const data = await pdfParse(buffer);

    if (!data.text || data.text.trim().length === 0) {
      return NextResponse.json(
        { error: "Could not extract text from PDF. The file may be image-based or corrupted." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      text: data.text,
      numPages: data.numpages,
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
