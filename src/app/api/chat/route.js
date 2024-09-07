import { NextResponse } from "next/server";

import openai from "@/utils/openai";
import { CreateUser } from "@/DB/user";
import FIRST_MESSAGE from "@/prompts/FIRST_QUESTION";
import { createConversation } from "@/DB/conversation";

export async function POST() {
  const thread = await openai.beta.threads.create();
  const user = await CreateUser({ password: thread.id, threadID: thread.id });
  const conversation = await createConversation({ question: FIRST_MESSAGE, userId: user.id });

  return NextResponse.json({ conversation });
}