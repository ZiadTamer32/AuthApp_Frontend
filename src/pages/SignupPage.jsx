/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Mail, User, Lock, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import PasswordStrength from "../components/PasswordStrength";
import { useAuthStore } from "../store/authStore";
function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, redirectPath, clearRedirect } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (redirectPath) {
      navigate(redirectPath);
      clearRedirect();
    }
  }, [navigate, redirectPath, clearRedirect]);
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(username, email, password);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md overflow-hidden bg-gray-800 bg-opacity-50 rounded-lg shadow-xl backdrop-blur-xl backdrop-filter"
    >
      <div className="px-6 py-4">
        <h2 className="mb-4 text-3xl font-bold text-center text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text">
          Create Account
        </h2>
        <form className="space-y-4" onSubmit={handleSignup}>
          <Input
            name="name"
            icon={User}
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            name="email"
            icon={Mail}
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            name="password"
            icon={Lock}
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordStrength password={password} />
          <button className="w-full py-2 text-white transition-colors duration-200 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900">
            {isLoading ? (
              <Loader className="mx-auto animate-spin" />
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
      <div className="w-full p-3 text-center text-gray-400 bg-gray-900">
        Already have an account?{" "}
        <Link to="/login" className="text-green-500 hover:underline">
          Login
        </Link>
      </div>
    </motion.div>
  );
}

export default SignupPage;
