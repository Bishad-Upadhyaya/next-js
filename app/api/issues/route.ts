import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

import { createIssueSchema } from "../../validationSchemas";

// Create an Issue
export async function POST(request: NextRequest) {
  const body = await request.json();

  // Validate the body of the request
  const validation = createIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  // On successful validation
  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newIssue, { status: 201 });
}

// Get the list of issues or a specific issue by ID
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const issue = await prisma.issue.findUnique({
      where: { id: Number(id) },
    });

    if (!issue) {
      return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }

    return NextResponse.json(issue, { status: 200 });
  } else {
    const issues = await prisma.issue.findMany();
    return NextResponse.json(issues, { status: 200 });
  }
}

// Update an issue
export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required!" }, { status: 400 });
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: Number(id) },
    data: {
      title: body.title,
      description: body.description,
      status: body.status,
    },
  });

  return NextResponse.json(updatedIssue, { status: 201 });
}

// Delete an issue by ID
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required!" }, { status: 400 });
  }

  await prisma.issue.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json(
    { message: "Item deleted succesfully!" },
    { status: 200 }
  );
}
