import { Navigate } from "react-router-dom";

const AuthGuard = ({ user, children }) => {
  return user?.credentials?.username && user?.displayname ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default AuthGuard;
