import z from 'zod';

import CHILD_PROTECTION_ASSISTANT from "@/prompts/CHILD_PROTECTION_ASSISTANT";
import openai from "@/utils/openai";
import { zodResponseFormat } from "openai/helpers/zod";

const ChatFormat = z.object({
  sanitizeInput: z.string(),
  answer: z.string(),
});

export default async function childProtectionAssistant() {
  const assistant = await openai.beta.assistants.create({
    name: "Child protection assistant",
    instructions: CHILD_PROTECTION_ASSISTANT,
    model: "gpt-4o-mini",
    response_format: zodResponseFormat(ChatFormat, "abuse"),
  });
  
  return assistant;
}


