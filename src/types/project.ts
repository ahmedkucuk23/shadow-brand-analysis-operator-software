// Types for Project History feature

export interface Influencer {
  id: string;
  userId: string;
  name: string;
  handle: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface InfluencerProject {
  id: string;
  userId: string;
  influencerId: string;
  influencer?: Influencer;
  name: string;
  wizardState: WizardState;
  currentStep: number;
  completedSteps: number[];
  status: "in_progress" | "completed";
  createdAt: Date;
  updatedAt: Date;
  lastAccessedAt: Date;
}

// Mirror of the WizardState from the page component
export interface WizardState {
  currentStep: number;
  language: string;
  monetizationGameplan: {
    creatorName: string;
    handle: string;
    niche: string;
    followers: string;
    engagementRate: string;
    existingOfferings: string;
    location: string;
    content: string | null;
  };
  personalityDNA: {
    brandArchetype: string;
    secondaryArchetype: string;
    coreValues: string;
    missionWho: string;
    missionWhat: string;
    missionHow: string;
    missionBenefit: string;
    certifications: string;
    yearsExperience: string;
    achievements: string;
    clientCount: string;
    uniqueExpertise: string;
    voiceFormalCasual: string;
    voiceSeriousPlayful: string;
    voiceTechnicalSimple: string;
    signaturePhrases: string;
    wordsToAvoid: string;
    emojiUsage: string;
    contentPillars: string;
    differentiator: string;
    contraryBelief: string;
    originStory: string;
    content: string | null;
  };
  audienceDNA: {
    ageRange: string;
    gender: string;
    location: string;
    incomeLevel: string;
    occupation: string;
    lifeStage: string;
    platformBehavior: string;
    selfIdentity: string;
    desiredIdentity: string;
    groupBelonging: string;
    topValues: string;
    dailyRoutine: string;
    hobbies: string;
    surfacePain1: string;
    surfacePain2: string;
    surfacePain3: string;
    deepPain1: string;
    deepPain2: string;
    embarrassedAbout: string;
    immediateDesires: string;
    ultimateTransformation: string;
    dreamOutcome: string;
    objection1: string;
    objection2: string;
    objection3: string;
    hiddenFears: string;
    currentBelief: string;
    newBelief: string;
    enemyExternal: string;
    enemyInternal: string;
    avatarName: string;
    content: string | null;
  };
  uvzAnalysis: {
    selectedUVZs: string[];
    topUVZ: string;
    content: string | null;
  };
  coachingOffer: {
    offerName: string;
    tagline: string;
    duration: string;
    pricingStarter: string;
    pricingComplete: string;
    pricingVIP: string;
    content: string | null;
  };
  coachingCharter: {
    content: string | null;
  };
  productDNA: {
    content: string | null;
  };
  launch14Day: {
    launchTime: string;
    closeTime: string;
    timezone: string;
    content: string | null;
    dailyPlaybooks: { [key: string]: string } | null;
  };
}

// API request/response types
export interface CreateProjectRequest {
  influencerId: string;
  name: string;
  wizardState?: WizardState;
}

export interface UpdateProjectRequest {
  name?: string;
  wizardState?: WizardState;
  currentStep?: number;
  completedSteps?: number[];
  status?: "in_progress" | "completed";
}

export interface CreateInfluencerRequest {
  name: string;
  handle?: string;
}
