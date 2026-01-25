import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

// Disable worker for serverless environment
pdfjsLib.GlobalWorkerOptions.workerSrc = "";

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
    const uint8Array = new Uint8Array(arrayBuffer);

    // Load PDF document
    const loadingTask = pdfjsLib.getDocument({
      data: uint8Array,
      useSystemFonts: true,
      disableFontFace: true,
    });

    const pdf = await loadingTask.promise;
    const numPages = pdf.numPages;

    // Extract text from all pages
    const textParts: string[] = [];

    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item) => {
          // TextItem has 'str' property, TextMarkedContent does not
          if ("str" in item) {
            return (item as { str: string }).str;
          }
          return "";
        })
        .filter(Boolean)
        .join(" ");
      textParts.push(pageText);
    }

    const fullText = textParts.join("\n\n");

    if (!fullText || fullText.trim().length === 0) {
      return NextResponse.json(
        { error: "Could not extract text from PDF. The file may be image-based or corrupted." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      text: fullText,
      numPages,
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
