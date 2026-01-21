const StrongPassword = ({
  password,
  className,
}: {
  className?: string;
  password: string;
}) => {
  const isSpecialChars = password.match(/^(?=.*[!@#$%^&*])/);
  const isUppercase = password.match(/^(?=.*[A-Z])/);
  const isNumber = password.match(/^(?=.*[0-9])/);

  const passwordStrength = () => {
    if (password.length >= 8 && isUppercase && isNumber && isSpecialChars) {
      return "Strong Password 💪";
    }
    if (password.length >= 8 && isUppercase && isNumber) {
      return "Normal Password";
    }
    if (password.length >= 8 && isUppercase) {
      return "Weak Password";
    }
    return "Very Weak Password";
  };

  return (
    <div className={`${className} flex w-full items-center gap-3`}>
      <ul className="grid flex-1 grid-cols-4 gap-1">
        <li
          className={`h-1 rounded-full ${password.length >= 8 ? "bg-success-500" : "bg-Line"}`}
        ></li>
        <li
          className={`h-1 rounded-full ${isUppercase ? "bg-success-500" : "bg-Line"}`}
        ></li>
        <li
          className={`h-1 rounded-full ${isNumber ? "bg-success-500" : "bg-Line"}`}
        ></li>
        <li
          className={`h-1 rounded-full ${isSpecialChars ? "bg-success-500" : "bg-Line"}`}
        ></li>
      </ul>

      <h5 className="text-grey-500 text-xs">{passwordStrength()}</h5>
    </div>
  );
};

export default StrongPassword;
