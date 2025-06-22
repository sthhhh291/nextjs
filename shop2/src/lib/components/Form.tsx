import React, { FormHTMLAttributes, ReactNode } from 'react';
import Button from './Button';
import Input from './Input';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
    children: ReactNode;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    className?: string;
}

const Form: React.FC<FormProps> = ({ children, onSubmit, className = '', ...rest }) => {
    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                onSubmit(e);
            }}
            className={className}
            {...rest}
        >
            {/* Example usage of Input and Button components */}
            <Input name="example" placeholder="Type here..." />
            {children}
            <Button type="submit">Submit</Button>
        </form>
    );
};

export default Form;