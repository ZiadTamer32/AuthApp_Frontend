/* eslint-disable no-unused-vars */
import { Loader } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { motion } from "framer-motion";
import Button from "../components/Button";

function DashboardPage() {
  const { user, isLoading, logout } = useAuthStore();
  const handleLogout = () => {
    logout();
  };
  return (
    <div className="p-4 sm:p-6">
      <h2 className="mb-6 text-3xl font-bold text-center text-transparent bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text">
        Dashboard
      </h2>

      <div className="space-y-6">
        <motion.div
          className="p-4 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="mb-3 text-xl font-semibold text-green-400">
            Profile Information
          </h3>
          <p className="text-gray-300">Name: {user?.name}</p>
          <p className="text-gray-300">Email: {user?.email}</p>
          <p className="text-gray-300">
            Last Login:{" "}
            {user?.last_login
              ? new Date(user.last_login).toLocaleString(undefined, {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })
              : "Never"}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-4"
      >
        <Button onClick={handleLogout} isLoading={isLoading} name={"Logout"} />
      </motion.div>
    </div>
  );
}

export default DashboardPage;
