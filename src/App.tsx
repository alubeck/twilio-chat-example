import React from "react";
import Chat from "./Chat";
import ConversationAppProvider from "./ConversationAppProvider";

function App() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <ConversationAppProvider>
        <Chat jobId={String(process.env.REACT_APP_CHANNEL_UNIQUE)} />
      </ConversationAppProvider>
    </div>
  );
}

export default App;
