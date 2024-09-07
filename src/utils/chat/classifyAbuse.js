import z from 'zod';
import { zodResponseFormat } from "openai/helpers/zod";

import ABUSE_CLASSIFICATION from "@/prompts/ABUSE_CLASSIFICATION";
import openai from "@/utils/openai";

const ClassifiedAbuse = z.object({
  category: z.enum(['Physical abuse', 'Sexual abuse', 'Emotional abuse', 'Medical abuse', 'Neglect', 'None']),
});

export default async function classifyAbuse({ conversationHistory }) {
  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: ABUSE_CLASSIFICATION,
      },
      ...conversationHistory,
    ],
    response_format: zodResponseFormat(ClassifiedAbuse, "abuse"),
  });

  return completion.choices[0].message.parsed;
}