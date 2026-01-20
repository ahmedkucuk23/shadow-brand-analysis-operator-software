"use client";

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { commonStyles, colors } from "./styles";
import {
  CoverPage,
  ContentPage,
  SectionHeader,
  Table,
  BulletList,
  HighlightBox,
  QuoteBox,
  DayHeader,
} from "./components";

// Types for document generation
export type DocumentType =
  | "personality-dna"
  | "audience-dna"
  | "uvz-analysis"
  | "coaching-offer"
  | "coaching-charter"
  | "product-dna"
  | "monetization-gameplan"
  | "14day-launch";

interface DocumentMetadata {
  type: DocumentType;
  creatorName?: string;
  date?: string;
}

// Parse markdown content into structured elements
interface ParsedElement {
  type: "heading1" | "heading2" | "heading3" | "paragraph" | "bullet" | "table" | "quote" | "code";
  content: string;
  items?: string[];
  headers?: string[];
  rows?: string[][];
  level?: number;
}

function parseMarkdown(markdown: string): ParsedElement[] {
  const lines = markdown.split("\n");
  const elements: ParsedElement[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    // Skip empty lines
    if (!line) {
      i++;
      continue;
    }

    // Heading 1 (# or ##)
    if (line.startsWith("# ") || line.startsWith("## ")) {
      const level = line.startsWith("## ") ? 2 : 1;
      const content = line.replace(/^##?\s+/, "");
      elements.push({
        type: level === 1 ? "heading1" : "heading2",
        content,
        level,
      });
      i++;
      continue;
    }

    // Heading 2/3 (### or ####)
    if (line.startsWith("### ") || line.startsWith("#### ")) {
      const level = line.startsWith("#### ") ? 4 : 3;
      const content = line.replace(/^###?#?\s+/, "");
      elements.push({
        type: level === 3 ? "heading2" : "heading3",
        content,
        level,
      });
      i++;
      continue;
    }

    // Bold heading style (**text**)
    if (line.startsWith("**") && line.endsWith("**") && !line.includes("|")) {
      const content = line.slice(2, -2);
      elements.push({ type: "heading3", content });
      i++;
      continue;
    }

    // Table
    if (line.startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i].trim());
        i++;
      }

      if (tableLines.length >= 2) {
        const headers = tableLines[0]
          .split("|")
          .filter((c) => c.trim())
          .map((c) => c.trim());

        const rows: string[][] = [];
        for (let j = 2; j < tableLines.length; j++) {
          const cells = tableLines[j]
            .split("|")
            .filter((c) => c.trim() !== "" && !c.includes("---"))
            .map((c) => c.trim());
          if (cells.length > 0) {
            rows.push(cells);
          }
        }

        if (headers.length > 0 && rows.length > 0) {
          elements.push({ type: "table", content: "", headers, rows });
        }
      }
      continue;
    }

    // Bullet list
    if (line.startsWith("- ") || line.startsWith("* ") || line.startsWith("• ")) {
      const items: string[] = [];
      while (
        i < lines.length &&
        (lines[i].trim().startsWith("- ") ||
          lines[i].trim().startsWith("* ") ||
          lines[i].trim().startsWith("• ") ||
          lines[i].trim().startsWith("✓ ") ||
          lines[i].trim().startsWith("✗ "))
      ) {
        items.push(lines[i].trim().replace(/^[-*•✓✗]\s+/, ""));
        i++;
      }
      elements.push({ type: "bullet", content: "", items });
      continue;
    }

    // Numbered list
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i++;
      }
      elements.push({ type: "bullet", content: "", items });
      continue;
    }

    // Quote (> text)
    if (line.startsWith("> ") || line.startsWith('"')) {
      let quote = line.replace(/^>\s*/, "").replace(/^"/, "").replace(/"$/, "");
      i++;
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quote += " " + lines[i].trim().replace(/^>\s*/, "");
        i++;
      }
      elements.push({ type: "quote", content: quote });
      continue;
    }

    // Code block
    if (line.startsWith("```")) {
      i++;
      let code = "";
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        code += lines[i] + "\n";
        i++;
      }
      i++; // Skip closing ```
      elements.push({ type: "code", content: code.trim() });
      continue;
    }

    // Horizontal rule (skip)
    if (line === "---" || line === "***" || line === "___") {
      i++;
      continue;
    }

    // Regular paragraph
    let paragraph = line;
    i++;
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith("#") &&
      !lines[i].trim().startsWith("|") &&
      !lines[i].trim().startsWith("-") &&
      !lines[i].trim().startsWith("*") &&
      !lines[i].trim().startsWith(">") &&
      !lines[i].trim().startsWith("```") &&
      !/^\d+\.\s/.test(lines[i].trim())
    ) {
      paragraph += " " + lines[i].trim();
      i++;
    }

    // Clean up markdown formatting
    paragraph = paragraph
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/`(.*?)`/g, "$1");

    elements.push({ type: "paragraph", content: paragraph });
  }

  return elements;
}

