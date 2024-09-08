'use client'
import Image from "next/image";
import bodyImage from "@/assets/images/body.png";
import React from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Textarea} from "@nextui-org/react";
import PrettyJSON from "@/components/PrettyJSON";
import ResponseMessage from "./ResponseMessage";

export default function BodyQuestion({ setMessageType, conversationId, setConversationId, setQuestion }) {
  const [isLoading, setLoading] = React.useState(false);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [ message, setMessage ] = React.useState('');
  const [ messages, setMessages ] = React.useState([]);
  const [ xPercent, setXPercent ] = React.useState(null);
  const [ yPercent, setYPercent ] = React.useState(null);
  function handleMessageChange(e) {
    setMessage(e.target.value);
  }

  const handleOnClose = (onClose) => () => {
    if(message) {
      setMessages((oldMessages) => [...oldMessages, { content: message, x: xPercent, y: yPercent }]);
    }
    setMessage('');
    setXPercent(null);
    setYPercent(null);
    onClose();
  }
  const handleOnOpen = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const imgWidth = rect.width;
    const imgHeight = rect.height;

    setXPercent((x / imgWidth) * 100)
    setYPercent((y / imgHeight) * 100)
    onOpen();
  }

  const handleButton = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { conversation, messageType } = await fetch('/api/chat/message/body', {
        method: 'POST',
        body: JSON.stringify({ messages, conversationId }),
      }).then(r => r.json());

      setMessages([]);
      setQuestion(conversation.question);
      setConversationId(conversation.id);
      setMessageType(messageType);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  const stringifiedMessages =  JSON.stringify(messages, null, 2);

  return (
    <div className="flex flex-1 flex-col gap-5">
      <ResponseMessage message="Where did you get touched or hurt?" />
      <Image
        src={bodyImage}
        onClick={handleOnOpen}
        className="self-center"
        alt={'body picture for pointing out the body part that got hurt'}
      />
       <ol>
        {messages.map((item, index) => (
          <li key={index}>{index+1}. {item.content}</li>
        ))}
      </ol>
      <Button color="primary" onClick={handleButton} isLoading={isLoading}>
        Done
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">What happened?</ModalHeader>
              <ModalBody>
              <Textarea
                  autoFocus
                  // label="What did he do here?"
                  placeholder="He hit me here with a pool cue."
                  variant="bordered"
                  onChange={handleMessageChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleOnClose(onClose)}>
                  Reply
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
   
  )
}