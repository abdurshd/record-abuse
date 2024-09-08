import React from "react";

import { Button } from "@nextui-org/react";
import TextAreaComponent from "./TextAreaComponent";
import ResponseMessage from "./ResponseMessage";

export default function TextQuestion({ setMessageType, conversationId, setConversationId, setQuestion, question }) {
  const [message, setMessage] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);
  const isDisabledState = isLoading;

  function handleMessageChange(e) {
    setMessage(e.target.value);
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
    <>
      <ResponseMessage message={question} />

      <TextAreaComponent
        value={message}
        isDisabled={isDisabledState}
        onChange={handleMessageChange}
      />
      <Button color="primary" onClick={handleSendMessage} isLoading={isDisabledState}>Send</Button>
    </>
  );
}