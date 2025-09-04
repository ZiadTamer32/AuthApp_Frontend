import { Check, X } from "lucide-react";

function PasswordCriteria({ password }) {
  const criteria = [
    { label: "At least 6 characters", met: password.length >= 6 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { label: "Contains a number", met: /\d/.test(password) },
    { label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) }
  ];
  return (
    <div>
      {criteria.map((item) => (
        <div
          key={item.label}
          className={`flex items-center text-xs ${
            item.met ? "text-green-500" : "text-gray-400"
          }`}
        >
          {item.met ? (
            <Check className="mr-2 text-green-500 size-4" />
          ) : (
            <X className="mr-2 text-gray-500 size-4" />
          )}
          {item.label}
        </div>
      ))}
    </div>
  );
}

function PasswordStrength({ password }) {
  let strength = 0;
  if (password.length >= 6) strength++;
  if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
  if (password.match(/\d/)) strength++;
  if (password.match(/[^a-zA-Z\d]/)) strength++;

  function getStrengthText(strength) {
    if (strength === 0) return "Very Weak";
    if (strength === 1) return "Weak";
    if (strength === 2) return "Fair";
    if (strength === 3) return "Good";
    return "Strong";
  }
  function getStrengthBar(strength) {
    if (strength === 0) return "bg-red-500";
    if (strength === 1) return "bg-red-400";
    if (strength === 2) return "bg-yellow-500";
    if (strength === 3) return "bg-yellow-400";
    return "bg-green-500";
  }

  return (
    <div className="">
      <div className="flex items-center justify-between text-xs text-gray-400">
        <p>Password Strength</p>
        <p>{getStrengthText(strength)}</p>
      </div>
      <div className="flex mt-2 space-x-1">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`w-full h-1 rounded-full ${
              index < strength ? getStrengthBar(strength) : "bg-gray-600"
            }`}
          />
        ))}
      </div>
      <div className="mt-2">
        <PasswordCriteria password={password} />
      </div>
    </div>
  );
}

export default PasswordStrength;
