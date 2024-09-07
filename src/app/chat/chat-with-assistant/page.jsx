"use client"

import React, {useEffect} from 'react';
import {Button} from "@nextui-org/react";
import ResponseMessage from '@/components/ResponseMessage';
import TextAreaComponent from '@/components/TextAreaComponent';
import useSessionStorage from '@/hooks/useSessionStorage';

export default function ChatWithAssistant() {
  const [threadId, setThreadId] = React.useState('thread_Lhr0CxsKIqxDuV2OZ0dAWdJT');
  const [message, setMessage] = React.useState('');
  const [question, setQuestion, removeQuestion] = useSessionStorage('question', 'Hello how are you?');
  const [isLoading, setLoading] = React.useState(false);

  const textAreaIsDisabled = isLoading;

  useEffect(() => {
    if (!question) {
      setQuestion('Hello how are you?');
    }
  }, [question]);

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
    
    <ResponseMessage message={question} />
      {threadId !== '' && (
        <>
          <TextAreaComponent
            value={message}
            isDisabled={textAreaIsDisabled}
            onChange={handleMessageChange}
          />
          <div className="flex gap-4 mt-5">
          <Button onClick={handleSendMessage} color='secondary'>Send {threadId}</Button>
          <Button onClick={()=>removeQuestion()} color='warning'>Remove the assistant answer</Button>
          </div>
        </>
      )}
      {threadId === '' && <Button onClick={handleCreateThread}>Create threadId</Button>}
    </>
  );
}