// Get document title and subtitle based on type
function getDocumentInfo(type: DocumentType): { badge: string; title: string; subtitle: string } {
  switch (type) {
    case "personality-dna":
      return {
        badge: "CREATOR DNA",
        title: "PERSONALITY DNA",
        subtitle: "Your Unique Creator Identity",
      };
    case "audience-dna":
      return {
        badge: "CREATOR DNA",
        title: "AUDIENCE DNA",
        subtitle: "Deep Audience Understanding",
      };
    case "uvz-analysis":
      return {
        badge: "CREATOR DNA",
        title: "UVZ ANALYSIS",
        subtitle: "Top 20 Content Strategy",
      };
    case "coaching-offer":
      return {
        badge: "CREATOR DNA",
        title: "COACHING OFFER",
        subtitle: "Complete Offer Framework",
      };
    case "coaching-charter":
      return {
        badge: "CREATOR DNA",
        title: "COACHING CHARTER",
        subtitle: "One-Page Offer Summary",
      };
    case "product-dna":
      return {
        badge: "CREATOR DNA",
        title: "PRODUCT DNA",
        subtitle: "Master Reference Document",
      };
    case "monetization-gameplan":
      return {
        badge: "CREATOR DNA",
        title: "MONETIZATION GAMEPLAN",
        subtitle: "Revenue Strategy Blueprint",
      };
    case "14day-launch":
      return {
        badge: "LAUNCH PLAYBOOK",
        title: "14-DAY LAUNCH",
        subtitle: "Complete Daily Action Plan",
      };
    default:
      return {
        badge: "CREATOR DNA",
        title: "DOCUMENT",
        subtitle: "",
      };
  }
}

// Render parsed elements to PDF components
function renderElements(elements: ParsedElement[]): React.ReactNode[] {
  let sectionNumber = 0;

  return elements.map((element, index) => {
    switch (element.type) {
      case "heading1":
        sectionNumber++;
        return (
          <SectionHeader
            key={index}
            number={String(sectionNumber).padStart(2, "0")}
            title={element.content}
          />
        );

      case "heading2":
        return (
          <Text key={index} style={commonStyles.heading2}>
            {element.content}
          </Text>
        );

      case "heading3":
        return (
          <Text key={index} style={commonStyles.heading3}>
            {element.content}
          </Text>
        );

      case "paragraph":
        return (
          <Text key={index} style={commonStyles.paragraph}>
            {element.content}
          </Text>
        );

      case "bullet":
        return (
          <BulletList key={index} items={element.items || []} />
        );

      case "table":
        return (
          <Table
            key={index}
            headers={element.headers || []}
            rows={element.rows || []}
          />
        );

      case "quote":
        return <QuoteBox key={index} quote={element.content} />;

      case "code":
        return (
          <View
            key={index}
            style={{
              backgroundColor: colors.lightGray,
              padding: 15,
              marginVertical: 10,
              borderRadius: 4,
            }}
          >
            <Text style={{ fontSize: 9, fontFamily: "Courier" }}>
              {element.content}
            </Text>
          </View>
        );

      default:
        return null;
    }
  });
}

// Split content into pages (rough estimate)
function splitIntoPages(elements: ParsedElement[]): ParsedElement[][] {
  const pages: ParsedElement[][] = [];
  let currentPage: ParsedElement[] = [];
  let estimatedHeight = 0;
  const pageHeight = 700; // Approximate usable height in points

  for (const element of elements) {
    let elementHeight = 0;

    switch (element.type) {
      case "heading1":
        elementHeight = 60;
        break;
      case "heading2":
        elementHeight = 35;
        break;
      case "heading3":
        elementHeight = 25;
        break;
      case "paragraph":
        elementHeight = Math.ceil(element.content.length / 80) * 15 + 10;
        break;
      case "bullet":
        elementHeight = (element.items?.length || 0) * 18 + 10;
        break;
      case "table":
        elementHeight = ((element.rows?.length || 0) + 1) * 25 + 20;
        break;
      case "quote":
        elementHeight = 50;
        break;
      case "code":
        elementHeight = element.content.split("\n").length * 12 + 30;
        break;
      default:
        elementHeight = 20;
    }

    if (estimatedHeight + elementHeight > pageHeight && currentPage.length > 0) {
      pages.push(currentPage);
      currentPage = [];
      estimatedHeight = 0;
    }

    currentPage.push(element);
    estimatedHeight += elementHeight;
  }

  if (currentPage.length > 0) {
    pages.push(currentPage);
  }

  return pages;
}

