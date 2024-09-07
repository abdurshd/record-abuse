import { NextResponse } from "next/server";

import openai from "@/utils/openai";
import { CreateUser } from "@/DB/user";

export async function POST() {
  const thread = await openai.beta.threads.create();

  const { rows } = await CreateUser({ password: thread.id, threadID: thread.id });

  return NextResponse.json({ thread, userId: rows[0].id });
}