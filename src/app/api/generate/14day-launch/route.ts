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
      productDNA,
      audienceDNA,
      personalityDNA,
      offerName,
      tagline,
      pricing,
      launchTime,
      closeTime,
      timezone,
      cartOpenDays,
      earlyBirdBonus,
      earlyBirdSpots,
      guarantee,
      painPoints,
      desires,
      transformation,
      mechanism,
      socialProof,
    } = data;

    const prompt = `You are an expert launch strategist. Generate a comprehensive 14-Day Instagram Story Launch System. This is a psychological, story-based launch framework for selling digital products through Instagram Stories.

## INPUT DATA:

**From Product DNA:**
${productDNA || "Use the offer details below"}

**From Audience DNA:**
${audienceDNA || "Use the audience details below"}

**From Personality DNA:**
${personalityDNA || "Use the voice/tone guidelines below"}

**Offer Details:**
- Offer Name: ${offerName}
- Tagline: ${tagline}
- Pricing: ${pricing}

**Launch Settings:**
- Launch Time: ${launchTime || "21:00"}
- Close Time: ${closeTime || "21:00"}
- Timezone: ${timezone || "CET"}
- Cart Open Days: ${cartOpenDays || "5"}

**Early Bird:**
- Bonus: ${earlyBirdBonus}
- Spots: ${earlyBirdSpots}

**Guarantee:** ${guarantee}

**Audience:**
- Pain Points: ${painPoints}
- Desires: ${desires}

**Offer:**
- Transformation: ${transformation}
- Mechanism: ${mechanism}

**Social Proof:** ${socialProof}

---

## GENERATE THE COMPLETE 14-DAY LAUNCH PLAYBOOK:

### FRAMEWORK OVERVIEW

\`\`\`
PHASE 1: WARM UP (Days 1-3)
├── Day 1: The Survey
├── Day 2: Validation & Curiosity
└── Day 3: Commitment Activation

PHASE 2: VALUE DELIVERY (Days 4-7)
├── Day 4: Opportunity
├── Day 5: Integration Day
├── Day 6: Transformation (Framework)
└── Day 7: Integration & Amplification

PHASE 2→3: TRANSITION (Days 8-9)
├── Day 8: Ownership Experience
└── Day 9: Pre-Cart Q&A

PHASE 3: OPEN CART (Days 10-14)
├── Day 10: Launch Day 🚀
├── Day 11: Social Proof & Momentum
├── Day 12: Questions & Objections
├── Day 13: 24-Hour Warning ⚠️
└── Day 14: Close Cart Day 🔒
\`\`\`

---

### DAY 1: THE SURVEY 🔍
**Phase:** Warm Up (Gold/Amber)
**Psychology:** People want to feel LISTENED TO and part of something
**Goal:** Ask questions, make audience feel heard, gather real problems

**Story Scripts:**

**Story 1 - Opening Hook:**
[Exact text + visual direction]
"[Hook that grabs attention about their struggle]"
📍 Visual: [Description]
🎨 Sticker: Poll or Question

**Story 2 - Survey Question 1:**
[Exact text]
🎨 Sticker: Poll with 2-4 options about duration of struggle

**Story 3 - Survey Question 2:**
[Exact text]
🎨 Sticker: Slider about frustration level

**Story 4 - Survey Question 3:**
[Exact text]
🎨 Sticker: Question box asking for their biggest challenge

**Story 5 - Closing:**
[Exact text thanking them]

**DM Strategy:**
- Respond to everyone who answers
- Screenshot all responses (anonymized)
- Ask follow-up questions to deepen investment

**Checklist:**
□ Post 5+ survey stories
□ Respond to all DMs
□ Screenshot responses
□ Track hot leads

⚠️ **CRITICAL:** NO mention of product/program. Listening mode only.

---

### DAY 2: VALIDATION & CURIOSITY 🎯
**Phase:** Warm Up (Gold/Amber)
**Psychology:** When they feel heard, trust forms rapidly
**Goal:** Show you listened, validate problems, hint at solution

**Story Scripts:**

**Story 1 - The Reveal:**
"Yesterday I asked you about [topic]... WOW. 🤯"
📍 Visual: Text on brand background

**Story 2-6 - Screenshots:**
[5+ anonymized DM screenshots with commentary]
"So many of you said THIS ⬇️"
"And this one hit hard..."

**Story 7 - Pattern Recognition:**
"The same problems keep repeating:
• [Pain 1]
• [Pain 2]
• [Pain 3]"

**Story 8 - The Hint:**
"Here's what I realized... The problem isn't YOU. It's the METHOD.
And I have something that might help...
Tomorrow I'll tell you more. 👀"

**DM Strategy:**
- Proactive thank you messages
- "I noticed your answer. It resonated because..."

**Checklist:**
□ Share 5+ DM screenshots
□ Create curiosity gap
□ Send thank you DMs
□ Build anticipation for tomorrow

---

### DAY 3: COMMITMENT ACTIVATION 🔥
**Phase:** Warm Up (Gold/Amber)
**Psychology:** Small public commitments lead to larger private ones
**Goal:** Announce week dedication, get commitment

**Story Scripts:**

**Story 1 - The Announcement:**
"OK. I made a decision. 💪"

**Story 2 - The Promise:**
"From TOMORROW — I'm dedicating my WHOLE WEEK to show you EXACTLY how to [solve main problem].
FREE. On stories."

**Story 3 - The Hook:**
"You'll learn:
✓ [Specific thing 1]
✓ [Specific thing 2]
✓ [Specific thing 3]"

**Story 4 - The Commitment Ask:**
"Who's IN? 🙋‍♀️"
🎨 Sticker: Poll YES/NO

**Story 5 - The Micro-Commitment:**
"If you want me to remind you when it starts...
Send me 🔥 in DM"

**DM Strategy:**
- Record EVERYONE who sends 🔥 = HOT LEADS
- Respond with enthusiasm to each

**Checklist:**
□ Make announcement
□ Get poll responses
□ Track all 🔥 senders (HOT LEADS list)
□ Respond to every DM

---

### DAY 4: OPPORTUNITY 💡
**Phase:** Value Delivery (Mint/Green)
**Psychology:** Show destination first, then create need for new path
**Goal:** Show what's possible, why old way fails, establish authority

**Story Scripts:**

**Story 1 - Opening:**
"Day 1 of Free Week. Let's GO! 🚀"

**Story 2-3 - Transformation Example:**
[Show what's possible - results/transformation]

**Story 4-5 - Why Old Way Fails:**
"Why most people fail at [goal]:
❌ [Old approach 1]
❌ [Old approach 2]
❌ [Old approach 3]"

**Story 6 - Your Story:**
[Brief credibility/origin story]

**Story 7-8 - Today's Value:**
"ONE thing you can try TODAY:"
[Simple, actionable concept]

**Story 9 - Engagement:**
"Try this and tell me how it goes! 💬"
🎨 Sticker: Question box

**DM Strategy:**
- Answer ALL questions in detail
- Demonstrate expertise through responses

**Checklist:**
□ Deliver first real value
□ Establish authority
□ Give actionable tip
□ Answer every question

---

### DAY 5: INTEGRATION DAY 🔄
**Phase:** Value Delivery (Mint/Green)
**Psychology:** Engagement depth > content volume
**Goal:** Answer DMs, build relationships, let content breathe

**Story Scripts:**

**Story 1 - Check In:**
"How did yesterday's technique work? 🤔"
🎨 Sticker: Poll (Tried it / Not yet / Need help)

**Story 2-4 - Success Shares:**
[Share positive DM reactions - screenshots]

**Story 5-6 - Q&A:**
[Answer questions publicly - screenshot + video response]

**Story 7 - Behind the Scenes:**
[Something personal/relatable]

**Story 8 - Teaser:**
"Tomorrow I'm bringing you a CONCRETE FRAMEWORK.
The exact steps. Stay tuned! 📝"

**DM Strategy:**
- Be available ALL DAY
- Ask questions about their experience
- "Did you try it? How did it feel?"

**Checklist:**
□ Check in with audience
□ Share wins
□ Answer questions publicly
□ Tease tomorrow's framework

---

### DAY 6: TRANSFORMATION (Framework Day) 🏆
**Phase:** Value Delivery (Mint/Green)
**Psychology:** Giving REAL VALUE creates strong reciprocity
**Goal:** Deliver 3-5 step actionable framework

**Story Scripts:**

**Story 1 - Opening:**
"I promised you a FRAMEWORK. Here's GOLD. 🏆"

**Story 2 - Framework Overview:**
"The [X]-Step [Name] Method:
1. [Step name]
2. [Step name]
3. [Step name]
(4. [Step name])
(5. [Step name])"

**Stories 3-7 - Each Step:**
[Video demonstration for each step]
"Step 1: [Name]
[Detailed explanation]"

**Story 8 - Summary Graphic:**
[Clean graphic with all steps - designed for screenshot/save]
"SCREENSHOT THIS! 📸"

**Story 9 - CTA:**
"Try this and report back! I want to hear your results 💪"

**DM Strategy:**
- "Did you screenshot it?"
- "If the FREE content is this good..."
- Proactively message hot leads

**Checklist:**
□ Deliver complete framework
□ Create saveable graphic
□ Record engagement
□ Seed "if free is this good..." thought

---

### DAY 7: INTEGRATION & AMPLIFICATION 📈
**Phase:** Value Delivery (Mint/Green)
**Psychology:** Social proof from peers outweighs self-promotion 10:1
**Goal:** Show wins from framework, build anticipation

**Story Scripts:**

**Story 1 - Gratitude:**
"I can't believe the messages I woke up to... 🥹"

**Stories 2-7 - Win Screenshots:**
[5-8 screenshots of positive feedback/results]
"LOOK at this! 👀"
"And THIS one..."

**Story 8 - The Iceberg:**
"And this... is just the TIP of the iceberg.
The framework you learned? That's maybe 10% of what I know."

**Story 9 - Cliffhanger:**
"Tomorrow... something BIG.
Stay online 👀🔥"

**DM Strategy:**
- Actively ask for experiences
- Hint about tomorrow to hot leads
- "I think what's coming might be perfect for you..."

**Checklist:**
□ Share 5-8 success screenshots
□ Create "iceberg" anticipation
□ Message hot leads about tomorrow
□ Build maximum curiosity

---

### DAY 8: OWNERSHIP EXPERIENCE 💭
**Phase:** Transition (Orange)
**Psychology:** Mental ownership precedes physical purchase
**Goal:** Introduce "complete system" concept without revealing

**Story Scripts:**

**Story 1 - Reflection:**
"That framework you learned? That was only 10% of what I know."

**Story 2-3 - The Vision:**
"IMAGINE... having a COMPLETE SYSTEM.
Step by step.
Week by week.
Everything mapped out."

**Story 4 - Future Pacing:**
"Imagine in [X weeks]...
Your [specific result] looks completely different.
You wake up feeling [emotion].
People start noticing..."

**Story 5 - The Tease:**
"I've been working on something.
Something I'm really proud of.
Limited spots available."

**Story 6 - Cliffhanger:**
"TOMORROW I'm announcing the details.
Be online at [TIME] 🔥"

**DM Strategy:**
- Message ALL hot leads
- "I think this might be PERFECT for you. Be online tomorrow!"

**Checklist:**
□ Create mental ownership
□ Future pace the transformation
□ Tease without revealing
□ DM all hot leads

⚠️ **CRITICAL:** NO price reveal yet, just teaser

---

### DAY 9: PRE-CART Q&A ❓
**Phase:** Transition (Orange)
**Psychology:** Handle objections proactively, not reactively
**Goal:** Address objections BEFORE opening, announce exact time

**Story Scripts:**

**Story 1 - Tomorrow Announcement:**
"TOMORROW. The doors open.
But FIRST..."

**Story 2 - Objection Handling Setup:**
"I want you to enter with ZERO DOUBTS.
So ask me ANYTHING."
🎨 Sticker: Question box

**Stories 3-7 - FAQ Answers:**
[Address 5-7 common objections]

**FAQ Topics to Cover:**
- "I don't have time" → [Answer]
- "It's too expensive" → [Answer]
- "I've tried things before" → [Answer]
- "What if it doesn't work for me?" → [Answer]
- "I need [equipment/gym/etc]" → [Answer]

**Story 8 - Guarantee:**
"Plus... there's a [X]-day guarantee.
If [conditions], full refund. No questions."

**Story 9 - Final Announcement:**
"TOMORROW at [EXACT TIME] — doors open.
First spots go FAST 🔥
Set your alarm ⏰"

**DM Strategy:**
- Direct message ALL hot leads with exact time
- "Be there. I don't want you to miss this."

**Checklist:**
□ Answer objections publicly
□ State guarantee clearly
□ Announce EXACT time
□ DM every hot lead

---

### DAY 10: LAUNCH DAY 🚀
**Phase:** Open Cart (Coral/Red)
**Psychology:** First sales generate more sales through social proof
**Goal:** Open cart, create FOMO, momentum energy

**BEFORE Opening (Morning):**

**Story 1-3 - Countdown:**
"Today is THE day!
Doors open in [X] hours..."
🎨 Sticker: Countdown to [TIME]

**AT EXACT TIME:**

**Story 4 - DOORS OPEN:**
"🚀 DOORS ARE OPEN! 🚀
[OFFER NAME] is LIVE!
Link in bio ⬇️"

**Stories 5-10 - What They Get:**
[Slide for each component]
"Here's what you get:
✓ [Component 1]
✓ [Component 2]
...etc"

**Story 11 - Pricing:**
"INVESTMENT:
💎 STARTER: $[X]
⭐ COMPLETE: $[X]
👑 VIP: $[X]
Link in bio!"

**AFTER EACH PURCHASE:**

"🎉 FIRST SPOT SOLD!"
"WTF?! Another one! 🤯🔥"
"Only [X] spots left for early bird bonus!"

**DM Strategy:**
- Message ALL hot leads with link THE MOMENT it opens
- Welcome each new buyer immediately
- Respond FAST to questions

**Checklist:**
□ Build countdown anticipation
□ Open at EXACT time
□ Show every component
□ Celebrate every sale publicly
□ Fast DM responses

---

### DAY 11: SOCIAL PROOF & MOMENTUM 💪
**Phase:** Open Cart (Coral/Red)
**Psychology:** Seeing others buy = safety in decision
**Goal:** Share buyer DMs, maintain momentum

**Story Scripts:**

**Story 1 - Morning Wow:**
"I woke up and... WOW. You're incredible 🥹"

**Stories 2-7 - New Member DMs:**
[5-8 screenshots of buyer messages]
"Welcome [Name]! 🎉"
"Another one!"

**Story 8 - Program Teaser:**
[Snippet from inside the program]
"Sneak peek of what members are already accessing..."

**Story 9 - Still Open:**
"Spots still available — but not forever.
Link in bio 💪"

**DM Strategy:**
- Message fence-sitters: "I saw you've been watching. Can I help?"
- Check in with new buyers

**Checklist:**
□ Share 5-8 buyer DMs
□ Show program sneak peek
□ Remind spots available
□ Reach out to watchers

---

### DAY 12: FAQ DAY 🤔
**Phase:** Open Cart (Coral/Red)
**Psychology:** Late buyers need more reassurance
**Goal:** Address remaining objections, remove barriers

**Story Scripts:**

**Story 1 - Understanding:**
"I know some of you are still thinking.
That's OK. But..."

**Story 2 - Q&A Setup:**
"Let's solve ALL your doubts.
Ask me ANYTHING."
🎨 Sticker: Question box

**Stories 3-8 - Public FAQ:**
[Answer 5-7 questions publicly]

**Story 9 - Encouragement:**
"Your questions are GOOD.
But don't let them STOP you.
Sometimes we need to trust and jump."

**Story 10 - Tomorrow Warning:**
"TOMORROW: 24 hours until closing. ⏰"

**DM Strategy:**
- Direct approach to fence-sitters
- "I noticed you're interested. What's holding you back?"
- Address specific concerns

**Checklist:**
□ Open Q&A
□ Answer publicly
□ Warn about closing tomorrow
□ DM fence-sitters directly

---

### DAY 13: 24-HOUR WARNING ⚠️
**Phase:** Open Cart (Intensifying Red)
**Psychology:** Loss aversion > desire for gain (2x more powerful)
**Goal:** Maximum urgency, force decision

**Story Scripts:**

**Story 1 - Warning:**
"⚠️ WARNING: 24 HOURS LEFT."

**Story 2 - Deadline:**
"Tomorrow at [TIME] — doors CLOSE.
Not "maybe." Not "we'll see."
CLOSE. Forever."

**Story 3-4 - Emotional Contrast:**
"Picture yourself in [timeframe]...

WITHOUT joining:
❌ [Same struggle]
❌ [Same frustration]
❌ [Same results]

WITH joining:
✅ [New reality]
✅ [New feeling]
✅ [New results]"

**Story 5 - Social Proof:**
[Screenshot of how many bought]
"These women are already building their dream [result].
Will you join them?"

**Story 6 - Final Call:**
🎨 Sticker: Countdown to close

**DM Strategy:**
- Final message to ALL leads
- "24 hours until doors close. I don't want you to miss this ❤️"

**Checklist:**
□ Create urgency
□ Show contrast (with/without)
□ Use countdown sticker
□ Final DM to all leads

---

### DAY 14: CLOSE CART DAY 🔒
**Phase:** Open Cart (Maximum Red)
**Psychology:** 30-40% of sales happen in final hours
**Goal:** Final countdown, actual close

**MORNING:**

**Story 1:**
"🔒 LAST DAY.
Today at [TIME] — CLOSED. Forever."

**COUNTDOWN THROUGHOUT DAY:**

**6 HOURS:** "6 hours left ⏰"
**4 HOURS:** "4 hours. This is real."
**2 HOURS:** "2 HOURS. This is IT."
**1 HOUR:** "60 minutes. Link in bio 🔥"
**30 MIN:** "30 MINUTES!!! Last chance!"
**10 MIN:** "10 MINUTES! Who else?!"
**5 MIN:** "5... 4... 3... 2... 1... ⏰"

**CLOSE:**

"🔒 CLOSED.
Thank you to EVERYONE who joined.
To the [X] women who trusted me.
We start [date]. I can't wait.

For everyone else — see you next time. ❤️"

**DM Strategy:**
- Morning: All remaining leads
- 2 hours before: Reminder
- After close: Graceful thank you to non-buyers

**Checklist:**
□ Post countdown updates
□ Create urgency
□ Close at EXACT time
□ Thank everyone (buyers and watchers)
□ Send graceful goodbye to non-buyers

---

### LAUNCH SUCCESS METRICS

**Day-by-Day Tracking:**
| Day | Stories | DMs Sent | DMs Received | Engagement |
|-----|---------|----------|--------------|------------|
| 1 | | | | |
| ... | | | | |
| 14 | | | | |

**Conversion Tracking:**
- Hot leads identified: ___
- Cart opens: ___
- Purchases: ___
- Conversion rate: ___%

**Revenue:**
- Starter sales: ___
- Complete sales: ___
- VIP sales: ___
- Total revenue: ___

---

### KEY SUCCESS FACTORS REMINDER

1. ⚠️ NO product mention Days 1-7 (only value + listening)
2. 📸 Screenshot EVERYTHING for social proof
3. 🔥 Track hot leads (who engages, sends 🔥, asks questions)
4. 💬 Personalized DMs throughout (not broadcasts)
5. ⏰ Real urgency on Days 13-14 (actually close cart)
6. 📩 Answer EVERY question/DM during launch

Output in clean markdown format with clear headers, phases color-coded, and actionable daily playbooks.`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 10000,
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
    console.error("Error generating 14-Day Launch:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to generate content", details: errorMessage },
      { status: 500 }
    );
  }
}
