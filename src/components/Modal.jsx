"use client"
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

const CustomModal = ({ title, bodyContent, primaryAction, secondaryAction, primaryLabel, secondaryLabel }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = () => {
    onOpen();
  }

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button  
          variant="flat" 
          color="warning" 
          onPress={() => handleOpen()}
          className="capitalize"
        >
          {"Blur"}
        </Button>
      </div>
      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
                {bodyContent}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={secondaryAction || onClose}>
                  {secondaryLabel || "Close"}
                </Button>
                <Button color="primary" onPress={primaryAction || onClose}>
                  {primaryLabel || "Action"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;