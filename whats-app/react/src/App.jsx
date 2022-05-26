import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

// Global Styling
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/variables.css";
import "./styles/global.css";

// Components
import Register from "./pages/register";
import Login from "./pages/login";
import AuthGuard from "./components/authGuard";
import NotificationToast from "./components/toast";
import ChatScreen from "./pages/chatScreen";
import Modal from "./components/modal";
import LoadingPage from "./components/LoadingPage";

// Api
import request, { API } from "./Api";

export default function App() {
  // APP GLOBAL STATES
  const [user, setUser] = useState();

  const [notification, setNotification] = useState("");
  const [chats, setChats] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("user");

    if (!username) return setIsLoading(true);

    const data = new FormData();
    data.append("username", username);

    request({
      url: "/info",
      method: "POST",
      data,
    })
      .then(({ data: { code, data } }) => {
        if (code === 200) {
          const { displayname, avatar, contacts, chats } = data;

          setUser({
            credentials: {
              username,
              password: "XXXXXXXXX",
            },
            displayname,
            avatar: `${API}/${avatar}`,
            contacts,
          });

          setChats(chats);
        }

        setIsLoading(true);
      }) //
      .catch(() => {
        setIsLoading(true);
      });
  }, []);

  return (
    <BrowserRouter>
      <Modal user={user} setUser={setUser} setNotification={setNotification} />
      <NotificationToast
        data={notification}
        setNotification={setNotification}
      />
      {!isLoading ? (
        <LoadingPage />
      ) : (
        <Routes>
          <Route
            index
            path="/"
            element={
              <AuthGuard user={user}>
                <ChatScreen user={user} chats={chats} setChats={setChats} />
              </AuthGuard>
            }
          />
          <Route
            path="/register"
            element={
              <Register setUser={setUser} setNotification={setNotification} />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                setUser={setUser}
                setChats={setChats}
                setNotification={setNotification}
              />
            }
          />
        </Routes>
      )}
    </BrowserRouter>
  );
}
