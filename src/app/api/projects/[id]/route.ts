import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/projects/[id] - Get a single project
export async function GET(request: NextRequest, { params }: RouteParams) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const project = await db.influencerProject.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
      include: {
        influencer: true,
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // Update lastAccessedAt
    await db.influencerProject.update({
      where: { id },
      data: { lastAccessedAt: new Date() },
    });

    return NextResponse.json({ project });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

// PATCH /api/projects/[id] - Update a project (auto-save)
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    // Verify the project belongs to this user
    const existingProject = await db.influencerProject.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!existingProject) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    const data = await request.json();
    const { name, wizardState, currentStep, completedSteps, status } = data;

    const updateData: {
      name?: string;
      wizardState?: object;
      currentStep?: number;
      completedSteps?: number[];
      status?: string;
      lastAccessedAt: Date;
    } = {
      lastAccessedAt: new Date(),
    };

    if (name !== undefined) updateData.name = name;
    if (wizardState !== undefined) updateData.wizardState = wizardState;
    if (currentStep !== undefined) updateData.currentStep = currentStep;
    if (completedSteps !== undefined) updateData.completedSteps = completedSteps;
    if (status !== undefined) updateData.status = status;

    const project = await db.influencerProject.update({
      where: { id },
      data: updateData,
      include: {
        influencer: true,
      },
    });

    return NextResponse.json({ project });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/[id] - Delete a project
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    // Verify the project belongs to this user
    const existingProject = await db.influencerProject.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!existingProject) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    await db.influencerProject.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
