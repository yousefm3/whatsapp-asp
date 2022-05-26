import React, { useState, useEffect } from "react";
import styles from "./.module.css";
import { IoMdAttach } from "react-icons/io";
import { RiSendPlane2Fill } from "react-icons/ri";
import { BsCardImage, BsFillMicFill } from "react-icons/bs";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import useRecorder from "../../hooks/useRecorder";

export default function ChatFooter({
  chats,
  sendMessage,
  setChats,
  currentChat,
  user,
}) {
  const [open, setOpen] = useState(false);
  const [audioURL, isRecording, startRecording, stopRecording] = useRecorder();

  // Chat Message States (Text,Image,Video,Record)
  const [Chat, setChat] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [messageImage, setMessageImage] = useState(null);
  const [messageVideo, setMessageVideo] = useState(null);
  const [messageRecord, setMessageRecord] = useState(null);

  // Get the current chat
  useEffect(() => {
    const CHAT = chats?.find(
      (chat) => chat?.contact?.username === currentChat?.contact?.username
    );
    setChat(CHAT);
  }, [chats, currentChat]);

  useEffect(() => {
    if (audioURL) {
      setMessageRecord(audioURL);
    }
  }, [audioURL]);

  return (
    <div className={styles.chat_footer}>
      {(messageImage || messageVideo || messageRecord) && (
        <div className={styles.filesAlert}>
          <span>
            {messageImage && "You have selected an image"}
            {messageVideo && "You have selected an image"}
            {messageRecord && "You have selected an audio record"}
          </span>
          <button
            onClick={() => {
              setMessageImage(null);
              setMessageVideo(null);
              setMessageRecord(null);
              setOpen(false);
            }}
          >
            <FaTimes />
          </button>
        </div>
      )}
      <div className="row">
        <div className="col-9">
          <div className="px-4">
            <form
              autoComplete="off"
              onChange={(e) => {
                if (e.target.name === "image") {
                  setMessageImage(URL.createObjectURL(e.target.files[0]));
                }
                if (e.target.name === "video") {
                  setMessageVideo(URL.createObjectURL(e.target.files[0]));
                }
                setOpen(false);
              }}
              onSubmit={(e) => {
                setOpen(false);
                e.preventDefault();

                // Filter The Chats
                const filteredChats = chats.filter(
                  (chat) =>
                    chat?.contact?.username !== currentChat?.contact?.username
                );

                // Update The Current Chat
                let newChat;
                if (Chat) {
                  newChat = {
                    ...Chat,
                    messages: [
                      ...Chat.messages,
                      {
                        content: messageText,
                        time: new Date(),
                        image: messageImage,
                        video: messageVideo,
                        audio: messageRecord,
                      },
                    ],
                  };
                } else {
                  newChat = {
                    contact: currentChat.contact,
                    messages: [
                      {
                        content: messageText,
                        time: new Date(),
                        image: messageImage,
                        video: messageVideo,
                        audio: messageRecord,
                      },
                    ],
                  };
                }

                setChats([...filteredChats, newChat]);

                sendMessage({
                  from: user.credentials.username,
                  to: currentChat.contact.username,
                  content: messageText,
                });

                // Clear States
                setMessageText("");
                setMessageImage(null);
                setMessageVideo(null);
                setMessageRecord(null);
                setOpen(false);
              }}
            >
              <div className="row align-items-center">
                <div className="col-1 position-relative">
                  {/* Send Attachement Pop Up */}
                  {open && (
                    <ul className={styles.attachments_list}>
                      <li>
                        <label htmlFor="image">
                          <BsCardImage />
                        </label>
                        <input
                          disabled={messageRecord || messageVideo}
                          type="file"
                          name="image"
                          className="d-none"
                          id="image"
                          accept="image/*"
                        />
                      </li>
                      <li>
                        <label htmlFor="video">
                          <AiOutlineVideoCameraAdd />
                        </label>
                        <input
                          disabled={messageRecord || messageImage}
                          type="file"
                          name="video"
                          className="d-none"
                          id="video"
                          accept="video/*"
                        />
                      </li>
                      <li>
                        <button
                          className={isRecording && styles.isActive}
                          disabled={messageImage || messageVideo}
                          onClick={(e) => {
                            e.preventDefault();
                            if (!isRecording) {
                              startRecording();
                            } else {
                              stopRecording();
                              setOpen(false);
                            }
                          }}
                        >
                          <BsFillMicFill />
                        </button>
                      </li>
                    </ul>
                  )}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(!open);
                    }}
                    type="button"
                    title="Attachments"
                    className={styles.attachment_btn}
                  >
                    <IoMdAttach />
                  </button>
                </div>

                <div className="col-10 p-0 text-center">
                  <input
                    onChange={(e) => setMessageText(e.target.value)}
                    value={messageText}
                    className={styles.message_input}
                    name="message"
                    type="text"
                    placeholder="Type Your Message Here ..."
                  />
                </div>

                <div className="col-1 text-end">
                  <button
                    title="Send"
                    disabled={
                      !messageText &&
                      !messageImage &&
                      !messageVideo &&
                      !messageRecord
                    }
                    className={styles.send_btn}
                    type="submit"
                  >
                    <RiSendPlane2Fill />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
