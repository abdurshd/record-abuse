import { sql } from '@vercel/postgres';

export async function CreateUser({password, threadID}) {
  const { rows } = await sql`INSERT INTO User_Information (Password, Thread_ID) VALUES (${password}, ${threadID}) RETURNING *`;

  return rows[0];
}

export async function GetUsers() {
  const user = await sql`SELECT * FROM User_Information;`;
  return user.rows;
}

export async function GetUser(id) {
  const users = await sql`SELECT * FROM User_Information WHERE ID=(${id});`;
  return users.rows;
}

export async function UpdateThreadID(newThreadID, id) {
  await sql`UPDATE User_Information SET Thread_ID =(${newThreadID}) WHERE ID=(${id});`
}

export async function GetMessagesByUserId(userID) {
  const message = await sql`SELECT * FROM Conversation WHERE User_ID=(${userID}) ORDER BY CREATED_AT ASC;`;
  return message.rows;
}

export async function GetUserMessages() {
  const message = await sql`SELECT * FROM Conversation;`;
  return message.rows;
}

export async function getUserByConversationId(conversationId) {
  const users = await sql`SELECT u.* FROM Conversation c JOIN User_Information u ON u.ID = c.User_ID WHERE c.ID=(${conversationId}) LIMIT 1;`;

  return users.rows[0];
}

export async function getLatestConversation(userID) {
  const conversation = await sql`SELECT DISTINCT ON (User_ID) *
  FROM Conversation
  WHERE User_ID = ${userID}
  ORDER BY User_ID, CREATED_AT DESC;`
  return conversation.rows
}

export async function createAbuse({ x, y, conversationID, message }) {
  await sql`INSERT INTO Physical_Abuse (X, Y, Conversation_ID, Message) VALUES (${x}, ${y}, ${conversationID}, ${message})`;
}

