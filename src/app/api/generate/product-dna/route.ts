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
      coachingCharter,
      coachingOffer,
      audienceDNA,
      personalityDNA,
      offerName,
      tagline,
      surfaceProblem,
      realProblem,
      costOfInaction,
      failedSolutions,
      mechanismName,
      mechanismExplanation,
      pillars,
      differentiators,
      corePromise,
      transformation,
      pricing,
      deliverables,
      guarantee,
    } = data;

    const prompt = `You are an expert product strategist. Generate a comprehensive Product DNA document - the master reference for all marketing, sales, and launch materials. This document serves as the foundation for the 14-Day Launch System.

## INPUT DATA:

**From Coaching Charter:**
${coachingCharter || "Use the offer details below"}

**From Coaching Offer:**
${coachingOffer || "Use the offer details below"}

**From Audience DNA:**
${audienceDNA || "Use the audience details below"}

**From Personality DNA:**
${personalityDNA || "Use the creator details below"}

**Offer Details:**
- Offer Name: ${offerName}™
- Tagline: ${tagline}

**The Problem:**
- Surface Problem (what they say): ${surfaceProblem}
- Real Problem (root cause): ${realProblem}
- Cost of Inaction: ${costOfInaction}
- Failed Solutions They've Tried: ${failedSolutions}

**The Solution:**
- Mechanism Name: ${mechanismName}™
- How It Works: ${mechanismExplanation}
- Core Pillars: ${pillars}
- Differentiators: ${differentiators}

**The Offer:**
- Core Promise: ${corePromise}
- Transformation: ${transformation}
- Pricing: ${pricing}
- Deliverables: ${deliverables}
- Guarantee: ${guarantee}

---

## GENERATE THE FOLLOWING SECTIONS:

### COVER PAGE CONTENT
- Title: "${offerName}™ PRODUCT DNA"
- Subtitle: "Complete Offer Framework"
- Purpose statement

---

### SECTION 1: PROBLEM STATEMENT (Deep Dive)

**The Surface Problem:**
What they say when asked about their struggle:
- Quote 1: "[Exact words they use]"
- Quote 2: "[Exact words they use]"
- Quote 3: "[Exact words they use]"

**The Real Problem:**
What's actually causing their struggle (they may not know this):
- Root cause 1: [Explanation]
- Root cause 2: [Explanation]
- Root cause 3: [Explanation]

**The Cost of Inaction:**
| Timeframe | Cost |
|-----------|------|
| Short-term (30 days) | [Consequence] |
| Medium-term (6 months) | [Consequence] |
| Long-term (1 year+) | [Consequence] |
| Emotional | [Impact] |
| Financial | [Impact] |
| Social | [Impact] |

**The Failed Solutions:**
| Solution Tried | Why It Failed | What They Concluded |
|----------------|---------------|---------------------|
| [Solution 1] | [Reason] | "[Their belief]" |
| [Solution 2] | [Reason] | "[Their belief]" |
| [Solution 3] | [Reason] | "[Their belief]" |
| [Solution 4] | [Reason] | "[Their belief]" |

---

### SECTION 2: SOLUTION FRAMEWORK

**The Mechanism:**
Name: ${mechanismName}™

**How It Works (Simple Explanation):**
"Most [people like them] try to [old way]. But [old way] doesn't work because [reason]. Instead, [your mechanism] works by [simple explanation]. This means [benefit]."

**The Pillars:**

| Pillar | Name | What It Addresses | Outcome |
|--------|------|-------------------|---------|
| 1 | [Name] | [Problem aspect] | [Result] |
| 2 | [Name] | [Problem aspect] | [Result] |
| 3 | [Name] | [Problem aspect] | [Result] |
| 4 | [Name] | [Problem aspect] | [Result] |
| 5 | [Name] | [Problem aspect] | [Result] |

**Why This Works When Others Fail:**
1. [Differentiator 1 - with explanation]
2. [Differentiator 2 - with explanation]
3. [Differentiator 3 - with explanation]

---

### SECTION 3: OFFER STRUCTURE

**Offer Name:** ${offerName}™
**Tagline:** ${tagline}

**The Core Promise:**
"In [TIMEFRAME], you will [SPECIFIC MEASURABLE RESULT] using [MECHANISM], even if [COMMON OBJECTION]."

**Transformation Summary:**
| Aspect | BEFORE | AFTER |
|--------|--------|-------|
| Physical | [State] | [State] |
| Emotional | [State] | [State] |
| Mental | [State] | [State] |
| Behavioral | [State] | [State] |
| Social | [State] | [State] |

**What's Included:**
| Component | Description | Value |
|-----------|-------------|-------|
| [Component 1] | [Description] | $[X] |
| [Component 2] | [Description] | $[X] |
| [Component 3] | [Description] | $[X] |
| [Component 4] | [Description] | $[X] |
| [Bonus 1] | [Description] | $[X] |
| [Bonus 2] | [Description] | $[X] |
| **TOTAL VALUE** | | **$[X]** |

**Pricing:**
| Tier | Price | Ideal For |
|------|-------|-----------|
| Starter | $[X] | [Who should choose] |
| Complete | $[X] | [Who should choose] |
| VIP | $[X] | [Who should choose] |

---

### SECTION 4: M.O.D.E.A ANALYSIS

Score each dimension 1-10 with justification:

**M - Market (Average: X/10)**
- Market size: X/10 - [Justification]
- Growth trend: X/10 - [Justification]
- Competition level: X/10 - [Justification]

**O - Offer (Average: X/10)**
- Clarity: X/10 - [Justification]
- Uniqueness: X/10 - [Justification]
- Value perception: X/10 - [Justification]

**D - Demand (Average: X/10)**
- Urgency: X/10 - [Justification]
- Frequency: X/10 - [Justification]
- Pain intensity: X/10 - [Justification]

**E - Execution (Average: X/10)**
- Deliverability: X/10 - [Justification]
- Scalability: X/10 - [Justification]
- Creator capability: X/10 - [Justification]

**A - Audience (Average: X/10)**
- Accessibility: X/10 - [Justification]
- Purchasing power: X/10 - [Justification]
- Engagement level: X/10 - [Justification]

**TOTAL M.O.D.E.A SCORE: [X]/50**

Score Interpretation:
- 45-50: Excellent - Launch immediately
- 40-44: Strong - Minor optimizations needed
- 35-39: Good - Some adjustments recommended
- Below 35: Needs significant work

---

### SECTION 5: DELIVERABLES BREAKDOWN

**Video Content:**
| Module | Lessons | Minutes | Topics |
|--------|---------|---------|--------|
| 1 | X | X min | [Topics] |
| 2 | X | X min | [Topics] |
| 3 | X | X min | [Topics] |
| 4 | X | X min | [Topics] |
| 5 | X | X min | [Topics] |
| **TOTAL** | **X** | **X min** | |

**Worksheets:**
| # | Name | Purpose | When Used |
|---|------|---------|-----------|
| 1 | [Name] | [Purpose] | Week X |
| 2 | [Name] | [Purpose] | Week X |
| ... | | | |
| 10 | [Name] | [Purpose] | Week X |

**Bonuses:**
| Bonus | Value | Purpose |
|-------|-------|---------|
| [Bonus 1] | $[X] | [Why included] |
| [Bonus 2] | $[X] | [Why included] |

---

### SECTION 6: KEYWORD LIBRARY

**Primary Keywords** (for content, captions, sales copy):
[List 15-20 keywords]

**Pain Point Keywords** (for hooks):
[List 10-15 pain keywords]

**Desire Keywords** (for benefits):
[List 10-15 desire keywords]

**Transformation Keywords:**
- Before words: [List]
- After words: [List]

**Action Keywords** (for CTAs):
[List 10 action words]

---

### SECTION 7: QUICK REFERENCE CARDS

**Elevator Pitch (30 seconds):**
"${offerName} is a [X]-week program that helps [WHO] achieve [RESULT] through [MECHANISM]. Unlike [alternative], we focus on [differentiator], which means [benefit]. We've helped [X]+ [people] and offer a [guarantee]."

**One-Liner:**
"[RESULT] through [MECHANISM] for [WHO]."

**Problem Statement (for content):**
"Most [audience] struggle with [problem] because [root cause]. The result? [Cost of inaction]."

**Solution Statement (for content):**
"What if you could [result] without [common pain]? That's exactly what [Mechanism Name] does."

**Guarantee Statement:**
"[X]-Day [Type] Guarantee: [Brief terms]"

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
    console.error("Error generating Product DNA:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to generate content", details: errorMessage },
      { status: 500 }
    );
  }
}
