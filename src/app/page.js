
import {Button, Card, CardFooter, CardHeader} from "@nextui-org/react";
import responserIcon from "@/assets/images/hero.png";
import Image, { getImageProps } from 'next/image'
import Link from "next/link";
 
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
    backgroundColor: '#e1f0fd',
    backgroundImage,
  }

  return (
    <div className="flex flex-1" style={style}>
    <div className="w-[300px] h-[300px] col-span-12 sm:col-span-5 m-auto">
      <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-5 bg-transparent shadow-lg">
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <h4 className="text-white font-medium text-5xl">Are you in immediate danger?</h4>
        </CardHeader>
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-around">
          <Link href="/immediate-danger" passHref>
            <Button className="text-tiny" color="primary" radius="full" size="sm">
              Yes
            </Button>
          </Link>
          <Link href="/chat/chat-with-assistant" passHref>
            <Button className="text-tiny" color="success" radius="full" size="sm">
              No
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
    </div>
  );
}
