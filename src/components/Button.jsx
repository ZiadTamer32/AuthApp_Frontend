import { Loader } from "lucide-react";
const Button = ({ isLoading, name, ...props }) => {
  return (
    <button
      {...props}
      disabled={isLoading}
      className="disabled:cursor-not-allowed disabled:opacity-50 w-full py-2 text-white transition-colors duration-200 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
    >
      {isLoading ? <Loader className="mx-auto animate-spin" /> : name}
    </button>
  );
};

export default Button;
