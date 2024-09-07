"use client"

import  React, {useEffect, useState} from 'react';
import {Button} from "@nextui-org/react";
import ResponseMessage from '@/components/ResponseMessage';
import TextAreaComponent from '@/components/TextAreaComponent';
import CenteredLayout from '@/components/CenteredLayout';

export default function ChatWithAssistant() {
  // const [threadId, setThreadId] = useState('thread_Lhr0CxsKIqxDuV2OZ0dAWdJT');
  const [threadId, setThreadId] = useState('');
  const [currentUserId, setCurrentUserId] = useState('');
  const [message, setMessage] = useState('');
  const [question, setQuestion] = useState('Hello how are you?');
  const [isLoading, setLoading] = useState(false);

  const textAreaIsDisabled = isLoading;

  function handleMessageChange(e) {
    setMessage(e.target.value);
  }

  const handleCreateThread = async (e) => {
    e.preventDefault();

    try {
      const { thread, userId } = await fetch('/api/user', {
        method: 'POST',
      }).then(r => r.json());

      setThreadId(thread.id);
      setCurrentUserId(userId);
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
        body: JSON.stringify({ message, threadId, userId: currentUserId }),
      }).then(r => r.json());

      setMessage('');
      setQuestion(answer);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  return (
    <CenteredLayout className="gap-5" style={{ height: "calc(100vh - 84px)"}}>
      <ResponseMessage message={question} />
      userId: {currentUserId}
      {threadId !== '' && (
        <>
          <TextAreaComponent
            value={message}
            isDisabled={textAreaIsDisabled}
            onChange={handleMessageChange}
          />
          <Button color="primary" onClick={handleSendMessage}>Send</Button>
        </>
      )}
      {threadId === '' && <Button onClick={handleCreateThread}>Start chatting</Button>}
    </CenteredLayout>
  );
}