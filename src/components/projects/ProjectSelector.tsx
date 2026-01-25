"use client";

import { useState, useEffect } from "react";
import { X, Plus, Loader2, FolderOpen } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { ProjectCard } from "./ProjectCard";
import { CreateProjectModal } from "./CreateProjectModal";

interface Influencer {
  id: string;
  name: string;
  handle: string | null;
}

interface Project {
  id: string;
  name: string;
  influencerId: string;
  influencer: Influencer;
  status: "in_progress" | "completed";
  currentStep: number;
  completedSteps: number[];
  lastAccessedAt: Date;
}

interface ProjectSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectProject: (projectId: string) => void;
  currentProjectId: string | null;
}

export function ProjectSelector({
  open,
  onOpenChange,
  onSelectProject,
  currentProjectId,
}: ProjectSelectorProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [projectsRes, influencersRes] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/influencers"),
      ]);

      if (!projectsRes.ok || !influencersRes.ok) {
        throw new Error("Failed to fetch data");
      }

      const [projectsData, influencersData] = await Promise.all([
        projectsRes.json(),
        influencersRes.json(),
      ]);

      setProjects(projectsData.projects || []);
      setInfluencers(influencersData.influencers || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load projects");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchData();
    }
  }, [open]);

  const handleCreateInfluencer = async (name: string, handle?: string): Promise<Influencer> => {
    const res = await fetch("/api/influencers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, handle }),
    });

    if (!res.ok) {
      const data = await res.json();
      const errorMsg = data.details
        ? `${data.error}: ${data.details}`
        : data.error || "Failed to create influencer";
      throw new Error(errorMsg);
    }

    const { influencer } = await res.json();
    setInfluencers((prev) => [...prev, influencer]);
    return influencer;
  };

  const handleCreateProject = async (influencerId: string, name: string): Promise<void> => {
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ influencerId, name }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Failed to create project");
    }

    const { project } = await res.json();
    setShowCreateModal(false);
    onSelectProject(project.id);
    onOpenChange(false);
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project? This cannot be undone.")) {
      return;
    }

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete project");
      }

      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete project");
    }
  };

  const handleSelectProject = (id: string) => {
    onSelectProject(id);
    onOpenChange(false);
  };

  return (
    <>
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[85vh] overflow-hidden z-50 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <FolderOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <Dialog.Title className="text-lg font-semibold text-slate-900">
                    Your Projects
                  </Dialog.Title>
                  <p className="text-sm text-slate-500">
                    {projects.length} project{projects.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  New Project
                </button>
                <Dialog.Close asChild>
                  <button className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </Dialog.Close>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-3" />
                  <p className="text-sm text-slate-500">Loading projects...</p>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <p className="text-sm text-red-600 mb-3">{error}</p>
                  <button
                    onClick={fetchData}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Try again
                  </button>
                </div>
              ) : projects.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                    <FolderOpen className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">No projects yet</h3>
                  <p className="text-sm text-slate-500 mb-4 text-center">
                    Create your first project to get started with the Shadow Operator wizard.
                  </p>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Create Project
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      id={project.id}
                      name={project.name}
                      influencerName={project.influencer.name}
                      status={project.status}
                      currentStep={project.currentStep}
                      completedSteps={project.completedSteps}
                      lastAccessedAt={new Date(project.lastAccessedAt)}
                      onSelect={handleSelectProject}
                      onDelete={handleDeleteProject}
                    />
                  ))}
                </div>
              )}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <CreateProjectModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        influencers={influencers}
        onCreateInfluencer={handleCreateInfluencer}
        onCreateProject={handleCreateProject}
      />
    </>
  );
}
