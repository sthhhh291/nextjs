import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className="bg-blue-500 text-white font-bold py-2 px-4 rounded cursor-pointer hover:bg-blue-800"
    >
      {children}
    </button>
  );
};

export default Button;
