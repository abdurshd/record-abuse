import React from "react";

import { GetMessagesByUserId } from '@/DB/user';
import {Card, CardBody, CardHeader, CardFooter} from "@nextui-org/card";


export default async function User({ params }) {
  const userId = params.id;
  const messages = await GetMessagesByUserId(userId);

  return (
      <ul className="w-2/4">
        {messages.map(message => (
          <>
          <li className="flex justify-start mt-3 pr-10" key={message.id}>
            <Card className="">
              <CardBody className="flex gap-3">
              <p>{message.question}</p>
              </CardBody>
            </Card>
          </li>
          <li className="flex justify-end mt-3 pl-10" key={message.id}>
            <Card className="w-2/4 bg-blue-500">
              <CardBody>
              <p className="text-right text-white">{message.answer}</p>
              </CardBody>
            </Card>
          </li>
          <div className="flex flex-col relative h-auto w-3/4">
            <p className="mt-5 text-right">{message.created_at.toLocaleString()}</p>
          </div>
          </>
        ))}
      </ul>
  );
}
