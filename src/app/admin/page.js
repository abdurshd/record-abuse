import React from "react";

import { GetUserMessages } from '@/DB/user';
import UserTable from '@/components/UserTable'

export default async function Admin() {
  const users = await GetUserMessages();

  return (
    <div>
      <UserTable rows={users}/>
    </div>
  );
}
