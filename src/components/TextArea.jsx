import React from "react";
import {Textarea} from "@nextui-org/react";

export default function TextAreaComponent() {
  return (
    <Textarea
      label="New record of abuse"   
      placeholder="Share your story here. You're brave and we're here to listen."      
      className="max-w-xs"
      minRows={7}
      variant="flat"
    />
  );
}