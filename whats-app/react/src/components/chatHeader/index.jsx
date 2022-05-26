import React, { useState } from "react";

import styles from "./.module.css";
import defaultAvatar from "../../assets/images/avatars/default.png";

export default function ChatHeader({ currentChat }) {
  const [avatar, setAvatar] = useState(null);

  return (
    <header className={`${styles.top_header}`}>
      <div className={styles.container_}>
        <div className={styles.overlay}></div>
        <div className={`px-4 ${styles.header_content}`}>
          <div className={styles.user_info_wrapper}>
            <div className={`me-2 ${styles.user_avatar}`}>
              <img src={avatar || defaultAvatar} alt="contact_avatar" />
            </div>
            <div className={`ms-2 ${styles.user_name}`}>
              <p className="mb-0">{currentChat?.contact?.displayName}</p>
              <span>Active</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
