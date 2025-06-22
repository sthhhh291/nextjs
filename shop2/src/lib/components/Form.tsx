import Input from "./Input";
import Button from "./Button";

interface formProps {
  inputs: inputProps[];
  button: buttonProps;
}

interface inputProps {
  placeholder: string;
  value: string;
}

interface buttonProps {
  buttonName: string;
}

export default function Form({ inputs, button }: formProps) {
  return (
    <form action=''>
      {inputs.map((input, idx) => (
        <Input
          key={idx}
          placeholder={input.placeholder}
          value={input.placeholder}
        />
      ))}
      <Button>{button.buttonName}</Button>
    </form>
  );
}
