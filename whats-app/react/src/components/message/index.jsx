import React from "react";
import styles from "./.module.css";
import defaultAvatar from "../../assets/images/avatars/default.png";
import { BsCheckAll } from "react-icons/bs";

export default function Message({ user, content }) {
  return (
    <div className={`${styles.message} ${!content.isSender && "text-end"}`}>
      <div className="d-inline-flex">
        <div
          className={`${styles.message_} ${
            content.isSender && "order-2 ms-3"
          } ${!content.isSender && "align-items-end me-3"}`}
        >
          <div
            className={`${styles.message_content} ${
              content.isSender && styles.gray_bg
            } `}
          >
            <span className="m-2">
              {/* Render Message Text Content */}
              <p className={!content?.image && !content?.video ? "m-0" : null}>
                {content?.content && content?.content}
              </p>

              {/* Render Message Image If Exists */}
              {content?.image && (
                <img alt="message_image" src={content?.image} />
              )}

              {/* Render Message Image If Exists */}
              {content?.audio && <audio controls src={content?.audio} />}

              {/* Render Message Video If Exists */}
              {content?.video && (
                <video autoPlay controls src={content?.video} />
              )}
            </span>
          </div>
          <div className={styles.message_info}>
            <BsCheckAll className={styles.seen_icon} />
            <span className={`mx-2 ${styles.message_time}`}>
              {new Date(content?.time)?.toLocaleTimeString()}
            </span>
            <span className={styles.message_sender}>
              {content.isSender ? content.sender : "You"}
            </span>
          </div>
        </div>
        <div
          className={`${styles.user_avatar} ${content.isSender && "order-1"}`}
        >
          <div className={styles.user_avatar_img}>
            <img src={defaultAvatar} alt="user_avatar" />
          </div>
        </div>
      </div>
    </div>
  );
}
