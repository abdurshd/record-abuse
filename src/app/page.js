import Image from "next/image";
import { Button } from "@nextui-org/react";
import TextAreaComponent from "@/components/TextArea";
import ResponseMessage from "@/components/ResponseMessage";


export default function Home() {
  return (
    <div className="m-36">
      <ResponseMessage />
      <TextAreaComponent />
    </div>

  );
}
 