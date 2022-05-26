import React from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import styels from "./.module.css";

export default function ChatSplashScreen() {
  return (
    <>
      <RiSendPlaneFill className={styels.icon} />
      <h5 className="mb-3">Welcome to Chat App</h5>
      <div className="row">
        <div className="offset-2  col-8">
          <p className="text-center">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. cum sociis natoque penatibus et
          </p>
        </div>
      </div>
    </>
  );
}
