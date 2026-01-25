"use client";

import { useState } from "react";
import { X, Plus, Loader2, User } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";

interface Influencer {
  id: string;
  name: string;
  handle: string | null;
}

interface CreateProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  influencers: Influencer[];
  onCreateInfluencer: (name: string, handle?: string) => Promise<Influencer>;
  onCreateProject: (influencerId: string, name: string) => Promise<void>;
}

export function CreateProjectModal({
  open,
  onOpenChange,
  influencers,
  onCreateInfluencer,
  onCreateProject,
}: CreateProjectModalProps) {
  const [step, setStep] = useState<"select" | "new-influencer" | "name">("select");
  const [selectedInfluencerId, setSelectedInfluencerId] = useState<string | null>(null);
  const [newInfluencerName, setNewInfluencerName] = useState("");
  const [newInfluencerHandle, setNewInfluencerHandle] = useState("");
  const [projectName, setProjectName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetState = () => {
    setStep("select");
    setSelectedInfluencerId(null);
    setNewInfluencerName("");
    setNewInfluencerHandle("");
    setProjectName("");
    setError(null);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetState();
    }
    onOpenChange(open);
  };

  const handleSelectInfluencer = (id: string) => {
    setSelectedInfluencerId(id);
    const influencer = influencers.find((i) => i.id === id);
    setProjectName(influencer ? `${influencer.name} - New Project` : "New Project");
    setStep("name");
  };

  const handleCreateNewInfluencer = async () => {
    if (!newInfluencerName.trim()) {
      setError("Please enter a name");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const influencer = await onCreateInfluencer(newInfluencerName.trim(), newInfluencerHandle.trim() || undefined);
      setSelectedInfluencerId(influencer.id);
      setProjectName(`${influencer.name} - New Project`);
      setStep("name");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create influencer");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProject = async () => {
    if (!selectedInfluencerId || !projectName.trim()) {
      setError("Please enter a project name");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await onCreateProject(selectedInfluencerId, projectName.trim());
      handleOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create project");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[85vh] overflow-hidden z-50">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
            <Dialog.Title className="text-lg font-semibold text-slate-900">
              {step === "select" && "Create New Project"}
              {step === "new-influencer" && "Add New Influencer"}
              {step === "name" && "Name Your Project"}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>

          {/* Content */}
          <div className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                {error}
              </div>
            )}

            {step === "select" && (
              <div className="space-y-4">
                <p className="text-sm text-slate-600">
                  Select an influencer to create a new project for, or add a new influencer.
                </p>

                {/* Influencer List */}
                {influencers.length > 0 && (
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {influencers.map((influencer) => (
                      <button
                        key={influencer.id}
                        onClick={() => handleSelectInfluencer(influencer.id)}
                        className="w-full flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all text-left"
                      >
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                          <User className="w-5 h-5 text-slate-500" />
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">{influencer.name}</div>
                          {influencer.handle && (
                            <div className="text-sm text-slate-500">@{influencer.handle}</div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Add New Influencer */}
                <button
                  onClick={() => setStep("new-influencer")}
                  className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-dashed border-slate-300 text-slate-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all"
                >
                  <Plus className="w-5 h-5" />
                  Add New Influencer
                </button>
              </div>
            )}

            {step === "new-influencer" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Influencer Name *
                  </label>
                  <input
                    type="text"
                    value={newInfluencerName}
                    onChange={(e) => setNewInfluencerName(e.target.value)}
                    placeholder="e.g., John Smith"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Social Handle (optional)
                  </label>
                  <input
                    type="text"
                    value={newInfluencerHandle}
                    onChange={(e) => setNewInfluencerHandle(e.target.value)}
                    placeholder="e.g., johnsmith"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setStep("select")}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                    disabled={isLoading}
                  >
                    Back
                  </button>
                  <button
                    onClick={handleCreateNewInfluencer}
                    disabled={isLoading || !newInfluencerName.trim()}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Continue"
                    )}
                  </button>
                </div>
              </div>
            )}

            {step === "name" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="e.g., Q1 2024 Launch"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    autoFocus
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setStep("select")}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                    disabled={isLoading}
                  >
                    Back
                  </button>
                  <button
                    onClick={handleCreateProject}
                    disabled={isLoading || !projectName.trim()}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Project"
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
