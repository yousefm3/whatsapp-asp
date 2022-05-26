import styles from "./.module.css";
import defaultAvatar from "../../assets/images/avatars/default.png";

// import { API } from "../../Api";

export default function Contact({
  contact,
  setCurrentChat,
  currentChat,
  lastMessage,
}) {
  // contact?.avatar ? `${API}/${contact?.avatar}` : defaultAvatar

  return (
    <li
      className={`px-4 ${styles.contact} ${
        currentChat?.contact?.username === contact.username && styles.active
      }`}
      onClick={() => {
        setCurrentChat({ contact });
      }}
    >
      <div className="d-flex align-items-center">
        <div className="me-2">
          <div className={` ${styles.contact_avatar}`}>
            <img src={defaultAvatar} alt="contact_avatar" />
          </div>
        </div>
        <div className="d-flex flex-column">
          <p className={`m-0 ${styles.contact_name}`}>{contact?.displayName}</p>
          {lastMessage?.content && (
            <span className={styles.last_message}>
              {lastMessage.isSender ? lastMessage.sender : "Me"}:
              {lastMessage.content}
            </span>
          )}
        </div>
      </div>
    </li>
  );
}
