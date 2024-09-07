
import { Button } from "@nextui-org/react";
import TextAreaComponent from "@/components/TextArea";
import Image from 'next/image'
import responserIcon from "@/assets/images/hero.png";
import { getImageProps } from 'next/image'
 
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
  } = getImageProps({ alt: '', width: 128, height: 128, src: responserIcon })
  const backgroundImage = getBackgroundImage(srcSet)
  const style = {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    position: 'relative',
    backgroundImage,
  }

  return (
    <div className="flex flex-grow max-h-max" style={{ backgroundColor: '#e1f0fd', height: '100%'}}>
      <div className="mx-36" style={style} >
        <TextAreaComponent />
      </div>
    </div>

  );
}
 