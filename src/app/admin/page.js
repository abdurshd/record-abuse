import React from "react";

import { GetUserMessages } from '@/DB/user';
import UserTable from '@/components/UserTable'
import CenteredLayout from "@/components/CenteredLayout";

export default async function Admin() {
  const users = await GetUserMessages();

  return (
    <CenteredLayout>
      <UserTable rows={users}/>
    </CenteredLayout>
  );
}
