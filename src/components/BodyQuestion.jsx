'use client'
import { sql } from "@vercel/postgres";
import Image from "next/image";
import bodyImage from "@/assets/images/body.png";
import React from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Textarea} from "@nextui-org/react";
import PrettyJSON from "@/components/PrettyJSON";

export default function BodyQuestion() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [ message, setMessage ] = React.useState('');
  const [ messages, setMessages ] = React.useState([]);
  function handleMessageChange(e) {
    setMessage(e.target.value);
  }

  const handleOnClose = (onClose) => () => {
    if(message) {setMessages((oldMessages) => [...oldMessages, message])}
    setMessage('');
    onClose();
  }
  const handleOnOpen = (e) => {
    console.log(e)
    let x = e.clientX
    let y = e.clientY
    onOpen();
  }

  return (
    <div>
      <Image src={bodyImage} onClick={handleOnOpen} />
      <PrettyJSON>{messages}</PrettyJSON>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
              <Textarea
                  autoFocus
                  label="How did they hit you here?"
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