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
  const [clicks, setClicks] = React.useState([]);
  const [ xPercent, setXPercent ] = setXPercent(null);
  const [ yPercent, setYPercent ] = setYPercent(null);
  function handleMessageChange(e) {
    setMessage(e.target.value);
  }

  const handleOnClose = (onClose) => () => {
    if(message) {setMessages((oldMessages) => [...oldMessages, message])}
    setMessage('');
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

  const handleButton = () => {
    console.log([xPercent, yPercent, messages])
  }

  return (
    <div>
      <Image src={bodyImage} onClick={handleOnOpen} alt={'body picture for pointing out the body part that got hurt'}/>
      <PrettyJSON>{messages}</PrettyJSON>
      <Button color="primary" onPress={handleButton}>
        Done
      </Button>
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