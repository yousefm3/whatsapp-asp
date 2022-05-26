import React, { useEffect, useRef } from "react";
import bootstrap from "bootstrap/dist/js/bootstrap";

export default function NotificationToast({
  data: { msg, type },
  setNotification,
}) {
  const Toast = useRef();
  useEffect(() => {
    if (msg && type) {
      const toast = new bootstrap.Toast(Toast.current);
      toast.show();

      setTimeout(() => {
        setNotification({ type: "", msg: "" });
      }, 5000);
    }
  }, [msg, type, setNotification]);

  return (
    <div
      className="position-fixed bottom-0  end-0 p-3"
      style={{ zIndex: 10000 }}
    >
      <div
        ref={Toast}
        id="liveToast"
        className={`toast bg-${type} text-white`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        {type && msg && (
          <div className="toast-body w-100">
            <div className="d-flex w-100 align-items-center justify-content-between">
              <div>{msg}</div>
              <button
                type="button"
                className="shadow-none btn-close ms-auto ps-4 pe-0 me-0"
                data-bs-dismiss="toast"
                aria-label="Close"
              ></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
