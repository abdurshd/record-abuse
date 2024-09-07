import { NextResponse } from "next/server";

import childProtectionAssistant from "@/utils/chat/childProtectionAssistant";
import openai from "@/utils/openai";
import { createConversation, getConversation, updateConversation } from "@/DB/conversation";
import classifyAbuse from "@/utils/chat/classifyAbuse";
import { getUserByConversationId } from "@/DB/user";

export async function POST(request) {
  const { message, conversationId } = await request.json();
  const user = await getUserByConversationId(conversationId);
  const currentConversation = await getConversation(conversationId);

  try {
    const { sanitizeInput, answer: newQuestion } = await replyToAssistant({ message, threadId: user.thread_id });

    await updateConversation({ id: conversationId, answer: sanitizeInput });

    const isBodyMessage = await shouldDiplayBodyMessage({ answer: message, question: currentConversation.question });

    const conversation = await createConversation({ question: newQuestion, userId: user.id });

    return NextResponse.json({ conversation, messageType: isBodyMessage ? 'body' : 'text' });
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

async function replyToAssistant({ message, threadId }) {
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

    return JSON.parse(messageList.data[0].content[0].text.value);
  }

  throw new Error(`Invalid run status: ${run.status}`);
}

async function shouldDiplayBodyMessage({ question, answer }) {
  const { category } = await classifyAbuse({ conversationHistory: [
    { role: "assistant", content: question },
    { role: "user", content: answer },
  ]});

  return ['Physical abuse', 'Sexual abuse'].includes(category);
}