import type { HTMLInputTypeAttribute } from "react";
import styled from "styled-components";

const Input_ = styled.input`
    color: black;
    background-color: white;
    border: 2px solid transparent;
    border-radius: 1rem;
    transition: ${(p) => p.theme.transition.fast};
    padding: 1rem;

    :disabled,
    :hover {
        opacity: 0.7;
    }

    :focus {
        border: 2px solid ${(p) => p.theme.color.lightGreen};
        /* background-color: transparent; */
    }

    /* ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button {
        appearance: none;
        margin: 0;
    } */
`;

interface InputProps {
    type: HTMLInputTypeAttribute;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
}

const Input = ({
    type,
    disabled,
    placeholder,
    required,
    ...rest
}: InputProps) => {
    return (
        <Input_
            type={type}
            disabled={disabled}
            placeholder={placeholder}
            required={required}
            {...rest}
        />
    );
};

export default Input;
