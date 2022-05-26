import React, { useEffect, useState } from "react";
import styles from "./.module.css";
import Message from "../message";

export default function ChatsContainer({ user, currentChat, chats }) {
  const [Chat, setChat] = useState(null);

  useEffect(() => {
    const CHAT = chats?.find(
      (chat) => chat?.contact?.username === currentChat?.contact?.username
    );

    setChat(CHAT);
  }, [chats, currentChat]);

  return (
    <div className={`${styles.chats_container} px-4 py-4`}>
      {!Chat?.messages ? (
        <div className={`${styles.no_messages} text-center py-5`}>
          no messages yet, start a conversion
        </div>
      ) : (
        Chat.messages.length && (
          <div className={styles.messages_wrapper}>
            {Chat?.messages?.map((chat, i) => (
              <Message content={chat} key={i} user={user} />
            ))}
          </div>
        )
      )}
    </div>
  );
}
