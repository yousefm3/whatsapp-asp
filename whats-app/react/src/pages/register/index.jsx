import React, { useState, useEffect, useCallback } from "react";
import styles from "./.module.css";
import InputField from "../../components/inputField";
import SubmitBtn from "../../components/submitBtn";
import { Link } from "react-router-dom";
import readFormData from "../../utils/readFormData";
import validateRegister from "../../validators/validateRegister";
import { useNavigate } from "react-router-dom";

import request from "../../Api";

export default function Register({ setNotification, setUser }) {
  const navigate = useNavigate();
  const [formObject, setFormObject] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const registerHandelar = useCallback(
    ({ onSuccess, onError }) => {
      setIsLoading(true);

      const data = new FormData();

      Object.keys(formObject).forEach((key) => {
        if (key === "passwordConfirmation") return;

        const validateKey = key === "displayName" ? "name" : key;

        data.append(validateKey, formObject[key] || null);
      });

      const handelError = (message) => {
        onError(message);

        setIsLoading(false);
      };

      request({
        method: "POST",
        url: "/register",
        data,
      })
        .then(({ data: { code, error } }) => {
          if (code === 200) return onSuccess();

          handelError(error);
        })
        .catch(({ message }) => handelError(message));
    },
    [formObject]
  );

  // Set A Handler on Form Object
  useEffect(() => {
    // Validate The Register User Data
    if (formObject) {
      const { isValid, msg, type } = validateRegister(formObject);

      if (isValid) {
        registerHandelar({
          onSuccess: () => {
            setNotification({ msg, type });

            setTimeout(() => navigate("/login"), 1500);
          },
          onError: (msg) => {
            setNotification({ msg, type: "danger" });
          },
        });
      } //
      else {
        setNotification({ msg, type });
      }
    }
  }, [formObject, setNotification, navigate, setUser, registerHandelar]);

  return (
    <div className="container position-relative d-flex align-items-center justify-content-center">
      <section className={styles.register_page}>
        <form
          onSubmit={(e) => {
            // Prevent The Default Behavior of HTML Form
            e.preventDefault();

            // Read The Form Input Values (Data) And Set Them Into Object
            setFormObject(readFormData(e));
          }}
        >
          <InputField
            placeholder={"Enter Username"}
            type={"text"}
            label={"username"}
            id={"username"}
            required={true}
            name="username"
            minLength={4}
          />
          <InputField
            placeholder={"Enter Password"}
            type={"password"}
            label={"password"}
            id={"password"}
            required={true}
            name="password"
            minLength={8}
          />
          <InputField
            placeholder={"Enter Password Confirmation"}
            type={"password"}
            label={"password confirmation"}
            id={"password_confirmation"}
            required={true}
            name="passwordConfirmation"
            minLength={8}
          />
          <InputField
            placeholder={"Enter Display Name"}
            type={"text"}
            label={"display name"}
            id={"display_name"}
            required={true}
            name="displayName"
            minLength={4}
          />

          <div className="d-flex">
            <InputField
              type={"file"}
              id={"avatar"}
              label={"Upload your avatar"}
              accept="image/*"
            />
          </div>
          <div className="py-1 pb-4">
            <SubmitBtn disabled={isLoading} text={"Register"} />
          </div>
        </form>
        <p>
          Already have an account ?{" "}
          <Link className={styles.anchor_link} to="/login">
            Login
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
