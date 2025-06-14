import { JSX } from "react";

type ButtonProps = JSX.IntrinsicElements["button"] & {
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <button
      className='bg-blue-500 text-white font-bold py-2 px-4 rounded'
      {...rest}>
      {children}
    </button>
  );
};

export default Button;
