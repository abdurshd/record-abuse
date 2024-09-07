"use client"

import React from 'react';
import {Button} from "@nextui-org/react";
import { Textarea } from '@nextui-org/input';

export default function ChatWithAssistant() {
  const [threadId, setThreadId] = React.useState('thread_Lhr0CxsKIqxDuV2OZ0dAWdJT');
  const [message, setMessage] = React.useState('');
  const [question, setQuestion] = React.useState('Hello how are you?');
  const [isLoading, setLoading] = React.useState(false);

  const textAreaIsDisabled = isLoading;

  function handleMessageChange(e) {
    setMessage(e.target.value);
  }

  const handleCreateThread = async (e) => {
    e.preventDefault();

    try {
      const { thread } = await fetch('/api/user', {
        method: 'POST',
      }).then(r => r.json());

      setThreadId(thread.id);
    } catch (err) {
      console.error(err);
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { answer } = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ message, threadId }),
      }).then(r => r.json());

      setMessage('');
      setQuestion(answer);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  return (
    <>
      <p>{question}</p>
      {threadId !== '' && (
        <>
          <Textarea
            value={message}
            isDisabled={textAreaIsDisabled}
            onChange={handleMessageChange}
          />
          <Button onClick={handleSendMessage}>Send {threadId}</Button>
        </>
      )}
      {threadId === '' && <Button onClick={handleCreateThread}>Create threadId</Button>}
    </>
  );
}