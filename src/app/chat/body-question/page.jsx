import Image from "next/image";
import bodyImage from "@/assets/images/body.png";

export default function BodyQuestion() {
  return (
    <>
      <Image src={bodyImage} alt={'body picture for pointing out the body part that got hurt'}/>
    </>
  )
}