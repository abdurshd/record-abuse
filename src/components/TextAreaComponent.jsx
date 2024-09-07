import React from "react";
import {Textarea} from "@nextui-org/react";

const TextAreaComponent = ({value, disabled, onChange}) => {
  return (
    <Textarea
      placeholder="Share your story here. You're brave and we're here to listen."      
      classNames={{
        base: ["w-[800]", "h-full", "custom-textarea"],
          input: [
            "focus:placeholder-transparent",
            "focus:border-blue-300",
          ],
      }}
      minRows={2}
      maxRows={20}
      value={value}
      style={{ width: '900px' }}
      variant="faded"
      disabled={disabled}
      onChange={onChange}
    />
  );
}

export default TextAreaComponent;