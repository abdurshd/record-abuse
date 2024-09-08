"use client"
import { Button, Card, CardFooter, CardHeader } from "@nextui-org/react";

export default function ReportAbuse() {
  const handleCall = () => {
    window.location.href = "tel:112";
  };

  return (
    <div className="flex flex-1 items-center justify-center min-h-screen bg-blue-100">
      <Card className="w-full max-w-md bg-transparent shadow-lg">
        <CardHeader className="flex-col items-start">
          <h4 className="text-black font-medium text-2xl">Report Child Abuse</h4>
        </CardHeader>
        <div className="p-4">
          <p className="text-black text-lg">
            If you are in danger or need to report a child abuse case, please call the police immediately.
          </p>
          <p className="text-black text-lg mt-2">
            ou can report child abuse by calling <strong>112</strong>. 
          </p>
        </div>
        <CardFooter className="flex justify-center">
          <Button className="text-tiny" color="primary" radius="full" size="sm" onClick={handleCall}>
            Call 112
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}