// Main PDF Document Generator
interface PDFDocumentProps {
  content: string;
  metadata: DocumentMetadata;
}

export const PDFDocument: React.FC<PDFDocumentProps> = ({ content, metadata }) => {
  const elements = parseMarkdown(content);
  const pages = splitIntoPages(elements);
  const docInfo = getDocumentInfo(metadata.type);

  return (
    <Document>
      <CoverPage
        badge={docInfo.badge}
        title={docInfo.title}
        subtitle={docInfo.subtitle}
        creatorName={metadata.creatorName}
        date={metadata.date || new Date().toLocaleDateString()}
      />
      {pages.map((pageElements, pageIndex) => (
        <ContentPage key={pageIndex} documentTitle={docInfo.title}>
          {renderElements(pageElements)}
        </ContentPage>
      ))}
    </Document>
  );
};

// 14-Day Launch specific document (day-by-day or all-in-one)
interface LaunchDay {
  day: number;
  title: string;
  phase: string;
  content: string;
}

interface Launch14DayDocumentProps {
  days: LaunchDay[];
  allInOne?: boolean;
  metadata: DocumentMetadata;
}

export const Launch14DayDocument: React.FC<Launch14DayDocumentProps> = ({
  days,
  allInOne = true,
  metadata,
}) => {
  const docInfo = getDocumentInfo("14day-launch");

  if (allInOne) {
    return (
      <Document>
        <CoverPage
          badge={docInfo.badge}
          title={docInfo.title}
          subtitle={docInfo.subtitle}
          creatorName={metadata.creatorName}
          date={metadata.date || new Date().toLocaleDateString()}
        />
        {days.map((day) => {
          const elements = parseMarkdown(day.content);
          return (
            <ContentPage key={day.day} documentTitle={`DAY ${day.day} - ${day.title}`}>
              <DayHeader
                dayNumber={day.day}
                title={day.title}
                phase={day.phase}
              />
              {renderElements(elements)}
            </ContentPage>
          );
        })}
      </Document>
    );
  }

  // Return a single day document
  const day = days[0];
  const elements = parseMarkdown(day.content);

  return (
    <Document>
      <Page size="A4" style={commonStyles.coverPage}>
        <View style={commonStyles.coverBadge}>
          <Text style={commonStyles.coverBadgeText}>DAY {String(day.day).padStart(2, "0")}</Text>
        </View>
        <Text style={commonStyles.coverTitle}>{day.title}</Text>
        <View style={commonStyles.phaseTag}>
          <Text style={commonStyles.phaseTagText}>{day.phase}</Text>
        </View>
        <View style={commonStyles.coverDivider} />
        {metadata.creatorName && (
          <Text style={commonStyles.coverMeta}>
            Prepared for: {metadata.creatorName}
          </Text>
        )}
      </Page>
      <ContentPage documentTitle={`DAY ${day.day} - ${day.title}`}>
        {renderElements(elements)}
      </ContentPage>
    </Document>
  );
};

// Export helper for downloading PDFs
export async function downloadPDF(
  content: string,
  metadata: DocumentMetadata,
  filename: string
) {
  const { pdf } = await import("@react-pdf/renderer");
  const doc = <PDFDocument content={content} metadata={metadata} />;
  const blob = await pdf(doc).toBlob();

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Export helper for 14-day launch
export async function downloadLaunchPDF(
  days: LaunchDay[],
  metadata: DocumentMetadata,
  allInOne: boolean,
  filenameBase: string
) {
  const { pdf } = await import("@react-pdf/renderer");

  if (allInOne) {
    const doc = (
      <Launch14DayDocument days={days} allInOne={true} metadata={metadata} />
    );
    const blob = await pdf(doc).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filenameBase}_Complete.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } else {
    // Download each day separately
    for (const day of days) {
      const doc = (
        <Launch14DayDocument days={[day]} allInOne={false} metadata={metadata} />
      );
      const blob = await pdf(doc).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${filenameBase}_Day${String(day.day).padStart(2, "0")}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Small delay between downloads
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
}
