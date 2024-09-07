"use client"
import { Card,  } from "@nextui-org/react";
import responserIcon from "@/assets/images/working.png";
import Image from "next/image";

const ResponseMessage = ({ message}) => {
  return (
    <div className="flex flex-row m-4">
        <Image src={responserIcon} alt="responser" width={50} height={50} className="m-4 w-[50px] h-[50px]" />      
        <Card variant="flat" className="max-w-[800px] p-6 bg-blue-100">
        <p className="text-sm text-gray-600 mt-2">
          {message}
        </p>

      </Card>   
    </div>
  );
};

export default ResponseMessage;