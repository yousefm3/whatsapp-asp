import { useState, useEffect, useRef, useCallback } from "react";

import styles from "./.module.css";
import InputField from "../inputField";
import readFormData from "../../utils/readFormData";
import bootstrap from "bootstrap/dist/js/bootstrap";

import request from "../../Api";

export default function Modal({ setUser, user, setNotification }) {
  const [formObject, setFormObject] = useState(null);
  const [term, setterm] = useState("");

  const Modal = useRef();

  const [requestLoading, setRequestLoading] = useState(false);

  const addNewContact = useCallback(
    (contactUsername) => {
      const data = new FormData();
      data.append("uname", user.credentials.username);
      data.append("fusername", contactUsername);

      setRequestLoading(true);

      request({
        method: "POST",
        url: "/newcontact",
        data,
      }) //
        .then(({ data: { code, data, error } }) => {
          if (code === 200) {
            setFormObject(null);

            setUser({ ...user, contacts: [...user?.contacts, data] });

            setterm("");

            setNotification({
              type: "success",
              msg: `"${contactUsername}" Successfully added to your contacts`,
            });

            const myModalEl = document.getElementById("Modal");
            const modal = bootstrap.Modal.getInstance(myModalEl);
            modal.hide();

            return setRequestLoading(false);
          }

          setNotification({
            type: "danger",
            msg: error,
          });

          setRequestLoading(false);
        }) //
        .catch((err) => {
          setNotification({
            type: "danger",
            msg: err,
          });

          setRequestLoading(false);
        });
    },
    [user, setNotification, setUser]
  );

  useEffect(() => {
    if (formObject) addNewContact(formObject.username);
  }, [formObject, addNewContact]);

  return (
    <div
      ref={Modal}
      className={`modal fade`}
      id="Modal"
      tabIndex="-1"
      aria-labelledby="ModalLabel"
      aria-hidden="true"
    >
      <div className={`modal-dialog modal-dialog-centered`}>
        <div className={`modal-content ${styles.Modal_wrapper}`}>
          <div className={`modal-header ${styles.white_border}`}>
            <h6 className="modal-title" id="ModalLabel">
              Add New Contact
            </h6>
            <button
              type="button"
              className="btn-close shadow-none"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setFormObject(readFormData(e));
            }}
          >
            <div className={`modal-body ${styles.white_border}`}>
              <InputField
                term={term}
                placeholder={"Enter Username"}
                type={"text"}
                label={"username"}
                id={"contact_username"}
                required={true}
                name="username"
                minLength={3}
                onChange={setterm}
              />
            </div>
            <div className={`modal-footer ${styles.white_border}`}>
              <button
                type="button"
                className={styles.close_btn}
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                disabled={requestLoading}
                type="submit"
                className={styles.invite_btn}
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
