import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

function ProtectedRoute({ children }) {
  const { isAuthenticated, isCheckingAuth, checkAuth, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (!isCheckingAuth) {
      if (!isAuthenticated) {
        navigate("/login");
      } else if (isAuthenticated && !user?.isVerified) {
        navigate("/verify-email");
      }
    }
  }, [isAuthenticated, isCheckingAuth, navigate, user]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return isAuthenticated && user?.isVerified ? children : null;
}

export default ProtectedRoute;
