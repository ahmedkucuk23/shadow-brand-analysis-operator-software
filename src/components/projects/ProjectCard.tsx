"use client";

import { FolderOpen, MoreVertical, Trash2, Clock, CheckCircle2 } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface ProjectCardProps {
  id: string;
  name: string;
  influencerName: string;
  status: "in_progress" | "completed";
  currentStep: number;
  completedSteps: number[];
  lastAccessedAt: Date;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

const TOTAL_STEPS = 8;

export function ProjectCard({
  id,
  name,
  influencerName,
  status,
  currentStep,
  completedSteps,
  lastAccessedAt,
  onSelect,
  onDelete,
}: ProjectCardProps) {
  const progressPercent = Math.round((completedSteps.length / TOTAL_STEPS) * 100);
  const lastAccessed = new Date(lastAccessedAt);
  const timeAgo = getTimeAgo(lastAccessed);

  return (
    <div
      className="group relative bg-white rounded-xl border border-slate-200 p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
      onClick={() => onSelect(id)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            status === "completed" ? "bg-green-100" : "bg-blue-100"
          }`}>
            {status === "completed" ? (
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            ) : (
              <FolderOpen className="w-5 h-5 text-blue-600" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 line-clamp-1">{name}</h3>
            <p className="text-sm text-slate-500">{influencerName}</p>
          </div>
        </div>

        {/* Menu */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors opacity-0 group-hover:opacity-100"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="min-w-[160px] bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50"
              sideOffset={5}
              align="end"
            >
              <DropdownMenu.Item
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(id);
                }}
                className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer outline-none"
              >
                <Trash2 className="w-4 h-4" />
                Delete Project
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>

      {/* Progress */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium text-slate-600">
            Step {currentStep} of {TOTAL_STEPS}
          </span>
          <span className="text-xs font-medium text-slate-600">{progressPercent}%</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              status === "completed" ? "bg-green-500" : "bg-blue-500"
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-1.5 text-xs text-slate-400">
        <Clock className="w-3.5 h-3.5" />
        <span>Last edited {timeAgo}</span>
      </div>
    </div>
  );
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}
