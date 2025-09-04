import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

function PublicRoute({ children }) {
  const { isAuthenticated, isCheckingAuth, checkAuth, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (!isCheckingAuth) {
      if (isAuthenticated && user?.isVerified) {
        navigate("/");
      } else if (isAuthenticated && !user?.isVerified) {
        navigate("/verify-email");
      }
    }
  }, [isAuthenticated, isCheckingAuth, navigate, user]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return !isAuthenticated ? children : null;
}

export default PublicRoute;
