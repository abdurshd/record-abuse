import { sql } from '@vercel/postgres';

export async function CreateConversation({question, answer, userId}) {
  return await sql`INSERT INTO Conversation (QUESTION, ANSWER, User_ID, CREATED_AT) VALUES (${question}, ${answer}, ${userId}, NOW()) RETURNING *`;
}
