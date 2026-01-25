import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

// GET /api/projects - List all projects for the current user
export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const projects = await db.influencerProject.findMany({
      where: { userId: session.user.id },
      include: {
        influencer: true,
      },
      orderBy: { lastAccessedAt: "desc" },
    });

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST /api/projects - Create a new project
export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { influencerId, name, wizardState } = data;

    if (!influencerId || !name) {
      return NextResponse.json(
        { error: "influencerId and name are required" },
        { status: 400 }
      );
    }

    // Verify the influencer belongs to this user
    const influencer = await db.influencer.findFirst({
      where: {
        id: influencerId,
        userId: session.user.id,
      },
    });

    if (!influencer) {
      return NextResponse.json(
        { error: "Influencer not found" },
        { status: 404 }
      );
    }

    // Default initial wizard state
    const defaultWizardState = {
      currentStep: 1,
      language: "en",
      monetizationGameplan: {
        creatorName: influencer.name,
        handle: influencer.handle || "",
        niche: "",
        followers: "",
        engagementRate: "",
        existingOfferings: "",
        location: "",
        content: null,
      },
      personalityDNA: {
        brandArchetype: "The Coach",
        secondaryArchetype: "",
        coreValues: "",
        missionWho: "",
        missionWhat: "",
        missionHow: "",
        missionBenefit: "",
        certifications: "",
        yearsExperience: "",
        achievements: "",
        clientCount: "",
        uniqueExpertise: "",
        voiceFormalCasual: "5",
        voiceSeriousPlayful: "5",
        voiceTechnicalSimple: "5",
        signaturePhrases: "",
        wordsToAvoid: "",
        emojiUsage: "Moderate",
        contentPillars: "",
        differentiator: "",
        contraryBelief: "",
        originStory: "",
        content: null,
      },
      audienceDNA: {
        ageRange: "",
        gender: "Female",
        location: "",
        incomeLevel: "",
        occupation: "",
        lifeStage: "",
        platformBehavior: "",
        selfIdentity: "",
        desiredIdentity: "",
        groupBelonging: "",
        topValues: "",
        dailyRoutine: "",
        hobbies: "",
        surfacePain1: "",
        surfacePain2: "",
        surfacePain3: "",
        deepPain1: "",
        deepPain2: "",
        embarrassedAbout: "",
        immediateDesires: "",
        ultimateTransformation: "",
        dreamOutcome: "",
        objection1: "",
        objection2: "",
        objection3: "",
        hiddenFears: "",
        currentBelief: "",
        newBelief: "",
        enemyExternal: "",
        enemyInternal: "",
        avatarName: "",
        content: null,
      },
      uvzAnalysis: {
        selectedUVZs: [],
        topUVZ: "",
        content: null,
      },
      coachingOffer: {
        offerName: "",
        tagline: "",
        duration: "5 weeks",
        pricingStarter: "",
        pricingComplete: "",
        pricingVIP: "",
        content: null,
      },
      coachingCharter: {
        content: null,
      },
      productDNA: {
        content: null,
      },
      launch14Day: {
        launchTime: "21:00",
        closeTime: "21:00",
        timezone: "CET",
        content: null,
        dailyPlaybooks: null,
      },
    };

    const project = await db.influencerProject.create({
      data: {
        userId: session.user.id,
        influencerId,
        name,
        wizardState: wizardState || defaultWizardState,
        currentStep: 1,
        completedSteps: [],
        status: "in_progress",
        updatedAt: new Date(),
      },
      include: {
        influencer: true,
      },
    });

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
