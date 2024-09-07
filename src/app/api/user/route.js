import { NextResponse } from "next/server";

import openai from "@/utils/openai";

export async function POST() {
  const thread = await openai.beta.threads.create();
  //@TODO create user here, save in database his thread id, return also the userId

  return NextResponse.json({ thread });
}