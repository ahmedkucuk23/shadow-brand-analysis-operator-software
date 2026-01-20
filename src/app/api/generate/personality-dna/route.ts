import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();

    const {
      brandArchetype,
      secondaryArchetype,
      coreValues,
      missionWho,
      missionWhat,
      missionHow,
      missionBenefit,
      certifications,
      yearsExperience,
      achievements,
      clientCount,
      uniqueExpertise,
      voiceFormalCasual,
      voiceSeriousPlayful,
      voiceTechnicalSimple,
      signaturePhrases,
      wordsToAvoid,
      emojiUsage,
      contentPillars,
      differentiator,
      contraryBelief,
      originStory,
    } = data;

    const prompt = `You are an expert brand strategist. Generate a comprehensive Personality DNA document based on the following inputs. Output should be detailed, specific, and actionable.

## INPUT DATA:

**Brand Archetype:** ${brandArchetype} (Secondary: ${secondaryArchetype || "None"})

**Core Values:** ${coreValues}

**Mission Statement Components:**
- Who I help: ${missionWho}
- What I help them achieve: ${missionWhat}
- How I do it: ${missionHow}
- Ultimate benefit: ${missionBenefit}

**Credentials:**
- Certifications/Training: ${certifications}
- Years of Experience: ${yearsExperience}
- Notable Achievements: ${achievements}
- Number of Clients/Transformations: ${clientCount}
- Unique Expertise: ${uniqueExpertise}

**Voice Characteristics (1-10 scale):**
- Formal ←→ Casual: ${voiceFormalCasual}/10
- Serious ←→ Playful: ${voiceSeriousPlayful}/10
- Technical ←→ Simple: ${voiceTechnicalSimple}/10

**Language Patterns:**
- Signature Phrases: ${signaturePhrases}
- Words to Avoid: ${wordsToAvoid}
- Emoji Usage: ${emojiUsage}

**Content Pillars:** ${contentPillars}

**Differentiators:**
- What makes me different: ${differentiator}
- Contrarian belief about industry: ${contraryBelief}
- Origin story: ${originStory}

---

## GENERATE THE FOLLOWING SECTIONS:

### 1. BRAND IDENTITY CORE
- Primary archetype analysis and how it manifests
- Secondary archetype integration
- Core values explanation (how each shows up in content)
- Polished mission statement

### 2. CREDENTIALS & AUTHORITY POSITIONING
- How to present credentials without bragging
- Social proof talking points
- Authority-building content angles
- Unique expertise positioning

### 3. COMMUNICATION STYLE GUIDE
- Voice description (2-3 sentences)
- Tone variations for different contexts (teaching, selling, supporting)
- Language do's and don'ts
- Sample phrases for common situations

### 4. CONTENT PILLARS BREAKDOWN
For each pillar provided:
- Subtopics to cover
- Content formats that work best
- 3 example post ideas

### 5. CONTENT MIX RECOMMENDATION
- Suggested ratio (transformation/educational/personal/promotional)
- Why this mix works for this archetype

### 6. DIFFERENTIATORS & UNIQUE PERSPECTIVE
- Positioning statement
- "I'm not like other [niche] because..."
- Contrarian angle to emphasize
- Signature story arc

### 7. BRAND VOICE EXAMPLES
- Sample Instagram caption (educational)
- Sample Instagram caption (promotional)
- Sample DM conversation opener
- Sample story talking point

Output in clean markdown format with clear headers.`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4000,
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
    console.error("Error generating Personality DNA:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}
