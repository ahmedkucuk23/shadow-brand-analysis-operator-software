import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

// GET /api/influencers - List all influencers for the current user
export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const influencers = await db.influencer.findMany({
      where: { userId: session.user.id },
      include: {
        projects: {
          select: {
            id: true,
            name: true,
            status: true,
            currentStep: true,
            completedSteps: true,
            lastAccessedAt: true,
          },
          orderBy: { lastAccessedAt: "desc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ influencers });
  } catch (error) {
    console.error("Error fetching influencers:", error);
    return NextResponse.json(
      { error: "Failed to fetch influencers" },
      { status: 500 }
    );
  }
}

// POST /api/influencers - Create a new influencer
export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { name, handle } = data;

    if (!name) {
      return NextResponse.json(
        { error: "name is required" },
        { status: 400 }
      );
    }

    const influencer = await db.influencer.create({
      data: {
        userId: session.user.id,
        name,
        handle: handle || null,
      },
    });

    return NextResponse.json({ influencer }, { status: 201 });
  } catch (error) {
    console.error("Error creating influencer:", error);
    return NextResponse.json(
      { error: "Failed to create influencer" },
      { status: 500 }
    );
  }
}
