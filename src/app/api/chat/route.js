import { NextResponse } from "next/server";

import childProtectionAssistant from "@/utils/chat/childProtectionAssistant";
import openai from "@/utils/openai";
import { CreateConversation } from "@/DB/conversation";

export async function POST(request) {
  const { message, threadId, userId } = await request.json();
  const assistant = await childProtectionAssistant();

  await openai.beta.threads.messages.create(
    threadId,
    {
      role: "user",
      content: message
    }
  );

  const run = await openai.beta.threads.runs.createAndPoll(
    threadId,
    { 
      assistant_id: assistant.id,
    }
  );

  if (run.status === 'completed') {
    const messageList = await openai.beta.threads.messages.list(
      run.thread_id
    );

    const {sanitizeInput, answer} = JSON.parse(messageList.data[0].content[0].text.value);

    await CreateConversation({answer: sanitizeInput, question: answer, userId });
    return NextResponse.json({ runStatus: run.status, answer });
  }

  return NextResponse.json({ runStatus: run.status }, { status: 500 });
}