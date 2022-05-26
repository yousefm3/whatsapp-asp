import React, { useState, useEffect, useCallback } from "react";
import styles from "./.module.css";
import InputField from "../../components/inputField";
import SubmitBtn from "../../components/submitBtn";
import { Link } from "react-router-dom";
import readFormData from "../../utils/readFormData";
import { useNavigate } from "react-router-dom";

import request from "../../Api";

export default function Login({ setUser, setChats, setNotification }) {
  const navigate = useNavigate();
  const [formObject, setFormObject] = useState(null);

  const [requestLoading, setRequestLoading] = useState(false);

  const loginHandelar = useCallback(() => {
    if (!formObject) return;

    setRequestLoading(true);

    const { username, password } = formObject;

    request({
      method: "GET",
      url: `/login?username=${username}&password=${password}`,
    })
      .then(({ data: { data, code, error } }) => {
        if (code === 200) {
          const { displayname, avatar, contacts, chats } = data;

          setUser({
            credentials: {
              username: username,
              password: "XXXXXXXXX",
            },
            displayname,
            avatar,
            contacts,
          });

          setChats(chats);

          localStorage.setItem("user", username);

          return navigate("/");
        }

        setNotification({
          type: "danger",
          msg: error,
        });

        setRequestLoading(false);
      })
      .catch((err) => {
        setNotification({
          type: "danger",
          msg: err.message,
        });

        setRequestLoading(false);
      });
  }, [setUser, setChats, navigate, formObject, setNotification]);

  // Set A Handler on Form Object
  useEffect(() => loginHandelar(), [loginHandelar]);

  return (
    <div className="container position-relative d-flex align-items-center justify-content-center">
      <section className={styles.login_page}>
        <form
          onSubmit={(e) => {
            // Prevent The Default Behavior of HTML Form
            e.preventDefault();

            // Read The Form Input Values (Data) And Set Them Into Object
            setFormObject(readFormData(e, true));
          }}
        >
          <InputField
            placeholder={"Enter Username"}
            type={"text"}
            label={"username"}
            required={true}
            minLength={4}
            id={"username"}
            name="username"
          />
          <InputField
            placeholder={"Enter Password"}
            type={"password"}
            label={"password"}
            required={true}
            id={"password"}
            name="password"
            minLength={8}
          />
          <div className="py-3 pb-4">
            <SubmitBtn disabled={requestLoading} text={"Log In"} />
          </div>
        </form>
        <p>
          Don't have an account ?{" "}
          <Link className={styles.anchor_link} to="/register">
            Register
          </Link>
        </p>
      </section>
      <p className="position-absolute bottom-0 end-0">
        Do you want to rate ?{" "}
        <a className={styles.anchor_link} target="_blanc" href="http://localhost:5012/Ratings/Create">
          Rating
        </a>
      </p>
    </div>
  );
}
