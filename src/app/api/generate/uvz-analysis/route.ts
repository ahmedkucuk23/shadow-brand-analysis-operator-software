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
      niche,
      coreExpertise,
      uniqueMethods,
      credentials,
      primaryPainPoints,
      coreDesires,
      specificTransformation,
    } = data;

    const prompt = `You are an expert positioning strategist. Generate a comprehensive UVZ (Unique Value Zone) Analysis that creates 20 unique positioning statements and selects the top options for offer development.

## THE UVZ FORMULA
\`\`\`
UVZ = [SPECIFIC RESULT] + [UNIQUE MECHANISM] + [DIFFERENTIATOR]
\`\`\`

## INPUT DATA:

**From Personality DNA:**
${personalityDNA || "Not provided - use the following:"}
- Core Expertise: ${coreExpertise}
- Unique Methods/Frameworks: ${uniqueMethods}
- Credentials: ${credentials}

**From Audience DNA:**
${audienceDNA || "Not provided - use the following:"}
- Primary Pain Points: ${primaryPainPoints}
- Core Desires: ${coreDesires}
- Specific Transformation Wanted: ${specificTransformation}

**Niche:** ${niche}

---

## GENERATE THE FOLLOWING SECTIONS:

### 1. INPUT ANALYSIS SUMMARY
**Creator Strengths:**
- Key expertise areas to leverage
- Unique methodologies that stand out
- Proof points that build credibility

**Audience Needs:**
- Top 3 pain points to address
- Core desires to fulfill
- Transformation they're seeking

### 2. UVZ GENERATION (20 OPTIONS)

Generate 20 unique positioning statements across these categories:

**SPEED-BASED (4 UVZs)** - Faster results
Format: "Get [RESULT] in [SHORT TIME] instead of [LONG TIME]"

**METHOD-BASED (4 UVZs)** - Unique approach
Format: "The [NAME] method that [MECHANISM]"

**AVOIDANCE-BASED (4 UVZs)** - Without pain
Format: "[RESULT] without [COMMON PAIN POINT]"

**SPECIFICITY-BASED (4 UVZs)** - Niche focus
Format: "For [SPECIFIC AUDIENCE] who want [SPECIFIC RESULT]"

**COMBINATION-BASED (4 UVZs)** - Multiple benefits
Format: "[RESULT A] + [RESULT B] through single [MECHANISM]"

For each UVZ, provide:
\`\`\`
UVZ #[NUMBER]: [NAME]

Statement: "[Full positioning statement]"

Result: What they achieve
Mechanism: How it works
Differentiator: Why it's unique

Scores (1-10):
- Specificity: [X]
- Believability: [X]
- Desirability: [X]
- Total: [X/30]
\`\`\`

### 3. SCORING CRITERIA APPLIED

**Specificity (1-10):**
- 1-3: Vague, generic outcome
- 4-6: Somewhat specific
- 7-10: Highly specific, measurable

**Believability (1-10):**
- 1-3: Sounds too good to be true
- 4-6: Reasonable but no proof
- 7-10: Highly credible with evidence

**Desirability (1-10):**
- 1-3: Nice to have
- 4-6: Would like to have
- 7-10: Must have, urgent need

### 4. TOP 20 RANKED LIST

| Rank | UVZ Name | Category | Total Score | Key Strength |
|------|----------|----------|-------------|--------------|
| 1 | | | /30 | |
| 2 | | | /30 | |
| 3 | | | /30 | |
| 4 | | | /30 | |
| 5 | | | /30 | |
| 6 | | | /30 | |
| 7 | | | /30 | |
| 8 | | | /30 | |
| 9 | | | /30 | |
| 10 | | | /30 | |
| 11 | | | /30 | |
| 12 | | | /30 | |
| 13 | | | /30 | |
| 14 | | | /30 | |
| 15 | | | /30 | |
| 16 | | | /30 | |
| 17 | | | /30 | |
| 18 | | | /30 | |
| 19 | | | /30 | |
| 20 | | | /30 | |

### 5. TOP 3 DEEP DIVE

For each of the top 3 UVZs:

**#1: [UVZ NAME]**

**Full Positioning Statement:**
[Complete 2-3 sentence positioning that could be used in marketing]

**Why This Works:**
- Audience alignment: [How it matches their needs]
- Creator credibility: [Why they can deliver this]
- Market gap fit: [What opportunity it captures]

**Potential Offer Names:**
1. [Option 1]
2. [Option 2]
3. [Option 3]

**Objection Preemption:**
- Main objection it addresses: [Objection]
- How it creates curiosity: [Hook element]

---

**#2: [UVZ NAME]**
[Same structure as #1]

---

**#3: [UVZ NAME]**
[Same structure as #1]

### 6. FINAL RECOMMENDATION

**Selected UVZ for Offer Development:**
[The chosen positioning - full statement]

**Rationale:**
- Why this one over others
- How it uniquely combines creator strengths + audience needs
- The market opportunity it captures
- Growth potential

**Suggested Next Steps:**
1. Validate with audience (how)
2. Develop offer around this positioning
3. Create content themes

Output in clean markdown format with clear headers, tables, and structured formatting.`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 6000,
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
    console.error("Error generating UVZ Analysis:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to generate content", details: errorMessage },
      { status: 500 }
    );
  }
}
