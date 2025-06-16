import { JSX } from "react";

type InputProps = JSX.IntrinsicElements["input"];

const Input: React.FC<InputProps> = ({ ...rest }) => {
  return (
    <input
      type="text"
      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...rest}
    />
  );
};

export default Input;
