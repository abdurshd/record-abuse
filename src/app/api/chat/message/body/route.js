import { NextResponse } from "next/server";

import openai from "@/utils/openai";
import { createAbuse, getUserByConversationId } from "@/DB/user";
import childProtectionAssistant from "@/utils/chat/childProtectionAssistant";
import { createConversation, updateConversation } from "@/DB/conversation";

export async function POST(request) {
  const { messages, conversationId } = await request.json();
  const user = await getUserByConversationId(conversationId);

  await Promise.all(messages.map(async (message) => {
    await createAbuse({ message: message.content, x: message.x, y: message.y, conversationID: conversationId });
  }));

  const { sanitizeInput, answer: newQuestion } = await replyToAssistant({ messages, threadId: user.thread_id });
  const conversation = await createConversation({ question: newQuestion, userId: user.id });

  await updateConversation({ id: conversationId, answer: sanitizeInput });

  return NextResponse.json({ conversation, messageType: 'text' });
}

async function replyToAssistant({ messages, threadId }) {
  const assistant = await childProtectionAssistant();

  await Promise.all(messages.map(async (message) => {
    await openai.beta.threads.messages.create(
      threadId,
      {
        role: "user",
        content: message.content,
      }
    )
  }));

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

    return JSON.parse(messageList.data[0].content[0].text.value);
  }

  throw new Error(`Invalid run status: ${run.status}`);
}