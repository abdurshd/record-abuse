import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

const CustomModal = ({ title, message, buttons, isOpen, onOpenChange }) => {
    
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              <p>{message}</p>
            </ModalBody>
            <ModalFooter>
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  color={button.color}
                  size={button.size}
                  variant={button.variant}
                  onPress={() => {
                    button.onPress();
                    onClose();
                  }}
                  href={button.href}
                  passHref={button.passHref}
                  as={button.as}
                >
                  {button.label}
                </Button>
              ))}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;