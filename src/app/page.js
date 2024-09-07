"use client"
import responserIcon from "@/assets/images/hero.png";
import { getImageProps } from 'next/image'
import Link from "next/link";
import { useDisclosure, Button } from "@nextui-org/react";
import CustomModal from "@/components/Modal";
import useSessionStorage from "@/hooks/useSessionStorage";
import { useEffect } from "react";

function getBackgroundImage(srcSet = '') {
  const imageSet = srcSet
    .split(', ')
    .map((str) => {
      const [url, dpi] = str.split(' ')
      return `url("${url}") ${dpi}`
    })
    .join(', ')
  return `image-set(${imageSet})`
}

export default function Home() {
  const {
    props: { srcSet },
  } = getImageProps({ alt: '', src: responserIcon })
  const backgroundImage = getBackgroundImage(srcSet)
  const style = {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    position: 'relative',
    backgroundImage,
  }

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [hasBeenAsked, setHasBeenAsked] = useSessionStorage("hasBeenAsked", false);

  const buttons = [
    {
      label: "Call 911",
      variant: "outline",
      color: "white",
      size: "lg",
      as: Link,
      href: "/immediate-danger",
      passHref: true,
      onPress: () => {}
    },
    {
      label: "Chat with an Assistant",
      variant: "outline",
      color: "white",
      size: "lg",
      as: Link,
      href: "/chat/chat-with-assistant",
      passHref: true,
      onPress: () => {}
    },
  ];

  useEffect(() => {
    if (!hasBeenAsked) {
      onOpen();
      setHasBeenAsked(true);
    }
  }, [hasBeenAsked, onOpen, setHasBeenAsked]);

  return (
    <div className="flex flex-1">
      <div className="mx-36 flex flex-1" style={style}>
        <div className="flex flex-1 flex-col self-end items-center gap-5">
          <CustomModal 
            title="Are you in immediate danger?" 
            message="Are you in immediate danger? If so, please call 911 immediately. Or if you still want to tell about your concerns click on No button, and we will listen and help your problem" 
            buttons={buttons}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
          />
          
        </div>
      </div>
    </div>
  );
}