"use client"

import  React, { useState} from 'react';
import {Button} from "@nextui-org/react";
import ResponseMessage from '@/components/ResponseMessage';
import TextAreaComponent from '@/components/TextAreaComponent';
import CenteredLayout from '@/components/CenteredLayout';
import FIRST_MESSAGE from '@/prompts/FIRST_QUESTION';
import BodyQuestion from '@/components/BodyQuestion';

export default function ChatWithAssistant() {
  const [conversationId, setConversationId] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('text');
  const [question, setQuestion] = useState(FIRST_MESSAGE);
  const [isLoading, setLoading] = useState(false);

  const isDisabledState = isLoading;

  function handleMessageChange(e) {
    setMessage(e.target.value);
  }

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

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { conversation, messageType } = await fetch('/api/chat/message', {
        method: 'POST',
        body: JSON.stringify({ message, conversationId }),
      }).then(r => r.json());

      setMessage('');
      setQuestion(conversation.question);
      setConversationId(conversation.id);
      setMessageType(messageType);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  return (
    <CenteredLayout className="gap-5" style={{ minHeight: "calc(100vh - 84px)"}}>
      <ResponseMessage message={question} />
      <p>conversationId: {conversationId}</p>
      <p>messageType: {messageType}</p>
      {conversationId !== null && (
        messageType === 'body' ? (
          <BodyQuestion /> 
        ) : (
          <>
            <TextAreaComponent
              value={message}
              isDisabled={isDisabledState}
              onChange={handleMessageChange}
            />
            <Button color="primary" onClick={handleSendMessage} isLoading={isDisabledState}>Send</Button>
          </>
        )
      )}
      {conversationId === null && <Button onClick={handleCreateFirstConversation}>Start chatting</Button>}
    </CenteredLayout>
  );
}
