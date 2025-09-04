/* eslint-disable no-unused-vars */
import { useRef } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

function VerficationEmailPage() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { verifyEmail, isLoading, redirectPath, clearRedirect } =
    useAuthStore();

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
    const newCode = [...code];
    for (let i = 0; i < 6; i++) {
      newCode[i] = pastedData[i] || "";
    }
    setCode(newCode);
    const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
    const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && !code[index]) {
      inputRefs.current[index - 1].focus();
    }
  };

  useEffect(() => {
    if (redirectPath) {
      navigate(redirectPath);
      clearRedirect();
    }
  }, [navigate, redirectPath, clearRedirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      await verifyEmail(verificationCode);
    } catch (error) {
      console.log(error);
    }
  };

  // Auto submit when all fields are filled
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md p-6 overflow-hidden bg-gray-800 bg-opacity-50 rounded-lg shadow-xl backdrop-blur-xl backdrop-filter"
    >
      <h2 className="mb-4 text-3xl font-bold text-center text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text">
        Verify Your Email
      </h2>
      <p className="text-sm text-center text-gray-200">
        Enter 6 digit code sent to your email
      </p>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between my-4">
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              className="w-12 h-12 text-center text-white bg-gray-800 border border-gray-700 rounded-lg focus:border-green-500 focus:outline-none"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              ref={(el) => (inputRefs.current[index] = el)}
              aria-label={`Digit ${index + 1}`}
            />
          ))}
        </div>
        <button
          disabled={code.some((digit) => digit === "") || isLoading}
          className="w-full py-2 text-white transition-colors duration-200 rounded-lg disabled:opacity-50 disabled:cusrsor-not-allowed bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader className="mx-auto animate-spin" />
          ) : (
            "Verify Email"
          )}
        </button>
      </form>
    </motion.div>
  );
}

export default VerficationEmailPage;
