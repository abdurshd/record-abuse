import { sql } from '@vercel/postgres';

export async function createConversation({question, answer, userId}) {
  const { rows } = await sql`INSERT INTO Conversation (QUESTION, ANSWER, User_ID, CREATED_AT) VALUES (${question}, ${answer}, ${userId}, NOW()) RETURNING *`;

  return rows[0];
}


export async function updateConversation({id, answer}) {
  return await sql`
    UPDATE Conversation
    SET ANSWER = ${answer}
    WHERE ID = ${id}
    RETURNING *;
  `;
}

export async function getConversation(id) {
  const { rows } = await sql`
    SELECT * FROM Conversation
    WHERE ID = ${id};
  `;

  return rows[0];
}
