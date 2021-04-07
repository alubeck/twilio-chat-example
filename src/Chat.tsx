import React, { useContext, useEffect, useRef, useState } from "react";

import { ChatContainer } from "./ChatUI";
import EnterMessage from "./EnterMessage";
import TextBubble from "./TextBubble";
import { ConversationAppContext, IChat } from "./ConversationAppProvider";
import { Message } from "twilio-chat/lib/message";

interface Props {
  jobId: string;
}

const Chat: React.FC<Props> = ({ jobId }) => {
  const { getChatForJobId, messages } = useContext(ConversationAppContext);
  const [chat, setChat] = useState<null | IChat>(null);

  useEffect(() => {
    console.log("getChatForJobId...");
    getChatForJobId(jobId).then(chat => {
      setChat(chat);
    });
  }, [getChatForJobId]);

  const messagesToRender = messages.length
    ? messages
    : chat
    ? chat.messages
    : [];

  const bottomRef = useRef(null);

  const scrollToBottom = () => {
    //@ts-ignore
    bottomRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <ChatContainer>
      <div style={{ overflow: "scroll", height: "calc(100% - 80px)" }}>
        {messagesToRender.map((message: Message) => {
          const memberPart =
            process.env.REACT_APP_USER !== message.author ? "2" : "1";

          return (
            <TextBubble
              key={message.index}
              postTime={`${message.dateCreated.toLocaleDateString()} - ${message.dateCreated.toLocaleTimeString()}`}
              memberPart={memberPart}
            >
              {message.body}
            </TextBubble>
          );
        })}
        <div ref={bottomRef} />
      </div>
      {chat && (
        <EnterMessage
          onSendMessage={text => {
            chat.sendMessage(text);
          }}
        />
      )}
    </ChatContainer>
  );
};

export default Chat;
