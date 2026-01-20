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
      ageRange,
      gender,
      location,
      incomeLevel,
      occupation,
      lifeStage,
      platformBehavior,
      selfIdentity,
      desiredIdentity,
      groupBelonging,
      topValues,
      dailyRoutine,
      hobbies,
      surfacePain1,
      surfacePain2,
      surfacePain3,
      deepPain1,
      deepPain2,
      embarrassedAbout,
      immediateDesires,
      ultimateTransformation,
      dreamOutcome,
      objection1,
      objection2,
      objection3,
      hiddenFears,
      currentBelief,
      newBelief,
      enemyExternal,
      enemyInternal,
      avatarName,
    } = data;

    const prompt = `You are an expert customer psychology analyst. Generate a comprehensive Audience DNA (Customer DNA) document based on the following inputs. Be specific, vivid, and psychologically insightful.

## INPUT DATA:

**Demographics:**
- Age Range: ${ageRange}
- Gender: ${gender}
- Location: ${location}
- Income Level: ${incomeLevel}
- Occupation: ${occupation}
- Life Stage: ${lifeStage}

**Platform Behavior:** ${platformBehavior}

**Identity & Psychographics:**
- How they see themselves: ${selfIdentity}
- How they want to be seen: ${desiredIdentity}
- Group they want to belong to: ${groupBelonging}
- Top values: ${topValues}

**Lifestyle:**
- Daily routine: ${dailyRoutine}
- Hobbies/interests: ${hobbies}

**Pain Points:**
Surface-level (what they say):
1. ${surfacePain1}
2. ${surfacePain2}
3. ${surfacePain3}

Deep pain (what they feel):
1. ${deepPain1}
2. ${deepPain2}

What they're embarrassed about: ${embarrassedAbout}

**Desires:**
- Immediate desires (quick wins): ${immediateDesires}
- Ultimate transformation: ${ultimateTransformation}
- Dream outcome (visual): ${dreamOutcome}

**Objections:**
1. ${objection1}
2. ${objection2}
3. ${objection3}

**Hidden Fears:** ${hiddenFears}

**Belief Shift Needed:**
- Current belief: ${currentBelief}
- New belief needed: ${newBelief}

**The Enemy:**
- External (industry/misinformation): ${enemyExternal}
- Internal (habits/approach): ${enemyInternal}

**Avatar Name:** ${avatarName || "Not provided"}

---

## GENERATE THE FOLLOWING SECTIONS:

### 1. DEMOGRAPHIC PROFILE
- Detailed demographic summary
- Platform behavior patterns
- When they're most active on Instagram
- Types of content they engage with

### 2. PSYCHOGRAPHIC DEEP DIVE
- Identity analysis (current vs. aspirational)
- Values hierarchy and what drives decisions
- Social dynamics and influence circles
- Aspirational lifestyle visualization

### 3. PAIN POINTS ANALYSIS
Create a detailed table:
| Surface Pain | Deep Pain | Emotional Trigger | Content Angle |
For each pain point provided

- What they Google at 2am
- What they complain about to friends
- What they'd never admit publicly

### 4. DESIRES & ASPIRATIONS
- Immediate wins they'd pay for today
- The transformation journey (before → after)
- Vivid description of their dream outcome
- How success FEELS to them (emotional language)

### 5. OBJECTIONS FRAMEWORK
For each objection:
- Why they say it
- What they really mean
- How to address it
- Reframe that works

### 6. HIDDEN FEARS ANALYSIS
- Fear of failure manifestation
- Fear of success/visibility
- Fear of judgment
- Fear of wasting resources
- How each fear shows up in buying decisions

### 7. PERSUASIVE PREMISE
- The core belief shift statement
- The external enemy to blame
- The internal enemy to overcome
- The promise formula: "If you [action], you will [result] in [timeframe]"

### 8. CUSTOMER JOURNEY STAGES
For each stage (Unaware → Problem Aware → Solution Aware → Product Aware → Ready to Buy):
- Where they are mentally
- Content that resonates
- Questions they're asking
- Triggers that move them forward

### 9. IDEAL CUSTOMER AVATAR
Create a vivid persona:
- Name: ${avatarName || "[Generate a fitting name]"}
- Age, occupation, situation
- A day in their life (morning to night)
- What they Googled last night
- What they said to their friend
- What they're afraid to admit
- The one thing that would change everything

### 10. LANGUAGE BANK
- Phrases they use to describe their problem
- Words that trigger emotional response
- Objection phrases (verbatim)
- Desire phrases (verbatim)
- Use these exact words in your copy

Output in clean markdown format with clear headers. Be specific and vivid - no generic descriptions.`;

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
    console.error("Error generating Audience DNA:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to generate content", details: errorMessage },
      { status: 500 }
    );
  }
}
