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
    } = data;

    const prompt = `You are an expert digital product strategist and monetization consultant. Generate a comprehensive Monetization Gameplan based on the following creator data. Be specific, strategic, and actionable.

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

## GENERATE THE FOLLOWING SECTIONS:

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
**Conversion Funnel Projection:**
- Total Followers → Active Followers (engaged)
- Active Followers → Warm Leads (consistent engagement)
- Warm Leads → Hot Leads (ready to buy)
- Hot Leads → Buyers (converted)

**Revenue Projections by Product Tier:**
| Product Type | Price Point | Expected Buyers | Projected Revenue |
|--------------|-------------|-----------------|-------------------|
| Digital Product (Entry) | $ | X | $ |
| Group Program (Core) | $ | X | $ |
| VIP/1:1 (Premium) | $ | X | $ |

- Annual revenue potential
- Lifetime customer value estimation

### 4. PRODUCT SUGGESTIONS (3 Tiers)

**TIER 1: ENTRY PRODUCT (Low price, high volume)**
- Suggested Name & Tagline
- Format: Digital download
- Price Point: $X-$X
- Purpose in funnel: Lead magnet / entry point
- What's Included: (5-7 items)
- Psychological Positioning: Why they'll buy this

**TIER 2: CORE PRODUCT (Mid price, relationships)**
- Suggested Name & Tagline
- Format: Group coaching/course
- Price Point: $X-$X
- Purpose in funnel: Main revenue driver
- What's Included: (7-10 items)
- Psychological Positioning: Why they'll upgrade

**TIER 3: PREMIUM PRODUCT (High price, transformation)**
- Suggested Name & Tagline
- Format: 1:1 coaching/VIP
- Price Point: $X-$X
- Purpose in funnel: High-touch, high-value
- What's Included: (5-7 premium items)
- Psychological Positioning: Why they'll invest

### 5. IMPLEMENTATION PLAN (14-Day Overview)

\`\`\`
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│   PHASE 1       │   │   PHASE 2       │   │   PHASE 3       │
│   WARM UP       │   │   VALUE         │   │   OPEN CART     │
│   (Days 1-3)    │   │   (Days 4-9)    │   │   (Days 10-14)  │
│                 │   │                 │   │                 │
│ • Survey        │   │ • Free value    │   │ • Launch        │
│ • Build trust   │   │ • Framework     │   │ • Social proof  │
│ • Create buzz   │   │ • Ownership     │   │ • Urgency       │
└─────────────────┘   └─────────────────┘   └─────────────────┘
\`\`\`

**Phase Summaries:**
- Phase 1: What to focus on
- Phase 2: What to deliver
- Phase 3: How to close

### 6. VALIDATION TEST (Carousel Content)
**Purpose:** Test demand before creating full product

**3-Slide Validation Carousel:**

**Slide 1 (Hook):**
[Identify the pain point - exact text]

**Slide 2 (Agitation):**
[Deepen emotional connection - exact text]

**Slide 3 (Solution + CTA):**
[Offer value and request action - exact text]

**Success Metrics:**
- 50+ comments = Confirmed demand → Launch immediately
- 20-50 comments = Moderate demand → More warm-up needed
- <20 comments = Weak demand → Revisit positioning

### 7. IMMEDIATE NEXT STEPS
1. [First action to take]
2. [Second action]
3. [Third action]
4. [Fourth action]
5. [Fifth action]

Output in clean markdown format with clear headers, tables, and visual elements where appropriate.`;

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
