import  BodyQuestion from "./BodyQuestion";
import TextQuestion from "./TextQuestion";

export default function QuestionLogic({setMessageType, messageType, conversationId, setConversationId, setQuestion, question }) {  
    switch (messageType) {
      case 'text':
        return (
          <TextQuestion
            setMessageType={setMessageType}
            conversationId={conversationId}
            setConversationId={setConversationId}
            question={question}
            setQuestion={setQuestion}
          />
        );
      case 'body':
        return (
          <BodyQuestion
            setMessageType={setMessageType}
            conversationId={conversationId}
            setConversationId={setConversationId}
            setQuestion={setQuestion}
          />
        );
      default:
        return null;
    };
  };
  