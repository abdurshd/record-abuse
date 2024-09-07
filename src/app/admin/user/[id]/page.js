import React from "react";

import { GetMessagesByUserId } from '@/DB/user';
import {Card, CardBody, CardHeader, CardFooter} from "@nextui-org/card";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import CenteredLayout from "@/components/CenteredLayout";


function AssistantMessage({children}) {
  return (
    <Card>
      <CardBody className="flex gap-3">
        <p>{children}</p>
      </CardBody>
    </Card>
  );
}

function UserMessage({children}) {
  return (
    <Card className="bg-blue-500">
      <CardBody>
        <p className="text-right text-white">{children}</p>
      </CardBody>
    </Card>
  );
}

export default async function User({ params }) {
  const userId = params.id;
  const messages = await GetMessagesByUserId(userId);

  return (
    <CenteredLayout>
      <Link href="/admin" passHref>
      <Button>
        &lt; back
      </Button>
        </Link>
      <h1 className="text-2xl font-bold mt-7">Conversation</h1>
      <div className="flex flex-1 flex-row justify-center">
        <ul className="flex flex-col w-2/4">
          {messages.map(message => (
            <React.Fragment key={message.id}>
              <li className="flex justify-start mt-3 pr-10">
                <AssistantMessage>{message.question}</AssistantMessage>
              </li>
              <li className="flex justify-end mt-3 pl-10">
                <UserMessage>{message.answer}</UserMessage>
              </li>
              <div className="flex flex-col opacity-45 text-right mt-5">
                {message.created_at.toLocaleString()}
              </div>
            </React.Fragment>
          ))}
          </ul>
        </div>
      </CenteredLayout>
  );
}
