import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";

axios.defaults.withCredentials = true;

const getErrorMessage = (error) =>
  error?.response?.data?.errors?.[0]?.msg ||
  error?.response?.data?.message ||
  error.message ||
  "Something went wrong";

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  isCheckingAuth: true,
  redirectPath: null, // ✅ used for navigation after success

  signup: async (name, email, password) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
        { name, email, password }
      );
      set({
        user: response.data.user,
        isAuthenticated: true,
        redirectPath: "/verify-email" // ✅ redirect here
      });
      toast.success("User created successfully");
    } catch (error) {
      set({ user: null, isAuthenticated: false });
      toast.error(getErrorMessage(error));
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        { email, password }
      );
      set({
        user: response.data.user,
        isAuthenticated: true,
        redirectPath: "/" // ✅ go to dashboard
      });
      toast.success("User logged in successfully");
    } catch (error) {
      set({ user: null, isAuthenticated: false });
      toast.error(getErrorMessage(error));
    } finally {
      set({ isLoading: false });
    }
  },

  verifyEmail: async (verification_token) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/verify-email`,
        { verification_token }
      );
      set({
        isAuthenticated: true,
        redirectPath: "/" // ✅ verified → dashboard
      });
      toast.success(response.data.message);
    } catch (error) {
      set({ isAuthenticated: false });
      toast.error(getErrorMessage(error));
    } finally {
      set({ isLoading: false });
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/checkAuth`
      );
      set({
        user: response.data.user,
        isAuthenticated: true
      });
    } catch (error) {
      console.error(getErrorMessage(error));
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`);
      set({
        user: null,
        isAuthenticated: false,
        redirectPath: "/login" // ✅ logout → login page
      });
      toast.success("User logged out successfully");
    } catch (error) {
      set({ user: null, isAuthenticated: false });
      toast.error(getErrorMessage(error));
    } finally {
      set({ isLoading: false });
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true });
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/forgot-password`,
        { email }
      );
      toast.success("Email sent successfully");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      set({ isLoading: false });
    }
  },

  resetPassword: async (token, password) => {
    set({ isLoading: true });
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/reset-password/${token}`,
        { password }
      );
      set({
        redirectPath: "/login" // ✅ after reset → login
      });
      toast.success("Password reset successfully");
    } catch (error) {
      toast.error(getErrorMessage(error));
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  clearRedirect: () => set({ redirectPath: null }) // ✅ helper
}));
