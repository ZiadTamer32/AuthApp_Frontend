/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";
function AppLayout() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md overflow-hidden bg-gray-800 bg-opacity-50 shadow-xl backdrop-filter backdrop-blur-xl rounded-2xl"
    >
      <Outlet />
    </motion.div>
  );
}

export default AppLayout;
