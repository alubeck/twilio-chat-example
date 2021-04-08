import React, { useEffect, useState } from "react";
import { Client } from "twilio-chat";
import { Channel } from "twilio-chat/lib/channel";
import { Message } from "twilio-chat/lib/message";

export interface IChat {
  channelProxy: null | Channel;
  messages: Message[];
  sendMessage: (message: string) => void;
}

interface IConversation {
  getChatForJobId: (jobId: string) => Promise<IChat>;
  messages: Message[];
}

const initialChatContext: IChat = {
  channelProxy: null,
  messages: [],
  sendMessage: (message: string) => {},
};

const initialContext: IConversation = {
  getChatForJobId: (jobId: string) => Promise.resolve(initialChatContext),
  messages: [],
};

export const ConversationAppContext = React.createContext(initialContext);

const ConversationAppProvider: React.FC = ({ children }) => {
  const [connectionTries, setConnectionTries] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);

  const [bundle, setBundle] = useState({
    getChatForJobId: initialContext.getChatForJobId,
  });

  useEffect(() => {
    if (!process.env.REACT_APP_TOKEN || connectionTries > 2) {
      throw new Error("Not available to connect to Twilio");
    }
    Client.create(process.env.REACT_APP_TOKEN)
      .then(client => {
        client.on("connectionStateChanged", state => {
          if (state === "connected") {
            setBundle({
              getChatForJobId: (jobId: string) =>
                new Promise(async (resolve, reject) => {
                  const channel = await client.getChannelByUniqueName(jobId);
                  try {
                    await channel.join();
                  } catch (e) {
                    console.log("all is clear already joined...");
                  }
                  const messages = await channel.getMessages();

                  channel.on("messageAdded", async msg => {
                    const messages = await channel.getMessages();
                    setMessages(messages.items);
                  });
                  resolve({
                    channelProxy: channel,
                    messages: messages.items,
                    sendMessage: async (message: string) => {
                      await channel.sendMessage(message);
                    },
                  });
                }),
            });
          }
        });
      })
      .catch(() => {
        setConnectionTries(connectionTries + 1);
      });
  }, [connectionTries]);

  return (
    <ConversationAppContext.Provider
      value={{ getChatForJobId: bundle.getChatForJobId, messages }}
    >
      {children}
    </ConversationAppContext.Provider>
  );
};

export default ConversationAppProvider;
