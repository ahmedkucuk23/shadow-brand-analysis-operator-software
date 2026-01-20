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
      personalityDNA,
      audienceDNA,
      selectedUVZ,
      offerName,
      tagline,
      duration,
      niche,
      transformationBefore,
      transformationAfter,
      priceStarter,
      priceComplete,
      priceVIP,
      language,
    } = data;

    const languageInstruction = language && language !== "en"
      ? `\n\n**IMPORTANT: Generate ALL content in ${language === "bs" ? "Bosnian" : language === "hr" ? "Croatian" : language === "sr" ? "Serbian" : language === "de" ? "German" : language === "es" ? "Spanish" : language === "fr" ? "French" : language === "it" ? "Italian" : language === "pt" ? "Portuguese" : language === "nl" ? "Dutch" : language === "pl" ? "Polish" : language === "tr" ? "Turkish" : language === "ru" ? "Russian" : language === "ar" ? "Arabic" : "the specified language"}. The entire document must be written in this language, including all headers, descriptions, and examples.**\n`
      : "";

    const prompt = `You are an expert coaching program designer. Generate a comprehensive Coaching Offer document that transforms the selected UVZ into a complete, structured coaching program with detailed action plans, worksheets, and module outlines.${languageInstruction}

## INPUT DATA:

**From Personality DNA:**
${personalityDNA || "Use creator's expertise and credentials to inform the program structure"}

**From Audience DNA:**
${audienceDNA || "Use audience's pain points and desires to shape the transformation"}

**Selected UVZ (Positioning):**
${selectedUVZ}

**Offer Details:**
- Offer Name: ${offerName}
- Tagline: ${tagline}
- Duration: ${duration || "5 weeks"}
- Niche: ${niche}

**Transformation:**
- Before State: ${transformationBefore}
- After State: ${transformationAfter}

**Pricing:**
- Starter: $${priceStarter}
- Complete: $${priceComplete}
- VIP: $${priceVIP}

---

## GENERATE THE FOLLOWING SECTIONS:

### SECTION 1: SUPPORTING REFERENCES SUMMARY

**Creator Credentials Applied:**
- Key credentials to highlight
- Unique methodology to feature
- Authority positioning

**Target Audience Applied:**
- Primary avatar description
- Key pain points addressed
- Transformation promised

**Core Promise (from UVZ):**
"In [TIMEFRAME], you will [SPECIFIC RESULT] through [MECHANISM], even if [COMMON OBJECTION]."

---

### SECTION 2: VISCERAL TRANSFORMATION MAP

**BEFORE State (Vivid Description):**

| Category | Before State |
|----------|--------------|
| Physical | [What they see/experience physically] |
| Emotional | [How they feel daily - frustration, doubt, etc.] |
| Mental | [What they think about themselves] |
| Social | [How others perceive them] |
| Behavioral | [What they do or don't do] |

**AFTER State (Vivid Description):**

| Category | After State |
|----------|-------------|
| Physical | [Visible transformation] |
| Emotional | [New feelings - confidence, pride, etc.] |
| Mental | [New beliefs and mindset] |
| Social | [New perception by others] |
| Behavioral | [New habits and actions] |

**The Transformation Bridge:**
"From [BEFORE in one line] → To [AFTER in one line]"

---

### SECTION 3: OFFER USP (Unique Selling Proposition)

**Offer Name:** ${offerName}™

**Tagline:** ${tagline}

**The Big Promise:**
"In [TIMEFRAME], you will [SPECIFIC RESULT] through [MECHANISM]"

**Why This Is Different:**
1. [Unique mechanism explanation]
2. [What others get wrong]
3. [What makes this approach work]

**Who It's For:**
✓ [Ideal customer trait 1]
✓ [Ideal customer trait 2]
✓ [Ideal customer trait 3]
✓ [Ideal customer trait 4]
✓ [Ideal customer trait 5]

**Who It's NOT For:**
✗ [Disqualifying trait 1]
✗ [Disqualifying trait 2]
✗ [Disqualifying trait 3]

---

### SECTION 4: MENTORSHIP EXECUTION

#### PART A: 5-WEEK DETAILED ACTION PLAN

**WEEK 1: [Theme/Name]**
- Primary Focus: [Main objective]
- Key Concept to Master: [Core learning]
- Daily Tasks:
  - Day 1: [Task]
  - Day 2: [Task]
  - Day 3: [Task]
  - Day 4: [Task]
  - Day 5: [Task]
  - Day 6: [Task]
  - Day 7: [Task/Rest]
- Milestone to Hit: [Measurable outcome]
- Mindset Focus: [Mental shift needed]

**WEEK 2: [Theme/Name]**
[Same structure as Week 1]

**WEEK 3: [Theme/Name]**
[Same structure as Week 1]

**WEEK 4: [Theme/Name]**
[Same structure as Week 1]

**WEEK 5: [Theme/Name]**
[Same structure as Week 1]

---

#### PART B: DEVELOPED WORKSHEETS (10 Total)

**WORKSHEET #1: [NAME]**
- Purpose: [Why they need this]
- When Used: Week 1, Day 1
- Format: [Checklist / Fill-in / Tracker / Assessment]
- Sections:
  1. [Section Name] - [Elements included]
  2. [Section Name] - [Elements included]
  3. [Section Name] - [Elements included]
- Key Outcome: [What completing this achieves]

**WORKSHEET #2: [NAME]**
[Same structure - Week 1 baseline/assessment]

**WORKSHEET #3: [NAME]**
[Same structure - Week 1-2 planning/goals]

**WORKSHEET #4: [NAME]**
[Same structure - Week 1-2 planning/goals]

**WORKSHEET #5: [NAME]**
[Same structure - Weekly tracking/progress]

**WORKSHEET #6: [NAME]**
[Same structure - Weekly tracking/progress]

**WORKSHEET #7: [NAME]**
[Same structure - Week 2-4 skill development]

**WORKSHEET #8: [NAME]**
[Same structure - Week 2-4 skill development]

**WORKSHEET #9: [NAME]**
[Same structure - Week 4-5 integration]

**WORKSHEET #10: [NAME]**
[Same structure - Week 5 maintenance/lifestyle]

---

#### PART C: PROGRAM OUTLINE (5 Modules)

**MODULE 1: [Name] - Foundation**
- Duration: X lessons
- Topics Covered:
  - Lesson 1.1: [Topic] - [Description]
  - Lesson 1.2: [Topic] - [Description]
  - Lesson 1.3: [Topic] - [Description]
  - Lesson 1.4: [Topic] - [Description]
  - Lesson 1.5: [Topic] - [Description]
- Video Content: X minutes total
- Downloadable Resources: [List]
- End of Module Assignment: [Task]

**MODULE 2: [Name] - Core Skill Building**
[Same structure as Module 1]

**MODULE 3: [Name] - Advanced Application**
[Same structure as Module 1]

**MODULE 4: [Name] - Optimization/Troubleshooting**
[Same structure as Module 1]

**MODULE 5: [Name] - Integration/Maintenance**
[Same structure as Module 1]

---

### SECTION 5: PRICING STRATEGY

**Price Tiers:**

| Tier | Name | Price | Includes |
|------|------|-------|----------|
| Starter | [Name] | $${priceStarter} | [Core offering list] |
| Complete | [Name] | $${priceComplete} | Starter + [Additions] |
| VIP | [Name] | $${priceVIP} | Complete + [Premium features] |

**Pricing Psychology:**
- Why these price points work
- Value justification
- Comparison to alternatives

**Payment Options:**
- Pay in full: [Discount if applicable]
- Payment plan: [Options]

**Guarantee:**
- Type: [Money-back / Results-based]
- Duration: [X days]
- Conditions: [Requirements]

---

### SECTION 6: BONUSES

**Early Bird Bonus:**
- What: [Specific bonus]
- Value: $[X]
- Why valuable: [Explanation]
- Limited to: First [X] buyers

**Fast Action Bonus:**
- First [X] buyers get: [Specific bonus]
- Value: $[X]

**Stack Summary:**
| Component | Value |
|-----------|-------|
| Core Program | $[X] |
| Worksheets | $[X] |
| [Component] | $[X] |
| [Component] | $[X] |
| [Bonus 1] | $[X] |
| [Bonus 2] | $[X] |
| **Total Value** | **$[X]** |
| **Your Price** | **$${priceComplete}** |
| **You Save** | **$[X]** |

Output in clean markdown format with clear headers, tables, and organized structure.`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 8000,
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
    console.error("Error generating Coaching Offer:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to generate content", details: errorMessage },
      { status: 500 }
    );
  }
}
