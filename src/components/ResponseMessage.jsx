"use client"
import { Card, Text, Avatar, Spacer } from "@nextui-org/react";
import responserIcon from "@/assets/images/working.png";

const ResponseMessage = ({ message, timestamp }) => {
  return (
    <Card variant="flat" className="max-w-[300px] p-6 bg-blue-100">
      <Card.Header>
        <Avatar
          size="sm"
          src={responserIcon.src}
          color="primary"
          bordered
        />
        <Spacer x={0.5} />
        <Text b>AI Assistant</Text>
      </Card.Header>
      <Card.Body>
        <Text>{message}</Text>
      </Card.Body>
      <Card.Footer>
        <Text size="sm" className="text-gray-600">
          {new Date(timestamp).toLocaleTimeString()}
        </Text>
      </Card.Footer>
    </Card>
  );
};

export default ResponseMessage;