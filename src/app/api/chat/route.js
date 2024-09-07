import { NextResponse } from "next/server";

import childProtectionAssistant from "@/utils/chat/childProtectionAssistant";
import openai from "@/utils/openai";

export async function POST(request) {
  const { message, threadId } = await request.json();
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

    //@TODO store messages into conversation table
    return NextResponse.json({ runStatus: run.status, answer });
  }

  return NextResponse.json({ runStatus: run.status }, { status: 500 });
}