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
      creatorName,
      handle,
      location,
      niche,
      followers,
      engagementRate,
      averageLikes,
      averageComments,
      existingOfferings,
      recentTrend,
      contentTypes,
      audienceDescription,
      priceComfort,
      goals,
      language,
    } = data;

    const languageInstruction = language && language !== "en"
      ? `\n\n**IMPORTANT: Generate ALL content in ${language === "bs" ? "Bosnian" : language === "hr" ? "Croatian" : language === "sr" ? "Serbian" : language === "de" ? "German" : language === "es" ? "Spanish" : language === "fr" ? "French" : language === "it" ? "Italian" : language === "pt" ? "Portuguese" : language === "nl" ? "Dutch" : language === "pl" ? "Polish" : language === "tr" ? "Turkish" : language === "ru" ? "Russian" : language === "ar" ? "Arabic" : "the specified language"}. The entire document must be written in this language, including all headers, descriptions, and examples.**\n`
      : "";

    const prompt = `You are an expert digital product strategist and monetization consultant. Generate a comprehensive Monetization Gameplan based on the following creator data. Be specific, strategic, and actionable.${languageInstruction}

## INPUT DATA:

**Creator Profile:**
- Name: ${creatorName}
- Handle: ${handle}
- Location: ${location}
- Niche: ${niche}

**Current Metrics:**
- Followers: ${followers}
- Engagement Rate: ${engagementRate}%
- Average Likes: ${averageLikes}
- Average Comments: ${averageComments}

**Existing Offerings:** ${existingOfferings || "None currently"}

**Recent Trend:** ${recentTrend}

**Content Types:** ${contentTypes}

**Audience Description:** ${audienceDescription}

**Price Comfort Level:** ${priceComfort}

**Goals:** ${goals}

---

## GENERATE THE FOLLOWING 6 SECTIONS:

### 1. CREATOR OVERVIEW
- Profile summary and analysis
- Metrics assessment with grade (A-F)
- Current state evaluation
- Critical observations about growth trends and content-audience fit

### 2. THE OPPORTUNITY (Demand Analysis)
**Target Audience Psychology (4 Key Drivers):**
1. Social pressure / aspirational desires driving their interest
2. Frustration with generic solutions they've tried
3. Need for safe/guided environment
4. "Transformation" mindset triggers

**Market Gap Analysis:**
\`\`\`
[Free Generic Content] ←── GAP ──→ [Expensive 1:1 Training]
                            ↑
                    YOUR OPPORTUNITY
           (Accessible, specialized, supported)
\`\`\`

- Where competitors are falling short
- The unmet need in this niche

### 3. THE NUMBERS (Audience Value Projection)

**IMPORTANT - Revenue Calculation Formula:**
For entry-level digital products (price range €50-€100), you MUST use this exact formula:

**Projected Revenue = Followers × (Engagement Rate / 100) × 0.40 × Product Price**

Example: 68,000 followers × 1.5% engagement × 40% × €60 = 68,000 × 0.015 × 0.40 × €60 = €24,480

Show this calculation step-by-step in the document so the creator can see how the numbers are derived.

For higher-priced products (Core €150-€300, Premium €500+), use progressively lower conversion multipliers:
- Core products: Followers × (Engagement Rate / 100) × 0.10 × Product Price
- Premium/VIP products: Followers × (Engagement Rate / 100) × 0.02 × Product Price

**Revenue Projections by Product Tier:**
| Product Type | Price Point | Formula | Projected Revenue |
|--------------|-------------|---------|-------------------|
| Digital Product (Entry) | €X | Followers × ER × 40% × Price | €X |
| Group Program (Core) | €X | Followers × ER × 10% × Price | €X |
| VIP/1:1 (Premium) | €X | Followers × ER × 2% × Price | €X |

- Show the total combined revenue potential
- Annual revenue potential (with repeat launches)
- Lifetime customer value estimation

### 4. PRODUCT SUGGESTIONS

**Product 1: ENTRY PRODUCT**
- **Name:** [Creative product name]
- **Tagline:** [One-liner value prop]
- **Format:** Digital download (eBook/Guide/Templates)
- **Price:** $X-$X
- **What's Included:** (5-7 items)

**Product 2: CORE PRODUCT**
- **Name:** [Creative product name]
- **Tagline:** [One-liner value prop]
- **Format:** Group coaching/Online course
- **Price:** $X-$X
- **What's Included:** (7-10 items)

**Product 3: PREMIUM PRODUCT**
- **Name:** [Creative product name]
- **Tagline:** [One-liner value prop]
- **Format:** 1:1 coaching/VIP experience
- **Price:** $X-$X
- **What's Included:** (5-7 premium items)

### 5. IMPLEMENTATION PLAN (14-Day Strategy)

*If you decide to move forward, we will use this launch structure via Stories:*

| 01 | 02 | 03 |
|---|---|---|
| **Phase 1: Warm-Up (Days 1-3)** | **Phase 2: Value Delivery (Days 4-9)** | **Phase 3: Open Cart (Days 10-14)** |
| Post Stories highlighting the most common concerns you see. Share real questions (anonymized) and tease that you're working on something to help. No selling, just building anticipation. | Drop mini-lessons on key topics. Break objections by showing quick wins they can implement immediately. Build trust by giving away genuinely useful content. | Launch with a clear offer, limited-time pricing, and genuine urgency. Use testimonials from people you've helped and show the transformation: from their current state to their desired outcome. |

### 6. IMMEDIATE VALIDATION (Test Carousel)

**Purpose:** Test demand before creating the full product. Post these 3 Stories to gauge interest.

**Story 1 - The Hook (Pain Point):**
> "[Exact text for a story that calls out the main struggle your audience faces - make it relatable and specific]"

**Story 2 - The Agitation (Deeper Problem):**
> "[Exact text that deepens the emotional connection - what happens if they don't solve this? What have they tried that didn't work?]"

**Story 3 - The Solution + CTA:**
> "[Exact text introducing that you're working on something to help + a clear call-to-action like 'DM me X if you want early access']"

**How to Measure Success:**
- **50+ DMs/replies** = Strong demand - proceed with full launch
- **20-50 DMs/replies** = Moderate interest - do more warm-up content
- **<20 DMs/replies** = Weak signal - revisit positioning or audience fit

Output in clean markdown format with clear headers and tables.`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 5000,
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
    console.error("Error generating Monetization Gameplan:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to generate content", details: errorMessage },
      { status: 500 }
    );
  }
}
