import type { ChangeEvent, HTMLInputTypeAttribute } from "react";
import styled from "styled-components";

const Input_ = styled.input`
    color: black;
    background-color: white;
    border: ${(p) => p.theme.border.nonActive};
    border-radius: 1rem;
    transition: ${(p) => p.theme.transition.fast};
    padding: 1rem;

    :disabled,
    :hover {
        opacity: 0.7;
    }

    :focus {
        border: ${(p) => p.theme.border.active};
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
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    currentValue?: string;
    id?: string;
}

const Input = ({
    type,
    id,
    disabled,
    placeholder,
    required,
    onChange,
    currentValue,
    ...rest
}: InputProps) => {
    return (
        <Input_
            value={currentValue}
            onChange={onChange}
            type={type}
            disabled={disabled}
            placeholder={placeholder}
            required={required}
            id={id}
            {...rest}
        />
    );
};

export default Input;
