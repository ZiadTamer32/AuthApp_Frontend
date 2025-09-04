function Input({ icon: Icon, ...props }) {
  return (
    <div className="relative">
      <Icon className="absolute text-green-500 transform -translate-y-1/2 top-1/2 left-3 size-5" />
      <input
        {...props}
        className="w-full py-2 pl-10 pr-3 text-white placeholder-gray-400 transition duration-200 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg focus:border-green-500 focus:outline-none"
      />
    </div>
  );
}

export default Input;
