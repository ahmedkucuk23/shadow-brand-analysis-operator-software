"use client";

import { useState, useEffect } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Download,
  Upload,
  CheckCircle2,
  Circle,
  Loader2,
  FileText,
  Sparkles,
  Lock,
  BarChart3,
  Heart,
  Users,
  Target,
  Award,
  BookOpen,
  Calendar,
  Rocket,
  Globe,
  FileDown,
} from "lucide-react";
import { downloadPDF as downloadProfessionalPDF, downloadLaunchPDF, type DocumentType } from "@/lib/pdf/generator";

// Supported languages
const LANGUAGES = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "bs", name: "Bosnian", flag: "🇧🇦" },
  { code: "hr", name: "Croatian", flag: "🇭🇷" },
  { code: "sr", name: "Serbian", flag: "🇷🇸" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹" },
  { code: "nl", name: "Dutch", flag: "🇳🇱" },
  { code: "pl", name: "Polish", flag: "🇵🇱" },
  { code: "tr", name: "Turkish", flag: "🇹🇷" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
];

// Types for all documents
interface MonetizationGameplan {
  creatorName: string;
  handle: string;
  niche: string;
  followers: string;
  engagementRate: string;
  existingOfferings: string;
  location: string;
  content: string | null;
}

interface PersonalityDNA {
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
}

interface AudienceDNA {
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
}

interface UVZAnalysis {
  selectedUVZs: string[];
  topUVZ: string;
  content: string | null;
}

interface CoachingOffer {
  offerName: string;
  tagline: string;
  duration: string;
  pricingStarter: string;
  pricingComplete: string;
  pricingVIP: string;
  content: string | null;
}

interface CoachingCharter {
  content: string | null;
}

interface ProductDNA {
  content: string | null;
}

interface Launch14Day {
  launchTime: string;
  closeTime: string;
  timezone: string;
  content: string | null;
  dailyPlaybooks: { [key: string]: string } | null;
}

interface WizardState {
  currentStep: number;
  language: string;
  monetizationGameplan: MonetizationGameplan;
  personalityDNA: PersonalityDNA;
  audienceDNA: AudienceDNA;
  uvzAnalysis: UVZAnalysis;
  coachingOffer: CoachingOffer;
  coachingCharter: CoachingCharter;
  productDNA: ProductDNA;
  launch14Day: Launch14Day;
}

const STEPS = [
  { id: 1, name: "Monetization Gameplan", icon: BarChart3, color: "amber" },
  { id: 2, name: "Personality DNA", icon: Heart, color: "rose" },
  { id: 3, name: "Audience DNA", icon: Users, color: "blue" },
  { id: 4, name: "UVZ Analysis", icon: Target, color: "violet" },
  { id: 5, name: "Coaching Offer", icon: Award, color: "emerald" },
  { id: 6, name: "Coaching Charter", icon: BookOpen, color: "orange" },
  { id: 7, name: "Product DNA", icon: FileText, color: "pink" },
  { id: 8, name: "14-Day Launch", icon: Rocket, color: "red" },
];

const STORAGE_KEY = "shadow-operator-wizard-state";

const initialState: WizardState = {
  currentStep: 1,
  language: "en",
  monetizationGameplan: {
    creatorName: "",
    handle: "",
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

export default function ShadowOperatorWizard() {
  const [state, setState] = useState<WizardState>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setState(parsed);
      } catch (e) {
        console.error("Failed to parse saved state:", e);
      }
    }
  }, []);

  // Save state to localStorage on change
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, isMounted]);

  const updateState = (updates: Partial<WizardState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const isStepComplete = (stepId: number): boolean => {
    switch (stepId) {
      case 1:
        return !!state.monetizationGameplan.content;
      case 2:
        return !!state.personalityDNA.content;
      case 3:
        return !!state.audienceDNA.content;
      case 4:
        return !!state.uvzAnalysis.content;
      case 5:
        return !!state.coachingOffer.content;
      case 6:
        return !!state.coachingCharter.content;
      case 7:
        return !!state.productDNA.content;
      case 8:
        return !!state.launch14Day.content;
      default:
        return false;
    }
  };

  const canAccessStep = (stepId: number): boolean => {
    if (stepId === 1) return true;
    // Each step requires the previous step to be complete
    return isStepComplete(stepId - 1);
  };

  const goToStep = (stepId: number) => {
    if (canAccessStep(stepId)) {
      updateState({ currentStep: stepId });
    }
  };

  const handleNext = () => {
    if (state.currentStep < 8 && isStepComplete(state.currentStep)) {
      updateState({ currentStep: state.currentStep + 1 });
    }
  };

  const handlePrevious = () => {
    if (state.currentStep > 1) {
      updateState({ currentStep: state.currentStep - 1 });
    }
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all progress? This cannot be undone.")) {
      setState(initialState);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const completedSteps = STEPS.filter((s) => isStepComplete(s.id)).length;
  const progressPercent = Math.round((completedSteps / STEPS.length) * 100);

  if (!isMounted) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Shadow Operator</h1>
          <p className="text-slate-600 mt-1">
            Complete Creator Monetization System - 8 Sequential Phases
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <div className="relative">
            <select
              value={state.language}
              onChange={(e) => updateState({ language: e.target.value })}
              className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
            <Globe className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
          <button
            onClick={handleReset}
            className="px-4 py-2 text-sm text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            Reset Progress
          </button>
          <div className="bg-white rounded-xl px-4 py-3 border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Progress</p>
                <p className="text-lg font-bold text-slate-900">
                  {completedSteps}/{STEPS.length} phases
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-slate-600">Overall Progress</span>
          <span className="text-sm font-bold text-slate-900">{progressPercent}%</span>
        </div>
        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Step Navigation */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {STEPS.map((step) => {
            const isComplete = isStepComplete(step.id);
            const isCurrent = state.currentStep === step.id;
            const canAccess = canAccessStep(step.id);

            return (
              <button
                key={step.id}
                onClick={() => goToStep(step.id)}
                disabled={!canAccess}
                className={`relative p-3 rounded-xl border-2 transition-all ${
                  isCurrent
                    ? "border-blue-500 bg-blue-50"
                    : isComplete
                    ? "border-green-200 bg-green-50 hover:border-green-300"
                    : canAccess
                    ? "border-slate-200 hover:border-slate-300"
                    : "border-slate-100 bg-slate-50 opacity-50 cursor-not-allowed"
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isComplete
                        ? "bg-green-100"
                        : isCurrent
                        ? "bg-blue-100"
                        : "bg-slate-100"
                    }`}
                  >
                    {isComplete ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : canAccess ? (
                      <step.icon
                        className={`w-5 h-5 ${
                          isCurrent ? "text-blue-600" : "text-slate-400"
                        }`}
                      />
                    ) : (
                      <Lock className="w-4 h-4 text-slate-300" />
                    )}
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-medium text-slate-500">Step {step.id}</p>
                    <p
                      className={`text-xs font-semibold truncate max-w-[80px] ${
                        isCurrent ? "text-blue-700" : isComplete ? "text-green-700" : "text-slate-700"
                      }`}
                    >
                      {step.name}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Step Content */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <StepContent
          step={state.currentStep}
          state={state}
          updateState={updateState}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          language={state.language}
        />
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={state.currentStep === 1}
          className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </button>

        <div className="text-sm text-slate-500">
          Step {state.currentStep} of {STEPS.length}
        </div>

        <button
          onClick={handleNext}
          disabled={state.currentStep === 8 || !isStepComplete(state.currentStep)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// Step Content Component
function StepContent({
  step,
  state,
  updateState,
  isLoading,
  setIsLoading,
  language,
}: {
  step: number;
  state: WizardState;
  updateState: (updates: Partial<WizardState>) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  language: string;
}) {
  switch (step) {
    case 1:
      return (
        <MonetizationGameplanStep
          data={state.monetizationGameplan}
          updateData={(data) => updateState({ monetizationGameplan: data })}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          language={language}
        />
      );
    case 2:
      return (
        <PersonalityDNAStep
          data={state.personalityDNA}
          updateData={(data) => updateState({ personalityDNA: data })}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          language={language}
        />
      );
    case 3:
      return (
        <AudienceDNAStep
          data={state.audienceDNA}
          updateData={(data) => updateState({ audienceDNA: data })}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          language={language}
        />
      );
    case 4:
      return (
        <UVZAnalysisStep
          data={state.uvzAnalysis}
          personalityDNA={state.personalityDNA}
          audienceDNA={state.audienceDNA}
          updateData={(data) => updateState({ uvzAnalysis: data })}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          language={language}
        />
      );
    case 5:
      return (
        <CoachingOfferStep
          data={state.coachingOffer}
          uvzAnalysis={state.uvzAnalysis}
          personalityDNA={state.personalityDNA}
          audienceDNA={state.audienceDNA}
          updateData={(data) => updateState({ coachingOffer: data })}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          language={language}
        />
      );
    case 6:
      return (
        <CoachingCharterStep
          data={state.coachingCharter}
          coachingOffer={state.coachingOffer}
          updateData={(data) => updateState({ coachingCharter: data })}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          language={language}
        />
      );
    case 7:
      return (
        <ProductDNAStep
          data={state.productDNA}
          coachingCharter={state.coachingCharter}
          coachingOffer={state.coachingOffer}
          audienceDNA={state.audienceDNA}
          personalityDNA={state.personalityDNA}
          updateData={(data) => updateState({ productDNA: data })}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          language={language}
        />
      );
    case 8:
      return (
        <Launch14DayStep
          data={state.launch14Day}
          productDNA={state.productDNA}
          audienceDNA={state.audienceDNA}
          personalityDNA={state.personalityDNA}
          updateData={(data) => updateState({ launch14Day: data })}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          language={language}
        />
      );
    default:
      return null;
  }
}

// ============================================
// STEP 1: Monetization Gameplan
// ============================================
function MonetizationGameplanStep({
  data,
  updateData,
  isLoading,
  setIsLoading,
  language,
}: {
  data: MonetizationGameplan;
  updateData: (data: MonetizationGameplan) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  language: string;
}) {
  const [screenshots, setScreenshots] = useState<{ file: File; preview: string; base64: string; mediaType: string }[]>([]);
  const [analysisMode, setAnalysisMode] = useState<"manual" | "screenshots">("manual");
  const [isDragging, setIsDragging] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate/monetization-gameplan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, language }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to generate");
      updateData({ ...data, content: result.content });
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to generate");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyzeScreenshots = async () => {
    if (screenshots.length === 0) {
      alert("Please upload at least one screenshot");
      return;
    }
    setIsLoading(true);
    try {
      const images = screenshots.map((s) => ({
        base64: s.base64,
        mediaType: s.mediaType,
      }));
      const response = await fetch("/api/analyze/screenshots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ images, language }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to analyze");
      updateData({ ...data, content: result.content });
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to analyze screenshots");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!data.content) return;
    await downloadPDF("Monetization_Gameplan", data.content, "monetization-gameplan", data.creatorName);
  };

  const handleUpload = (content: string) => {
    updateData({ ...data, content });
  };

  const handleImageUpload = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter((file) =>
      ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/gif"].includes(file.type)
    );

    if (validFiles.length === 0) {
      alert("Please upload valid image files (PNG, JPG, WEBP, GIF)");
      return;
    }

    const newScreenshots = await Promise.all(
      validFiles.map(async (file) => {
        const base64 = await fileToBase64(file);
        const preview = URL.createObjectURL(file);
        return {
          file,
          preview,
          base64,
          mediaType: file.type as string,
        };
      })
    );

    setScreenshots((prev) => [...prev, ...newScreenshots]);
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // Remove the data:image/xxx;base64, prefix
        const base64 = result.split(",")[1];
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const removeScreenshot = (index: number) => {
    setScreenshots((prev) => {
      const newScreenshots = [...prev];
      URL.revokeObjectURL(newScreenshots[index].preview);
      newScreenshots.splice(index, 1);
      return newScreenshots;
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleImageUpload(e.dataTransfer.files);
    }
  };

  if (data.content) {
    return (
      <GeneratedContentView
        title="Monetization Gameplan"
        content={data.content}
        onEdit={() => updateData({ ...data, content: null })}
        onDownload={handleDownload}
        color="amber"
      />
    );
  }

  return (
    <div className="p-6">
      <StepHeader
        icon={BarChart3}
        title="Monetization Gameplan"
        description="Creator analysis, market opportunity, and revenue projections"
        color="amber"
      />

      <UploadSection onUpload={handleUpload} documentName="Monetization Gameplan" />

      {/* Mode Selection */}
      <div className="mt-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-medium text-slate-700">Analysis Method:</span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setAnalysisMode("screenshots")}
            className={`flex-1 p-4 rounded-xl border-2 transition-all ${
              analysisMode === "screenshots"
                ? "border-amber-500 bg-amber-50"
                : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                analysisMode === "screenshots" ? "bg-amber-100" : "bg-slate-100"
              }`}>
                <Upload className={`w-5 h-5 ${analysisMode === "screenshots" ? "text-amber-600" : "text-slate-400"}`} />
              </div>
              <div className="text-left">
                <p className={`font-semibold ${analysisMode === "screenshots" ? "text-amber-700" : "text-slate-700"}`}>
                  Screenshot Analysis
                </p>
                <p className="text-xs text-slate-500">Upload Instagram, Social Blade, Insights screenshots</p>
              </div>
            </div>
          </button>
          <button
            onClick={() => setAnalysisMode("manual")}
            className={`flex-1 p-4 rounded-xl border-2 transition-all ${
              analysisMode === "manual"
                ? "border-amber-500 bg-amber-50"
                : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                analysisMode === "manual" ? "bg-amber-100" : "bg-slate-100"
              }`}>
                <FileText className={`w-5 h-5 ${analysisMode === "manual" ? "text-amber-600" : "text-slate-400"}`} />
              </div>
              <div className="text-left">
                <p className={`font-semibold ${analysisMode === "manual" ? "text-amber-700" : "text-slate-700"}`}>
                  Manual Entry
                </p>
                <p className="text-xs text-slate-500">Enter metrics and details manually</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {analysisMode === "screenshots" ? (
        <div className="space-y-4">
          {/* Screenshot Upload Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
              isDragging
                ? "border-amber-500 bg-amber-50"
                : "border-slate-300 hover:border-amber-400 hover:bg-amber-50/50"
            }`}
          >
            <div className="flex flex-col items-center gap-3">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                isDragging ? "bg-amber-100" : "bg-slate-100"
              }`}>
                <Upload className={`w-8 h-8 ${isDragging ? "text-amber-600" : "text-slate-400"}`} />
              </div>
              <div>
                <p className="font-semibold text-slate-700">
                  {isDragging ? "Drop screenshots here" : "Drag & drop screenshots"}
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  Instagram profile, Social Blade, Insights, comments...
                </p>
              </div>
              <label className="mt-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-lg cursor-pointer hover:bg-amber-200 transition-colors font-medium">
                Browse Files
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                />
              </label>
            </div>
          </div>

          {/* Screenshot Previews */}
          {screenshots.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-700">
                  {screenshots.length} screenshot{screenshots.length > 1 ? "s" : ""} uploaded
                </p>
                <button
                  onClick={() => setScreenshots([])}
                  className="text-xs text-red-600 hover:text-red-700"
                >
                  Remove all
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {screenshots.map((screenshot, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={screenshot.preview}
                      alt={`Screenshot ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border border-slate-200"
                    />
                    <button
                      onClick={() => removeScreenshot(index)}
                      className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                    <p className="text-xs text-slate-500 mt-1 truncate">{screenshot.file.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* What to upload info */}
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-sm font-medium text-slate-700 mb-2">What to upload for best results:</p>
            <ul className="text-sm text-slate-600 space-y-1">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                Instagram profile page (shows followers, bio, posts)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                Social Blade statistics (growth trends)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                Instagram Insights (reach, demographics, engagement)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                Comments section (audience sentiment)
              </li>
            </ul>
          </div>

          {/* Analyze Button */}
          <button
            onClick={handleAnalyzeScreenshots}
            disabled={isLoading || screenshots.length === 0}
            className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing Screenshots...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Analyze Screenshots & Generate Gameplan
              </>
            )}
          </button>
        </div>
      ) : (
        <>
          {/* Manual Entry Form */}
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              label="Creator Name"
              value={data.creatorName}
              onChange={(v) => updateData({ ...data, creatorName: v })}
              placeholder="Your name or brand name"
            />
            <FormField
              label="Instagram Handle"
              value={data.handle}
              onChange={(v) => updateData({ ...data, handle: v })}
              placeholder="@yourhandle"
            />
            <FormField
              label="Niche"
              value={data.niche}
              onChange={(v) => updateData({ ...data, niche: v })}
              placeholder="e.g., Fitness, Business, Lifestyle"
            />
            <FormField
              label="Location"
              value={data.location}
              onChange={(v) => updateData({ ...data, location: v })}
              placeholder="e.g., New York, USA"
            />
            <FormField
              label="Followers"
              value={data.followers}
              onChange={(v) => updateData({ ...data, followers: v })}
              placeholder="e.g., 25000"
            />
            <FormField
              label="Engagement Rate (%)"
              value={data.engagementRate}
              onChange={(v) => updateData({ ...data, engagementRate: v })}
              placeholder="e.g., 3.5"
            />
          </div>
          <div className="mt-4">
            <FormField
              label="Existing Offerings (what you currently sell, if anything)"
              value={data.existingOfferings}
              onChange={(v) => updateData({ ...data, existingOfferings: v })}
              placeholder="e.g., 1:1 coaching, ebook, nothing yet..."
              multiline
            />
          </div>

          <GenerateButton onClick={handleGenerate} isLoading={isLoading} />
        </>
      )}
    </div>
  );
}

// ============================================
// STEP 2: Personality DNA
// ============================================
function PersonalityDNAStep({
  data,
  updateData,
  isLoading,
  setIsLoading,
  language,
}: {
  data: PersonalityDNA;
  updateData: (data: PersonalityDNA) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  language: string;
}) {
  const archetypes = [
    "The Expert",
    "The Coach",
    "The Rebel",
    "The Friend",
    "The Transformer",
    "The Motivator",
  ];

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate/personality-dna", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, language }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to generate");
      updateData({ ...data, content: result.content });
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to generate");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!data.content) return;
    await downloadPDF("Personality_DNA", data.content, "personality-dna");
  };

  const handleUpload = (content: string) => {
    updateData({ ...data, content });
  };

  if (data.content) {
    return (
      <GeneratedContentView
        title="Personality DNA"
        content={data.content}
        onEdit={() => updateData({ ...data, content: null })}
        onDownload={handleDownload}
        color="rose"
      />
    );
  }

  return (
    <div className="p-6">
      <StepHeader
        icon={Heart}
        title="Personality DNA"
        description="Brand voice, credentials, and communication style"
        color="rose"
      />

      <UploadSection onUpload={handleUpload} documentName="Personality DNA" />

      <div className="space-y-6 mt-6">
        <CollapsibleSection title="Brand Identity Core" defaultOpen>
          <div className="grid md:grid-cols-2 gap-4">
            <SelectField
              label="Primary Brand Archetype"
              value={data.brandArchetype}
              onChange={(v) => updateData({ ...data, brandArchetype: v })}
              options={archetypes}
            />
            <SelectField
              label="Secondary Archetype (optional)"
              value={data.secondaryArchetype}
              onChange={(v) => updateData({ ...data, secondaryArchetype: v })}
              options={["None", ...archetypes]}
            />
          </div>
          <FormField
            label="Core Values (3-5 values, comma separated)"
            value={data.coreValues}
            onChange={(v) => updateData({ ...data, coreValues: v })}
            placeholder="e.g., Authenticity, Growth, Simplicity"
          />
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              label="I help... (WHO)"
              value={data.missionWho}
              onChange={(v) => updateData({ ...data, missionWho: v })}
              placeholder="e.g., busy women over 30"
            />
            <FormField
              label="Achieve... (WHAT)"
              value={data.missionWhat}
              onChange={(v) => updateData({ ...data, missionWhat: v })}
              placeholder="e.g., sustainable fat loss"
            />
            <FormField
              label="Through... (HOW)"
              value={data.missionHow}
              onChange={(v) => updateData({ ...data, missionHow: v })}
              placeholder="e.g., simple home workouts"
            />
            <FormField
              label="So they can... (BENEFIT)"
              value={data.missionBenefit}
              onChange={(v) => updateData({ ...data, missionBenefit: v })}
              placeholder="e.g., feel confident in their body"
            />
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Credentials & Authority">
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              label="Certifications/Training"
              value={data.certifications}
              onChange={(v) => updateData({ ...data, certifications: v })}
              placeholder="Your qualifications..."
              multiline
            />
            <FormField
              label="Notable Achievements"
              value={data.achievements}
              onChange={(v) => updateData({ ...data, achievements: v })}
              placeholder="Awards, features, milestones..."
              multiline
            />
            <FormField
              label="Years of Experience"
              value={data.yearsExperience}
              onChange={(v) => updateData({ ...data, yearsExperience: v })}
              placeholder="e.g., 5 years"
            />
            <FormField
              label="Number of Clients/Transformations"
              value={data.clientCount}
              onChange={(v) => updateData({ ...data, clientCount: v })}
              placeholder="e.g., 200+ clients"
            />
          </div>
          <FormField
            label="Unique Expertise"
            value={data.uniqueExpertise}
            onChange={(v) => updateData({ ...data, uniqueExpertise: v })}
            placeholder="What you know that others don't..."
            multiline
          />
        </CollapsibleSection>

        <CollapsibleSection title="Communication Style">
          <div className="space-y-4">
            <RangeField
              label="Formal ←→ Casual"
              value={data.voiceFormalCasual}
              onChange={(v) => updateData({ ...data, voiceFormalCasual: v })}
              leftLabel="Very Formal"
              rightLabel="Very Casual"
            />
            <RangeField
              label="Serious ←→ Playful"
              value={data.voiceSeriousPlayful}
              onChange={(v) => updateData({ ...data, voiceSeriousPlayful: v })}
              leftLabel="Very Serious"
              rightLabel="Very Playful"
            />
            <RangeField
              label="Technical ←→ Simple"
              value={data.voiceTechnicalSimple}
              onChange={(v) => updateData({ ...data, voiceTechnicalSimple: v })}
              leftLabel="Very Technical"
              rightLabel="Very Simple"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <FormField
              label="Signature Phrases"
              value={data.signaturePhrases}
              onChange={(v) => updateData({ ...data, signaturePhrases: v })}
              placeholder="Phrases you use often..."
              multiline
            />
            <FormField
              label="Words to Avoid"
              value={data.wordsToAvoid}
              onChange={(v) => updateData({ ...data, wordsToAvoid: v })}
              placeholder="Words that don't fit your brand..."
              multiline
            />
          </div>
          <SelectField
            label="Emoji Usage"
            value={data.emojiUsage}
            onChange={(v) => updateData({ ...data, emojiUsage: v })}
            options={["None", "Minimal", "Moderate", "Heavy"]}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Content & Differentiators">
          <FormField
            label="Content Pillars (3-4 main topics)"
            value={data.contentPillars}
            onChange={(v) => updateData({ ...data, contentPillars: v })}
            placeholder="e.g., Nutrition tips, Home workouts, Mindset"
            multiline
          />
          <FormField
            label="What makes you different?"
            value={data.differentiator}
            onChange={(v) => updateData({ ...data, differentiator: v })}
            placeholder="Your unique angle or approach..."
            multiline
          />
          <FormField
            label="Contrarian Belief"
            value={data.contraryBelief}
            onChange={(v) => updateData({ ...data, contraryBelief: v })}
            placeholder="What industry 'truth' do you challenge?"
            multiline
          />
          <FormField
            label="Origin Story"
            value={data.originStory}
            onChange={(v) => updateData({ ...data, originStory: v })}
            placeholder="Why you do what you do..."
            multiline
          />
        </CollapsibleSection>
      </div>

      <GenerateButton onClick={handleGenerate} isLoading={isLoading} />
    </div>
  );
}

// ============================================
// STEP 3: Audience DNA
// ============================================
function AudienceDNAStep({
  data,
  updateData,
  isLoading,
  setIsLoading,
  language,
}: {
  data: AudienceDNA;
  updateData: (data: AudienceDNA) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  language: string;
}) {
  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate/audience-dna", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, language }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to generate");
      updateData({ ...data, content: result.content });
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to generate");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!data.content) return;
    await downloadPDF("Audience_DNA", data.content, "audience-dna");
  };

  const handleUpload = (content: string) => {
    updateData({ ...data, content });
  };

  if (data.content) {
    return (
      <GeneratedContentView
        title="Audience DNA"
        content={data.content}
        onEdit={() => updateData({ ...data, content: null })}
        onDownload={handleDownload}
        color="blue"
      />
    );
  }

  return (
    <div className="p-6">
      <StepHeader
        icon={Users}
        title="Audience DNA (Customer DNA)"
        description="Ideal client psychology, pain points, and desires"
        color="blue"
      />

      <UploadSection onUpload={handleUpload} documentName="Audience DNA" />

      <div className="space-y-6 mt-6">
        <CollapsibleSection title="Demographics" defaultOpen>
          <div className="grid md:grid-cols-3 gap-4">
            <FormField
              label="Age Range"
              value={data.ageRange}
              onChange={(v) => updateData({ ...data, ageRange: v })}
              placeholder="e.g., 25-40"
            />
            <SelectField
              label="Gender"
              value={data.gender}
              onChange={(v) => updateData({ ...data, gender: v })}
              options={["Female", "Male", "All"]}
            />
            <FormField
              label="Location"
              value={data.location}
              onChange={(v) => updateData({ ...data, location: v })}
              placeholder="e.g., USA, urban areas"
            />
            <FormField
              label="Income Level"
              value={data.incomeLevel}
              onChange={(v) => updateData({ ...data, incomeLevel: v })}
              placeholder="e.g., $50k-$100k"
            />
            <FormField
              label="Occupation"
              value={data.occupation}
              onChange={(v) => updateData({ ...data, occupation: v })}
              placeholder="e.g., Professional"
            />
            <FormField
              label="Life Stage"
              value={data.lifeStage}
              onChange={(v) => updateData({ ...data, lifeStage: v })}
              placeholder="e.g., Working mom"
            />
          </div>
          <FormField
            label="Platform Behavior (how they use Instagram)"
            value={data.platformBehavior}
            onChange={(v) => updateData({ ...data, platformBehavior: v })}
            placeholder="When they're active, what they engage with..."
            multiline
          />
        </CollapsibleSection>

        <CollapsibleSection title="Psychographics">
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              label="How they see themselves"
              value={data.selfIdentity}
              onChange={(v) => updateData({ ...data, selfIdentity: v })}
              placeholder="Current self-image..."
              multiline
            />
            <FormField
              label="How they want to be seen"
              value={data.desiredIdentity}
              onChange={(v) => updateData({ ...data, desiredIdentity: v })}
              placeholder="Aspirational identity..."
              multiline
            />
          </div>
          <FormField
            label="Group they want to belong to"
            value={data.groupBelonging}
            onChange={(v) => updateData({ ...data, groupBelonging: v })}
            placeholder="e.g., Fit moms, Successful entrepreneurs"
          />
          <FormField
            label="Top Values"
            value={data.topValues}
            onChange={(v) => updateData({ ...data, topValues: v })}
            placeholder="e.g., Family, Health, Freedom"
          />
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              label="Daily Routine"
              value={data.dailyRoutine}
              onChange={(v) => updateData({ ...data, dailyRoutine: v })}
              placeholder="How their typical day looks..."
              multiline
            />
            <FormField
              label="Hobbies & Interests"
              value={data.hobbies}
              onChange={(v) => updateData({ ...data, hobbies: v })}
              placeholder="What they do in free time..."
              multiline
            />
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Pain Points">
          <p className="text-sm text-slate-500 mb-4">
            Surface pain = what they SAY. Deep pain = what they FEEL.
          </p>
          <div className="space-y-3">
            <FormField
              label="Surface Pain #1"
              value={data.surfacePain1}
              onChange={(v) => updateData({ ...data, surfacePain1: v })}
              placeholder="e.g., I can't lose weight"
            />
            <FormField
              label="Surface Pain #2"
              value={data.surfacePain2}
              onChange={(v) => updateData({ ...data, surfacePain2: v })}
              placeholder="e.g., I don't have time"
            />
            <FormField
              label="Surface Pain #3"
              value={data.surfacePain3}
              onChange={(v) => updateData({ ...data, surfacePain3: v })}
              placeholder="e.g., I've tried everything"
            />
          </div>
          <div className="space-y-3 mt-4">
            <FormField
              label="Deep Pain #1"
              value={data.deepPain1}
              onChange={(v) => updateData({ ...data, deepPain1: v })}
              placeholder="e.g., I feel invisible and unworthy"
            />
            <FormField
              label="Deep Pain #2"
              value={data.deepPain2}
              onChange={(v) => updateData({ ...data, deepPain2: v })}
              placeholder="e.g., I'm scared I'll never feel confident"
            />
            <FormField
              label="What they're embarrassed about"
              value={data.embarrassedAbout}
              onChange={(v) => updateData({ ...data, embarrassedAbout: v })}
              placeholder="What they'd never admit publicly..."
            />
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Desires & Objections">
          <FormField
            label="Immediate Desires (quick wins)"
            value={data.immediateDesires}
            onChange={(v) => updateData({ ...data, immediateDesires: v })}
            placeholder="What they want right now..."
            multiline
          />
          <FormField
            label="Ultimate Transformation"
            value={data.ultimateTransformation}
            onChange={(v) => updateData({ ...data, ultimateTransformation: v })}
            placeholder="Who they want to become..."
            multiline
          />
          <FormField
            label="Dream Outcome (vivid description)"
            value={data.dreamOutcome}
            onChange={(v) => updateData({ ...data, dreamOutcome: v })}
            placeholder="What their ideal life looks like..."
            multiline
          />
          <div className="space-y-3 mt-4">
            <FormField
              label="Objection #1"
              value={data.objection1}
              onChange={(v) => updateData({ ...data, objection1: v })}
              placeholder="e.g., I don't have time"
            />
            <FormField
              label="Objection #2"
              value={data.objection2}
              onChange={(v) => updateData({ ...data, objection2: v })}
              placeholder="e.g., It's too expensive"
            />
            <FormField
              label="Objection #3"
              value={data.objection3}
              onChange={(v) => updateData({ ...data, objection3: v })}
              placeholder="e.g., It won't work for me"
            />
          </div>
          <FormField
            label="Hidden Fears"
            value={data.hiddenFears}
            onChange={(v) => updateData({ ...data, hiddenFears: v })}
            placeholder="Fear of failure, success, judgment..."
            multiline
          />
        </CollapsibleSection>

        <CollapsibleSection title="Beliefs & Enemy">
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              label="Current Belief (what they think now)"
              value={data.currentBelief}
              onChange={(v) => updateData({ ...data, currentBelief: v })}
              placeholder="e.g., I need to eat less to lose weight"
              multiline
            />
            <FormField
              label="New Belief Needed"
              value={data.newBelief}
              onChange={(v) => updateData({ ...data, newBelief: v })}
              placeholder="e.g., I need to eat right for my body"
              multiline
            />
            <FormField
              label="External Enemy"
              value={data.enemyExternal}
              onChange={(v) => updateData({ ...data, enemyExternal: v })}
              placeholder="e.g., Diet industry, misinformation"
              multiline
            />
            <FormField
              label="Internal Enemy"
              value={data.enemyInternal}
              onChange={(v) => updateData({ ...data, enemyInternal: v })}
              placeholder="e.g., All-or-nothing thinking"
              multiline
            />
          </div>
          <FormField
            label="Avatar Name (name your ideal customer)"
            value={data.avatarName}
            onChange={(v) => updateData({ ...data, avatarName: v })}
            placeholder="e.g., Struggling Sarah, Busy Mom Maria"
          />
        </CollapsibleSection>
      </div>

      <GenerateButton onClick={handleGenerate} isLoading={isLoading} />
    </div>
  );
}

// ============================================
// STEP 4: UVZ Analysis
// ============================================
function UVZAnalysisStep({
  data,
  personalityDNA,
  audienceDNA,
  updateData,
  isLoading,
  setIsLoading,
  language,
}: {
  data: UVZAnalysis;
  personalityDNA: PersonalityDNA;
  audienceDNA: AudienceDNA;
  updateData: (data: UVZAnalysis) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  language: string;
}) {
  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate/uvz-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personalityDNA: personalityDNA.content,
          audienceDNA: audienceDNA.content,
          language,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to generate");
      updateData({ ...data, content: result.content });
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to generate");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!data.content) return;
    await downloadPDF("UVZ_Analysis_Top20", data.content, "uvz-analysis");
  };

  const handleUpload = (content: string) => {
    updateData({ ...data, content });
  };

  if (data.content) {
    return (
      <GeneratedContentView
        title="UVZ Analysis (Top 20)"
        content={data.content}
        onEdit={() => updateData({ ...data, content: null })}
        onDownload={handleDownload}
        color="violet"
      />
    );
  }

  return (
    <div className="p-6">
      <StepHeader
        icon={Target}
        title="UVZ Analysis (Unique Value Zone)"
        description="20 unique value propositions, scored and ranked"
        color="violet"
      />

      <UploadSection onUpload={handleUpload} documentName="UVZ Analysis" />

      <div className="mt-6 bg-violet-50 rounded-xl p-6 border border-violet-100">
        <h3 className="font-semibold text-violet-900 mb-3">How UVZ Works</h3>
        <p className="text-sm text-violet-700 mb-4">
          UVZ = [Specific Result] + [Unique Mechanism] + [Differentiator]
        </p>
        <p className="text-sm text-violet-600">
          Based on your Personality DNA and Audience DNA, we&apos;ll generate 20 unique
          positioning statements and score them by Specificity, Believability, and
          Desirability.
        </p>
      </div>

      <div className="mt-6 bg-slate-50 rounded-xl p-6 border border-slate-200">
        <h3 className="font-semibold text-slate-900 mb-3">Input Documents Ready</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span className="text-sm text-slate-700">Personality DNA</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span className="text-sm text-slate-700">Audience DNA</span>
          </div>
        </div>
      </div>

      <GenerateButton onClick={handleGenerate} isLoading={isLoading} label="Generate 20 UVZ Options" />
    </div>
  );
}

// ============================================
// STEP 5: Coaching Offer
// ============================================
function CoachingOfferStep({
  data,
  uvzAnalysis,
  personalityDNA,
  audienceDNA,
  updateData,
  isLoading,
  setIsLoading,
  language,
}: {
  data: CoachingOffer;
  uvzAnalysis: UVZAnalysis;
  personalityDNA: PersonalityDNA;
  audienceDNA: AudienceDNA;
  updateData: (data: CoachingOffer) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  language: string;
}) {
  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate/coaching-offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uvzAnalysis: uvzAnalysis.content,
          personalityDNA: personalityDNA.content,
          audienceDNA: audienceDNA.content,
          offerName: data.offerName,
          tagline: data.tagline,
          duration: data.duration,
          pricingStarter: data.pricingStarter,
          pricingComplete: data.pricingComplete,
          pricingVIP: data.pricingVIP,
          language,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to generate");
      updateData({ ...data, content: result.content });
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to generate");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!data.content) return;
    await downloadPDF("Coaching_Offer", data.content, "coaching-offer");
  };

  const handleUpload = (content: string) => {
    updateData({ ...data, content });
  };

  if (data.content) {
    return (
      <GeneratedContentView
        title="Coaching Offer Development"
        content={data.content}
        onEdit={() => updateData({ ...data, content: null })}
        onDownload={handleDownload}
        color="emerald"
      />
    );
  }

  return (
    <div className="p-6">
      <StepHeader
        icon={Award}
        title="Coaching Offer Development"
        description="5-Week Action Plan, 10 Worksheets, 5-Module Program Outline"
        color="emerald"
      />

      <UploadSection onUpload={handleUpload} documentName="Coaching Offer" />

      <div className="space-y-6 mt-6">
        <CollapsibleSection title="Offer Basics" defaultOpen>
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              label="Offer Name"
              value={data.offerName}
              onChange={(v) => updateData({ ...data, offerName: v })}
              placeholder="e.g., GLUTE GAINS ACADEMY"
            />
            <FormField
              label="Tagline"
              value={data.tagline}
              onChange={(v) => updateData({ ...data, tagline: v })}
              placeholder="One-line summary of your offer"
            />
            <SelectField
              label="Program Duration"
              value={data.duration}
              onChange={(v) => updateData({ ...data, duration: v })}
              options={["4 weeks", "5 weeks", "6 weeks", "8 weeks", "12 weeks"]}
            />
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Pricing Tiers">
          <div className="grid md:grid-cols-3 gap-4">
            <FormField
              label="Starter Price"
              value={data.pricingStarter}
              onChange={(v) => updateData({ ...data, pricingStarter: v })}
              placeholder="e.g., $147"
            />
            <FormField
              label="Complete Price"
              value={data.pricingComplete}
              onChange={(v) => updateData({ ...data, pricingComplete: v })}
              placeholder="e.g., $247"
            />
            <FormField
              label="VIP Price"
              value={data.pricingVIP}
              onChange={(v) => updateData({ ...data, pricingVIP: v })}
              placeholder="e.g., $497"
            />
          </div>
        </CollapsibleSection>
      </div>

      <GenerateButton onClick={handleGenerate} isLoading={isLoading} />
    </div>
  );
}

// ============================================
// STEP 6: Coaching Charter
// ============================================
function CoachingCharterStep({
  data,
  coachingOffer,
  updateData,
  isLoading,
  setIsLoading,
  language,
}: {
  data: CoachingCharter;
  coachingOffer: CoachingOffer;
  updateData: (data: CoachingCharter) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  language: string;
}) {
  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate/coaching-charter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          coachingOffer: coachingOffer.content,
          language,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to generate");
      updateData({ ...data, content: result.content });
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to generate");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!data.content) return;
    await downloadPDF("Coaching_Charter", data.content, "coaching-charter");
  };

  const handleUpload = (content: string) => {
    updateData({ ...data, content });
  };

  if (data.content) {
    return (
      <GeneratedContentView
        title="Coaching Charter"
        content={data.content}
        onEdit={() => updateData({ ...data, content: null })}
        onDownload={handleDownload}
        color="orange"
      />
    );
  }

  return (
    <div className="p-6">
      <StepHeader
        icon={BookOpen}
        title="Coaching Charter"
        description="Single-page executive summary of your complete offer"
        color="orange"
      />

      <UploadSection onUpload={handleUpload} documentName="Coaching Charter" />

      <div className="mt-6 bg-orange-50 rounded-xl p-6 border border-orange-100">
        <h3 className="font-semibold text-orange-900 mb-3">What is the Charter?</h3>
        <p className="text-sm text-orange-700">
          The Coaching Charter is a single-page summary document that captures your entire
          offer: the promise, what&apos;s included, pricing, transformation, and guarantee. It
          serves as the quick reference for all future content and sales materials.
        </p>
      </div>

      <div className="mt-6 bg-slate-50 rounded-xl p-6 border border-slate-200">
        <h3 className="font-semibold text-slate-900 mb-3">Input Document Ready</h3>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          <span className="text-sm text-slate-700">Coaching Offer Development</span>
        </div>
      </div>

      <GenerateButton onClick={handleGenerate} isLoading={isLoading} label="Generate Charter" />
    </div>
  );
}

// ============================================
// STEP 7: Product DNA
// ============================================
function ProductDNAStep({
  data,
  coachingCharter,
  coachingOffer,
  audienceDNA,
  personalityDNA,
  updateData,
  isLoading,
  setIsLoading,
  language,
}: {
  data: ProductDNA;
  coachingCharter: CoachingCharter;
  coachingOffer: CoachingOffer;
  audienceDNA: AudienceDNA;
  personalityDNA: PersonalityDNA;
  updateData: (data: ProductDNA) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  language: string;
}) {
  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate/product-dna", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          coachingCharter: coachingCharter.content,
          coachingOffer: coachingOffer.content,
          audienceDNA: audienceDNA.content,
          personalityDNA: personalityDNA.content,
          language,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to generate");
      updateData({ ...data, content: result.content });
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to generate");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!data.content) return;
    await downloadPDF("Product_DNA", data.content, "product-dna");
  };

  const handleUpload = (content: string) => {
    updateData({ ...data, content });
  };

  if (data.content) {
    return (
      <GeneratedContentView
        title="Product DNA"
        content={data.content}
        onEdit={() => updateData({ ...data, content: null })}
        onDownload={handleDownload}
        color="pink"
      />
    );
  }

  return (
    <div className="p-6">
      <StepHeader
        icon={FileText}
        title="Product DNA"
        description="Problem-solution-offer framework with M.O.D.E.A analysis"
        color="pink"
      />

      <UploadSection onUpload={handleUpload} documentName="Product DNA" />

      <div className="mt-6 bg-pink-50 rounded-xl p-6 border border-pink-100">
        <h3 className="font-semibold text-pink-900 mb-3">Product DNA Components</h3>
        <ul className="text-sm text-pink-700 space-y-1">
          <li>• Problem Statement (deep dive)</li>
          <li>• Solution Framework (your mechanism)</li>
          <li>• Offer Structure (complete breakdown)</li>
          <li>• M.O.D.E.A Analysis (Market, Offer, Demand, Execution, Audience)</li>
          <li>• Keyword Library (for content & copy)</li>
        </ul>
      </div>

      <div className="mt-6 bg-slate-50 rounded-xl p-6 border border-slate-200">
        <h3 className="font-semibold text-slate-900 mb-3">Input Documents Ready</h3>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span className="text-sm text-slate-700">Coaching Charter</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span className="text-sm text-slate-700">Coaching Offer</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span className="text-sm text-slate-700">Audience DNA</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span className="text-sm text-slate-700">Personality DNA</span>
          </div>
        </div>
      </div>

      <GenerateButton onClick={handleGenerate} isLoading={isLoading} />
    </div>
  );
}

// ============================================
// STEP 8: 14-Day Launch
// ============================================
function Launch14DayStep({
  data,
  productDNA,
  audienceDNA,
  personalityDNA,
  updateData,
  isLoading,
  setIsLoading,
  language,
}: {
  data: Launch14Day;
  productDNA: ProductDNA;
  audienceDNA: AudienceDNA;
  personalityDNA: PersonalityDNA;
  updateData: (data: Launch14Day) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  language: string;
}) {
  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate/14day-launch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productDNA: productDNA.content,
          audienceDNA: audienceDNA.content,
          personalityDNA: personalityDNA.content,
          launchTime: data.launchTime,
          closeTime: data.closeTime,
          timezone: data.timezone,
          language,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to generate");
      updateData({ ...data, content: result.content, dailyPlaybooks: result.dailyPlaybooks });
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to generate");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!data.content) return;
    await downloadPDF("14_Day_Launch_Overview", data.content, "14day-launch");
  };

  const handleDownloadDay = async (day: number) => {
    if (!data.dailyPlaybooks || !data.dailyPlaybooks[`day${day}`]) return;
    await downloadPDF(`Day_${day.toString().padStart(2, "0")}_Playbook`, data.dailyPlaybooks[`day${day}`], "14day-launch");
  };

  const handleDownloadAllDays = async () => {
    if (!data.dailyPlaybooks) return;
    const dayPhases: { [key: number]: { title: string; phase: string } } = {
      1: { title: "Survey Day", phase: "WARM UP" },
      2: { title: "Validation Day", phase: "WARM UP" },
      3: { title: "Commitment Day", phase: "WARM UP" },
      4: { title: "Opportunity Day", phase: "VALUE" },
      5: { title: "Integration Day", phase: "VALUE" },
      6: { title: "Framework Day", phase: "VALUE" },
      7: { title: "Framework Day 2", phase: "VALUE" },
      8: { title: "Ownership Day", phase: "TRANSITION" },
      9: { title: "Pre-Cart Q&A", phase: "TRANSITION" },
      10: { title: "Cart Open!", phase: "OPEN CART" },
      11: { title: "Social Proof", phase: "OPEN CART" },
      12: { title: "FAQ Day", phase: "OPEN CART" },
      13: { title: "Last Chance", phase: "OPEN CART" },
      14: { title: "Cart Close", phase: "OPEN CART" },
    };

    const days = Array.from({ length: 14 }, (_, i) => i + 1)
      .filter((day) => data.dailyPlaybooks?.[`day${day}`])
      .map((day) => ({
        day,
        title: dayPhases[day]?.title || `Day ${day}`,
        phase: dayPhases[day]?.phase || "LAUNCH",
        content: data.dailyPlaybooks![`day${day}`],
      }));

    await downloadLaunchPDF(
      days,
      { type: "14day-launch", date: new Date().toLocaleDateString() },
      true,
      "14_Day_Launch_Complete"
    );
  };

  const handleUpload = (content: string) => {
    updateData({ ...data, content });
  };

  if (data.content) {
    return (
      <div className="p-6">
        <GeneratedContentView
          title="14-Day Story Launch System"
          content={data.content}
          onEdit={() => updateData({ ...data, content: null, dailyPlaybooks: null })}
          onDownload={handleDownload}
          color="red"
        />

        {data.dailyPlaybooks && (
          <div className="mt-6 space-y-4">
            {/* All-in-One Download Option */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-4 border border-red-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-red-900">Complete Launch Playbook</h3>
                  <p className="text-sm text-red-600">Download all 14 days in one professional PDF</p>
                </div>
                <button
                  onClick={handleDownloadAllDays}
                  className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
                >
                  <FileDown className="w-5 h-5" />
                  Download All Days
                </button>
              </div>
            </div>

            {/* Individual Day Downloads */}
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Or Download Individual Day Playbooks</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {Array.from({ length: 14 }, (_, i) => i + 1).map((day) => (
                  <button
                    key={day}
                    onClick={() => handleDownloadDay(day)}
                    disabled={!data.dailyPlaybooks?.[`day${day}`]}
                    className="flex flex-col items-center gap-1 p-3 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 transition-colors disabled:opacity-50"
                  >
                    <Calendar className="w-5 h-5 text-red-600" />
                    <span className="text-sm font-medium text-red-700">Day {day}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-6">
      <StepHeader
        icon={Rocket}
        title="14-Day Story Launch System"
        description="Complete daily playbooks for your Instagram Story launch"
        color="red"
      />

      <UploadSection onUpload={handleUpload} documentName="14-Day Launch" />

      <div className="mt-6 bg-red-50 rounded-xl p-6 border border-red-100">
        <h3 className="font-semibold text-red-900 mb-3">The 14-Day Framework</h3>
        <div className="grid md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="font-medium text-amber-700">Days 1-3: Warm Up</p>
            <p className="text-amber-600">Survey, Validation, Commitment</p>
          </div>
          <div>
            <p className="font-medium text-emerald-700">Days 4-7: Value Delivery</p>
            <p className="text-emerald-600">Opportunity, Integration, Framework</p>
          </div>
          <div>
            <p className="font-medium text-orange-700">Days 8-9: Transition</p>
            <p className="text-orange-600">Ownership, Pre-Cart Q&A</p>
          </div>
          <div>
            <p className="font-medium text-red-700">Days 10-14: Open Cart</p>
            <p className="text-red-600">Launch, Proof, FAQ, Close</p>
          </div>
        </div>
      </div>

      <div className="space-y-6 mt-6">
        <CollapsibleSection title="Launch Settings" defaultOpen>
          <div className="grid md:grid-cols-3 gap-4">
            <FormField
              label="Launch Time (Day 10)"
              value={data.launchTime}
              onChange={(v) => updateData({ ...data, launchTime: v })}
              placeholder="e.g., 21:00"
            />
            <FormField
              label="Close Time (Day 14)"
              value={data.closeTime}
              onChange={(v) => updateData({ ...data, closeTime: v })}
              placeholder="e.g., 21:00"
            />
            <SelectField
              label="Timezone"
              value={data.timezone}
              onChange={(v) => updateData({ ...data, timezone: v })}
              options={["CET", "EST", "PST", "GMT", "UTC"]}
            />
          </div>
        </CollapsibleSection>
      </div>

      <div className="mt-6 bg-slate-50 rounded-xl p-6 border border-slate-200">
        <h3 className="font-semibold text-slate-900 mb-3">Required Documents (All Ready!)</h3>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span className="text-sm text-slate-700">Product DNA</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span className="text-sm text-slate-700">Audience DNA</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span className="text-sm text-slate-700">Personality DNA</span>
          </div>
        </div>
      </div>

      <GenerateButton onClick={handleGenerate} isLoading={isLoading} label="Generate 14-Day Launch Plan" />
    </div>
  );
}

// ============================================
// SHARED COMPONENTS
// ============================================

function StepHeader({
  icon: Icon,
  title,
  description,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <div className="flex items-start gap-4 mb-6">
      <div className={`w-12 h-12 rounded-xl bg-${color}-100 flex items-center justify-center flex-shrink-0`}>
        <Icon className={`w-6 h-6 text-${color}-600`} />
      </div>
      <div>
        <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
        <p className="text-slate-600">{description}</p>
      </div>
    </div>
  );
}

function FormField({
  label,
  value,
  onChange,
  placeholder,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
          rows={3}
          placeholder={placeholder}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
      >
        {options.map((opt) => (
          <option key={opt} value={opt === "None" ? "" : opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function RangeField({
  label,
  value,
  onChange,
  leftLabel,
  rightLabel,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  leftLabel: string;
  rightLabel: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}: {value}/10
      </label>
      <input
        type="range"
        min="1"
        max="10"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-slate-500">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  );
}

function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
      >
        <span className="font-medium text-slate-900">{title}</span>
        {isOpen ? (
          <ChevronRight className="w-5 h-5 text-slate-400 rotate-90 transition-transform" />
        ) : (
          <ChevronRight className="w-5 h-5 text-slate-400 transition-transform" />
        )}
      </button>
      {isOpen && <div className="p-4 space-y-4">{children}</div>}
    </div>
  );
}

function GenerateButton({
  onClick,
  isLoading,
  label = "Generate",
}: {
  onClick: () => void;
  isLoading: boolean;
  label?: string;
}) {
  return (
    <div className="mt-6 flex justify-end">
      <button
        onClick={onClick}
        disabled={isLoading}
        className="btn-primary flex items-center gap-2 px-6"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            {label}
          </>
        )}
      </button>
    </div>
  );
}

function UploadSection({
  onUpload,
  documentName,
}: {
  onUpload: (content: string) => void;
  documentName: string;
}) {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      onUpload(content);
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-slate-50 rounded-xl p-4 border border-dashed border-slate-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Upload className="w-5 h-5 text-slate-400" />
          <span className="text-sm text-slate-600">
            Have a previous {documentName}? Upload it to continue.
          </span>
        </div>
        <label className="cursor-pointer">
          <input type="file" accept=".txt,.md" onChange={handleFileUpload} className="hidden" />
          <span className="text-sm font-medium text-blue-600 hover:text-blue-700">
            Upload File
          </span>
        </label>
      </div>
    </div>
  );
}

function GeneratedContentView({
  title,
  content,
  onEdit,
  onDownload,
  color,
}: {
  title: string;
  content: string;
  onEdit: () => void;
  onDownload: () => void;
  color: string;
}) {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl bg-${color}-100 flex items-center justify-center`}>
            <CheckCircle2 className={`w-5 h-5 text-${color}-600`} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
            <p className="text-sm text-green-600">Generated successfully!</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Edit Inputs
          </button>
          <button
            onClick={onDownload}
            className="btn-primary flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </div>

      <div className="bg-slate-50 rounded-xl p-6 overflow-auto max-h-[500px]">
        <pre className="whitespace-pre-wrap font-sans text-sm text-slate-700">{content}</pre>
      </div>
    </div>
  );
}

// PDF Download Helper - Professional styled PDFs
async function downloadPDF(
  filename: string,
  content: string,
  documentType: DocumentType,
  creatorName?: string
) {
  try {
    await downloadProfessionalPDF(
      content,
      {
        type: documentType,
        creatorName,
        date: new Date().toLocaleDateString(),
      },
      `${filename}.pdf`
    );
  } catch (error) {
    console.error("PDF generation error:", error);
    // Fallback to simple print
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${filename}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: 'Inter', sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; line-height: 1.7; color: #1e293b; font-size: 14px; }
            h1 { font-size: 32px; font-weight: 700; margin-bottom: 16px; color: #c9a227; }
            h2 { font-size: 20px; font-weight: 700; margin-top: 32px; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid #c9a227; }
            h3 { font-size: 16px; font-weight: 600; color: #334155; margin-top: 24px; margin-bottom: 12px; }
            p { margin-bottom: 16px; }
            strong { color: #1e293b; font-weight: 600; }
            ul { list-style: none; margin: 16px 0; }
            li { padding: 8px 0 8px 24px; position: relative; }
            li::before { content: '•'; position: absolute; left: 8px; color: #c9a227; font-weight: bold; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th { background: #0a0a0a; color: white; font-weight: 600; text-align: left; padding: 12px 16px; }
            td { padding: 12px 16px; border-bottom: 1px solid #e2e8f0; }
            tr:nth-child(even) { background: #f8fafc; }
            @media print { body { padding: 20px; } }
          </style>
        </head>
        <body>
          <h1>${filename.replace(/_/g, " ")}</h1>
          <p style="color: #64748b; margin-bottom: 32px;">Generated on ${new Date().toLocaleDateString()}</p>
          <pre style="white-space: pre-wrap; font-family: inherit;">${content}</pre>
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  }
}
