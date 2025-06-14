const Input = ({
  placeholder,
  value,
  onchange,
}: {
  placeholder: string;
  value: string;
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      type='text'
      className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
      placeholder={placeholder || "Enter text"}
      value={value || ""}
      onChange={onchange}
    />
  );
};

export default Input;
