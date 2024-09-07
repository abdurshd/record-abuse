const { Button } = require("@nextui-org/react");
const { default: TextAreaComponent } = require("./TextAreaComponent");
const { default: BodyQuestion } = require("./BodyQuestion");

export default function QuestionLogic({setMessageType, messageType, conversationId, setConversationId, setQuestion }) {

    const [message, setMessage] = useState('');
    const [isLoading, setLoading] = useState(false);
  
  
    const isDisabledState = isLoading;
  
    function handleMessageChange(e) {
      setMessage(e.target.value);
    }
  
    const handleSendMessage = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      try {
        const { conversation, messageType } = await fetch('/api/chat/message', {
          method: 'POST',
          body: JSON.stringify({ message, conversationId }),
        }).then(r => r.json());
  
        setMessage('');
        setQuestion(conversation.question);
        setConversationId(conversation.id);
        setMessageType(messageType);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }
  
    switch (messageType) {
      case 'text':
        return (
          <form onSubmit={handleSendMessage}>
            <TextAreaComponent
              value={message}
              isDisabled={isDisabledState}
              onChange={handleMessageChange}
            />
            <Button color="primary" onClick={handleSendMessage} isLoading={isDisabledState}>Send</Button>
          </form>
        );
      case 'body':
        return (
          <BodyQuestion />
        );
      default:
        return null;
    };
  };
  