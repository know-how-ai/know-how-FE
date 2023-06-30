import type { ChangeEvent, HTMLInputTypeAttribute } from "react";
import styled from "styled-components";

interface StyleProps {
    disabled?: boolean;
}

const Input_ = styled.input<StyleProps>`
    color: black;
    background-color: white;
    border: ${(p) => p.theme.border.nonActive};
    border-radius: ${(p) => p.theme.border.radius};
    transition: ${(p) => p.theme.transition.fast};
    padding: 1rem;

    /* NEED TO: Disabled style */

    :hover {
        opacity: 0.7;
    }

    :focus {
        border: ${(p) => p.theme.border.active};
    }

    /* ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button {
        appearance: none;
        margin: 0;
    } */
`;

interface InputProps extends StyleProps {
    type: HTMLInputTypeAttribute;
    required?: boolean;
    placeholder?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    currentValue?: string;
    id?: string;
    className?: string;
}

const Input = ({
    type,
    id,
    disabled,
    placeholder,
    required,
    onChange,
    currentValue,
    className,
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
            className={className}
            {...rest}
        />
    );
};

export default Input;
