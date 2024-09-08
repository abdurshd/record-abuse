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
        {conversationId === null &&<ResponseMessage message={"This is a safe space where you can share how you feel. Everything you tell us will stay completely private. We won't share anything unless you're ready. You don't have to be scared we're here to help and listen. You're not alone, and it's okay to talk when you're ready."} />}
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
      {conversationId === null && <Button onClick={handleCreateFirstConversation} color="primary">I&apos;m ready</Button>}
    </CenteredLayout>
  );
}