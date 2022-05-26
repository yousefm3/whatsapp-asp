import React from "react";
import styles from "./.module.css";
import ChatHeader from "../chatHeader";
import ChatFooter from "../chatFooter";
import ChatsContainer from "../chatsContainer";

export default function Chat({
  chats,
  setChats,
  currentChat,
  user,
  sendMessage,
}) {
  return (
    <div className={styles.chat_main_wrapper}>
      <ChatHeader currentChat={currentChat} />
      <ChatsContainer
        chats={chats}
        currentChat={currentChat}
        setChats={setChats}
        user={user}
      />
      <ChatFooter
        sendMessage={sendMessage}
        chats={chats}
        currentChat={currentChat}
        setChats={setChats}
        user={user}
      />
    </div>
  );
}
