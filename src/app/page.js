
import {Button} from "@nextui-org/react";
import responserIcon from "@/assets/images/hero.png";
import { getImageProps } from 'next/image'
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
    <div className="flex flex-1">
      <div className="flex flex-1" style={style}>
        <div className="flex flex-1 flex-col self-end items-center gap-5">
          <p className="text-6xl text-white text-center">Are you in immediate danger?</p>
          <div className="flex flex-1 gap-5 mb-10">
            <Link href="/immediate-danger" passHref>
              <Button>Yes</Button>
            </Link>
            <Link href="/chat/chat-with-assistant" passHref>
              <Button>No</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
