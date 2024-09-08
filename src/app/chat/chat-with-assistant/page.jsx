"use client"

import  React, { useState} from 'react';
import {Button} from "@nextui-org/react";
import ResponseMessage from '@/components/ResponseMessage';
import CenteredLayout from '@/components/CenteredLayout';
import FIRST_MESSAGE from '@/prompts/FIRST_QUESTION';
import QuestionLogic from '@/components/QuestionLogic';

export default function ChatWithAssistant() {
  const [conversationId, setConversationId] = useState(null);
  const [messageType, setMessageType] = useState('text');
  const [question, setQuestion] = useState(FIRST_MESSAGE);
  
  const handleCreateFirstConversation = async (e) => {
    e.preventDefault();

    try {
      const { conversation } = await fetch('/api/chat', {
        method: 'POST',
      }).then(r => r.json());

      setConversationId(conversation.id);
      setQuestion(conversation.question);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <CenteredLayout className="gap-5" style={{ minHeight: "calc(100vh - 84px)"}}>
      <ResponseMessage message={question} />
      {/* <p>conversationId: {conversationId}</p>
      <p>messageType: {messageType}</p> */}
      {conversationId !== null && (
        <QuestionLogic 
          setMessageType={setMessageType} 
          messageType={messageType}
          conversationId={conversationId} 
          setConversationId={setConversationId} 
          setQuestion={setQuestion}
          question={question}
        />
      )}
      {conversationId === null && <Button onClick={handleCreateFirstConversation} color="primary">I'm reading</Button>}
    </CenteredLayout>
  );
}