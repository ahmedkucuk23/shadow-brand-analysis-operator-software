import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("ANTHROPIC_API_KEY is not set");
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  try {
    const data = await request.json();

    const {
      coachingOffer,
      offerName,
      tagline,
      promise,
      duration,
      idealFor,
      notFor,
      coreProgram,
      support,
      bonuses,
      priceStarter,
      priceComplete,
      priceVIP,
      starterIncludes,
      completeIncludes,
      vipIncludes,
      transformationBefore,
      transformationAfter,
      guaranteeType,
      guaranteeDuration,
      socialProof,
      language,
    } = data;

    const languageInstruction = language && language !== "en"
      ? `\n\n**IMPORTANT: Generate ALL content in ${language === "bs" ? "Bosnian" : language === "hr" ? "Croatian" : language === "sr" ? "Serbian" : language === "de" ? "German" : language === "es" ? "Spanish" : language === "fr" ? "French" : language === "it" ? "Italian" : language === "pt" ? "Portuguese" : language === "nl" ? "Dutch" : language === "pl" ? "Polish" : language === "tr" ? "Turkish" : language === "ru" ? "Russian" : language === "ar" ? "Arabic" : "the specified language"}. The entire document must be written in this language, including all headers, descriptions, and examples.**\n`
      : "";

    const prompt = `You are an expert at creating concise, powerful one-page offer summaries. Generate a Coaching Charter - a single-page executive summary of the complete coaching offer that serves as the "quick reference" for all future content, sales, and launch materials.${languageInstruction}

## INPUT DATA:

**From Coaching Offer Document:**
${coachingOffer || "Use the following details:"}

**Offer Details:**
- Program Name: ${offerName}™
- Tagline: ${tagline}
- Core Promise: ${promise}
- Duration: ${duration}

**This Is For:**
${idealFor}

**This Is NOT For:**
${notFor}

**Core Program Includes:**
${coreProgram}

**Support Includes:**
${support}

**Bonuses:**
${bonuses}

**Pricing:**
- Starter: $${priceStarter} - Includes: ${starterIncludes}
- Complete: $${priceComplete} - Includes: ${completeIncludes}
- VIP: $${priceVIP} - Includes: ${vipIncludes}

**Transformation:**
- Before: ${transformationBefore}
- After: ${transformationAfter}

**Guarantee:**
- Type: ${guaranteeType}
- Duration: ${guaranteeDuration}

**Social Proof:**
${socialProof}

---

## GENERATE A SINGLE-PAGE COACHING CHARTER:

The charter must be scannable in under 30 seconds. Use this exact structure:

---

# ${offerName}™ COACHING CHARTER
### ${tagline}

---

## THE PROMISE
"In [X weeks], you will [SPECIFIC RESULT] through [MECHANISM]."

---

## FOR WHO | WHAT'S INCLUDED | INVESTMENT

**This Is For:**
✓ [Trait 1]
✓ [Trait 2]
✓ [Trait 3]
✓ [Trait 4]

**This Is NOT For:**
✗ [Trait 1]
✗ [Trait 2]

---

**Core Program:**
□ [X] Video Lessons
□ [X] Worksheets
□ [X] Week Action Plan
□ [Specific Deliverable]
□ [Specific Deliverable]

**Support:**
□ [Support Type 1]
□ [Support Type 2]

**Bonuses:**
□ [Bonus 1]
□ [Bonus 2]

---

**Investment Options:**

| STARTER | COMPLETE ⭐ | VIP |
|---------|------------|-----|
| $[Price] | $[Price] | $[Price] |
| [Key feature] | [Key feature] | [Key feature] |
| [Key feature] | Everything in Starter + | Everything in Complete + |
| Ideal for: DIY learners | [Feature] | [Feature] |
| | Ideal for: Guided journey | Ideal for: Full transformation |

💳 Payment plans available

---

## THE TRANSFORMATION

| BEFORE | → | AFTER |
|--------|---|-------|
| [Pain point 1] | → | [Result 1] |
| [Pain point 2] | → | [Result 2] |
| [Pain point 3] | → | [Result 3] |
| [Pain point 4] | → | [Result 4] |

---

## GUARANTEE
**[X]-Day Money-Back Guarantee**
[Brief explanation of terms - 1-2 sentences max]

---

## PROOF
"[X]+ transformations | [X] years experience | [Key credential]"

---

**IMPORTANT FORMATTING NOTES:**
1. Keep everything concise - this must fit on ONE page
2. Use bullet points, checkmarks, and tables for scannability
3. Bold key numbers and prices
4. The Complete tier should be visually highlighted as recommended
5. Transformation table should show clear before→after contrast
6. Maximum 3-4 items per section

Output in clean markdown format that could be converted to a professional PDF.`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 3000,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type");
    }

    return NextResponse.json({
      content: content.text,
      usage: {
        inputTokens: message.usage.input_tokens,
        outputTokens: message.usage.output_tokens,
      }
    });
  } catch (error) {
    console.error("Error generating Coaching Charter:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to generate content", details: errorMessage },
      { status: 500 }
    );
  }
}
