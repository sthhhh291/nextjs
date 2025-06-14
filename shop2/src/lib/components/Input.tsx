const Input = ({
  placeholder,
  value,
}: {
  placeholder: string;
  value: string;
}) => {
  return (
    <input
      type='text'
      className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
      placeholder={placeholder || "Enter text"}
      value={value || ""}
    />
  );
};

export default Input;
