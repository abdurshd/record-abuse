"use client"
import { useEffect, useState } from 'react';
import { Button, Card, CardFooter, CardHeader } from "@nextui-org/react";
import responserIcon from "@/assets/images/hero.png";
import Image, { getImageProps } from 'next/image';
import Link from "next/link";
import useSessionStorage from "@/hooks/useSessionStorage";
import CustomResponseMessage from '@/components/CustomResponseMessage';

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
  } = getImageProps({ alt: '', src: responserIcon });
  const backgroundImage = getBackgroundImage(srcSet);
  const style = {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    position: 'relative',
    backgroundColor: '#e1f0fd',
    backgroundImage,
  };

  const [hasSeenCard, setHasSeenCard] = useSessionStorage('hasSeenCard', false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCardClose = () => {
    setHasSeenCard(true);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-1" style={style}>
      {!hasSeenCard ? (
        <div className="w-[300px] h-[300px] col-span-12 sm:col-span-5 m-auto">
          <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-5 bg-transparent shadow-lg">
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
              <h4 className="text-white font-medium text-5xl">Are you in immediate danger?</h4>
            </CardHeader>
            <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-around">
              <Link href="/immediate-danger" passHref>
                <Button className="text-tiny" color="primary" radius="full" size="sm" onClick={handleCardClose}>
                  Yes
                </Button>
              </Link>
              <Link href="/chat/chat-with-assistant" passHref>
                <Button className="text-tiny" color="success" radius="full" size="sm" onClick={handleCardClose}>
                  No
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      ) : (
      <Card isFooterBlurred className="w-[700px] h-[300px] col-span-12 sm:col-span-5 bg-white/70 shadow-lg m-auto">
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <CustomResponseMessage message="We’re Here to Help" txtSize="text-6xl" delay={20}/>
          <CustomResponseMessage message="If something is making you feel scared or sad, you can tell us. This is a safe place where we can help you feel better." txtSize="text-xl" delay={5}/>
        </CardHeader>
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-around">
              <Link href="/chat/chat-with-assistant" passHref>
                <Button className="text-tiny" color="success" radius="full" size="sm" onClick={handleCardClose}>
                  Go to Chat
                </Button>
              </Link>
        </CardFooter>
      </Card>
      )}
    </div>
  );
}