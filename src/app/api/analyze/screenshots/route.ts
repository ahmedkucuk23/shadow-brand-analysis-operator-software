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
    const { images, language } = data;

    if (!images || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json({ error: "No images provided" }, { status: 400 });
    }

    const languageInstruction = language && language !== "en"
      ? `\n\nIMPORTANT: Generate ALL content in ${language === "bs" ? "Bosnian" : language === "hr" ? "Croatian" : language === "sr" ? "Serbian" : language === "de" ? "German" : language === "es" ? "Spanish" : language === "fr" ? "French" : language === "it" ? "Italian" : language === "pt" ? "Portuguese" : language === "nl" ? "Dutch" : language === "pl" ? "Polish" : language === "tr" ? "Turkish" : language === "ru" ? "Russian" : language === "ar" ? "Arabic" : "the specified language"}.`
      : "";

    // Build the content array with all images
    const content: Anthropic.MessageParam["content"] = [];

    // Add each image
    for (const image of images) {
      const { base64, mediaType } = image;
      content.push({
        type: "image",
        source: {
          type: "base64",
          media_type: mediaType,
          data: base64,
        },
      });
    }

    // Add the analysis prompt
    content.push({
      type: "text",
      text: `You are an expert social media analyst and monetization strategist. Analyze these screenshots and extract ALL relevant data you can see.

These screenshots may include:
- Instagram profile pages (bio, follower count, following, posts)
- Instagram Insights (reach, engagement, demographics, growth)
- Social Blade statistics (growth trends, engagement rates)
- Comment sections (sentiment, engagement quality)
- Any other analytics dashboards

EXTRACT AND ANALYZE:

1. **Profile Metrics** (extract exact numbers you can see):
   - Follower count
   - Following count
   - Post count
   - Engagement rate (if shown, or calculate from likes/comments vs followers)
   - Average likes per post
   - Average comments per post

2. **Profile Information**:
   - Username/handle
   - Display name
   - Bio text
   - Location (if shown)
   - Niche/category (infer from content)
   - Link in bio

3. **Growth & Trends** (if Social Blade or Insights visible):
   - Follower growth trend (gaining/losing, rate)
   - Engagement trend
   - Best performing content types
   - Posting frequency

4. **Audience Demographics** (if Insights visible):
   - Gender split
   - Age ranges
   - Top locations
   - Active times

5. **Content Analysis** (from visible posts/grid):
   - Main content themes
   - Content formats used (reels, carousels, single images)
   - Visual style/aesthetic
   - Posting consistency

6. **Comment Sentiment** (if comments visible):
   - Overall sentiment (positive/negative/neutral)
   - Common questions/requests
   - Engagement quality (genuine vs spam)

7. **Monetization Assessment**:
   - Current monetization (if visible - link in bio, shop, etc.)
   - Audience purchase potential
   - Niche monetization opportunities
   - Recommended product types

After extracting all data, generate a COMPLETE MONETIZATION GAMEPLAN based on what you found.${languageInstruction}

## GENERATE THE FOLLOWING SECTIONS:

### 1. CREATOR OVERVIEW
- Profile summary based on extracted data
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

### 3. THE NUMBERS (Audience Value Projection)
**Conversion Funnel Projection:**
Based on the metrics extracted, project:
- Total Followers → Active Followers (engaged)
- Active Followers → Warm Leads
- Warm Leads → Hot Leads
- Hot Leads → Buyers

**Revenue Projections by Product Tier:**
| Product Type | Price Point | Expected Buyers | Projected Revenue |
|--------------|-------------|-----------------|-------------------|

### 4. PRODUCT SUGGESTIONS (3 Tiers)

**TIER 1: ENTRY PRODUCT** (Low price, high volume)
- Suggested Name & Tagline
- Format, Price Point, What's Included

**TIER 2: CORE PRODUCT** (Mid price, relationships)
- Suggested Name & Tagline
- Format, Price Point, What's Included

**TIER 3: PREMIUM PRODUCT** (High price, transformation)
- Suggested Name & Tagline
- Format, Price Point, What's Included

### 5. IMPLEMENTATION PLAN (14-Day Overview)
Quick overview of the launch phases

### 6. VALIDATION TEST (Carousel Content)
3-slide validation carousel to test demand

### 7. IMMEDIATE NEXT STEPS
5 actionable steps to take now

Output in clean markdown format. Be specific with numbers and recommendations based on the actual data extracted from the screenshots.`
    });

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 6000,
      messages: [
        {
          role: "user",
          content: content,
        },
      ],
    });

    const responseContent = message.content[0];
    if (responseContent.type !== "text") {
      throw new Error("Unexpected response type");
    }

    return NextResponse.json({
      content: responseContent.text,
      usage: {
        inputTokens: message.usage.input_tokens,
        outputTokens: message.usage.output_tokens,
      }
    });
  } catch (error) {
    console.error("Error analyzing screenshots:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to analyze screenshots", details: errorMessage },
      { status: 500 }
    );
  }
}
