import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

const createIssueSchema = z.object({
  title: z.string().min(1, "Title is a required field!").max(255),
  description: z.string().min(1, "Description is a required field!"),
});

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
