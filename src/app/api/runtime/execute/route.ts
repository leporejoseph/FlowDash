import { NextResponse } from "next/server";

import { buildMockOrchestration } from "@/lib/protocols";

export async function POST(request: Request) {
  const payload = (await request.json()) as { message?: string };
  const message = payload?.message?.trim();

  if (!message) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  const result = buildMockOrchestration(message);
  return NextResponse.json(result, { status: 200 });
}
