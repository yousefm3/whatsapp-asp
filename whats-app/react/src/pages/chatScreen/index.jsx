import { useState, useEffect, useCallback } from "react";
import styles from "./.module.css";

import { AiOutlineUserAdd } from "react-icons/ai";
import defaultAvatar from "../../assets/images/avatars/default.png";
import ChatSplashScreen from "../../components/chatSplashScreen";
import ContactsList from "../../components/contactsList";
import Chat from "../../components/chat";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import { API } from "../../Api";
import LoadingPage from "../../components/LoadingPage";

import {
  HttpTransportType,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";

export default function ChatScreen({ chats, setChats, user }) {
  const [currentChat, setCurrentChat] = useState(null);
  const [connection, setConnection] = useState();
  const [isConnectLoad, setIsConnectLoad] = useState(false);

  const navigate = useNavigate("");

  const initConnection = useCallback(async () => {
    const username = localStorage.getItem("user");

    if (!username) return setIsConnectLoad(true);

    try {
      const connection = new HubConnectionBuilder()
        .withUrl(`${API}/chat`, {
          skipNegotiation: true,
          transport: HttpTransportType.WebSockets,
        })
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceiveMessage", (a, b) => {
        console.log(a, b);
        debugger;

        // const { from, to, content, time } = messagesData;

        // const isToMe = to.username === username;

        // if (!isToMe) return;

        // setChats((prev) => {
        //   // cuurent chat data
        //   const cuurentChat = {
        //     contact: {
        //       username: from.username,
        //       displayName: from.displayName,
        //       avatar: from.avatar || defaultAvatar,
        //     },
        //     messages: [
        //       {
        //         content,
        //         time,
        //         isSender: true,
        //         sender: from.displayName,
        //       },
        //     ],
        //   };

        //   // Check if this chat is alredy exist chat
        //   const ExistChat = prev.find(
        //     (chat) => chat?.contact?.username === from.username
        //   );

        //   if (ExistChat) {
        //     // get Chat Message
        //     const message = cuurentChat.messages[0];

        //     // put message to current chat
        //     ExistChat.messages.push(message);

        //     return [...prev];
        //   }

        //   // new Chat
        //   return [...prev, cuurentChat];
        // });
      });

      connection.onclose(() => setConnection());

      await connection.start();
      await connection.invoke("JoinRoom", username);

      setConnection(connection);
      setIsConnectLoad(true);
    } catch (e) {
      console.log(e);
      setIsConnectLoad(true);
    }
  }, []);

  const sendMessage = async (messageData) => {
    const username = localStorage.getItem("user");

    const { from, to, content } = messageData;

    try {
      await connection.invoke("SendMessage", from, to, content, username);
    } catch (e) {
      console.log(e);
    }
  };

  const closeConnection = async () => {
    try {
      await connection.stop();
    } catch (e) {
      console.log(e);
    }
  };

  const logoutHandelar = () => {
    localStorage.removeItem("user");

    closeConnection();

    navigate("/login");
  };

  useEffect(() => {
    initConnection();
  }, [initConnection]);

  // src={user?.avatar?.length ? user?.avatar : defaultAvatar}

  return (
    <>
      {!isConnectLoad ? (
        <LoadingPage />
      ) : (
        <main className={styles.chat_screen}>
          <div className="container-fluid">
            <div className="row">
              <div className={`col-3 p-0 ${styles.left_sidebar_wrapper}`}>
                <aside className={styles.left_sidebar}>
                  <div className={`${styles.top} p-4`}>
                    <div className={styles.user_info_wrapper}>
                      <div className={`me-2 ${styles.user_avatar}`}>
                        <img src={defaultAvatar} alt="user_avatar" />
                      </div>
                      <div className={`ms-2 ${styles.user_name}`}>
                        <p className="mb-0">{user?.displayname}</p>
                        <span>Active</span>
                      </div>
                    </div>
                    <div className={styles.add_contact_btn_wrapper}>
                      <button
                        className={styles.add_contact_btn}
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#Modal"
                      >
                        <AiOutlineUserAdd />
                      </button>
                    </div>
                  </div>
                  {!user?.contacts?.length ? (
                    <div className={`pt-4`}>
                      <p className="text-center py-2">No contacts added yet!</p>
                    </div>
                  ) : (
                    <>
                      <div className={`px-4 pt-4 pb-3`}>
                        <span className={styles.contacts_list_label}>
                          conacts
                        </span>
                      </div>
                      <ContactsList
                        chats={chats}
                        currentChat={currentChat}
                        setCurrentChat={setCurrentChat}
                        contacts={user?.contacts}
                      />
                    </>
                  )}
                </aside>
                <div
                  className={
                    styles.logoutContainer +
                    " d-flex jusify-content-center align-items-center"
                  }
                >
                  <div
                    onClick={logoutHandelar}
                    className="tag d-flex ms-auto me-2 jusify-content-center align-items-center"
                  >
                    <span className="ms-auto me-2">logout</span>
                    <p className="ms-auto mb-0 p-1 bg-danger rounded-circle">
                      <RiLogoutCircleRLine fontSize={25} />
                    </p>
                  </div>
                </div>
              </div>
              <div className={`col-9 p-0 ${styles.chat_area_wrapper}`}>
                {!currentChat && <ChatSplashScreen />}
                {currentChat && (
                  <Chat
                    chats={chats}
                    setChats={setChats}
                    user={user}
                    currentChat={currentChat}
                    sendMessage={sendMessage}
                  />
                )}
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
