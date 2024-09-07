import React from "react";
import { sql } from "@vercel/postgres";
import UserTable from '@/components/UserTable'
import CenteredLayout from "@/components/CenteredLayout";

export default async function Admin() {
  
  const result = await sql`
  SELECT DISTINCT ON (User_ID) User_ID as ID, CREATED_AT, ANSWER
  FROM Conversation
  ORDER BY User_ID, CREATED_AT DESC;
  `

  return (
    <CenteredLayout>
      <UserTable rows={result.rows}/>
    </CenteredLayout>
  );
}
