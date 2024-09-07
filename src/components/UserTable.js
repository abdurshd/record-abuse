'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/table";

function renderCell(user, userProp) { 
  if (userProp === 'created_at') {
    return user[userProp].toLocaleString();
  }
  return user[userProp];
}

const columns = [
  {
    key: "id",
    label: "id",
  },
  {
    key: "user_id",
    label: "user_id",
  },
  {
    key: "created_at",
    label: "created_at",
  },
  {
    key: "question",
    label: "question",
  },
  {
    key: "answer",
    label: "answer",
  },
];


export default function TableComponent({ rows = []}) {
  const router = useRouter();
  const handleOnRowAction = React.useCallback((key) => {
    const selectedUser = rows[key - 1];

    router.push(`/admin/user/${selectedUser.id}`);
  }, []);

  return (
    <Table
      aria-label="Example table with dynamic content"
      onRowAction={handleOnRowAction}
      >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
       
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
