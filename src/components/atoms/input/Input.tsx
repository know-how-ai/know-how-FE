import { type ChangeEvent, type HTMLInputTypeAttribute } from "react";
import styled from "styled-components";

interface StyleProps {
    disabled?: boolean;
    isFocused?: boolean;
}

const Input_ = styled.input<StyleProps>`
    color: ${(p) => p.theme.color.textColor};
    border: none;
    border-top: ${(p) => p.theme.border.inactive};
    border-bottom: ${(p) => p.theme.border.gray};
    transition: ${(p) => p.theme.transition.fast};
    margin: ${(p) => p.theme.size.xs};
    margin-top: 0.75rem;
    padding: ${(p) => p.theme.size.xs};
    background-color: transparent;

    ::placeholder {
        font-style: italic;
    }

    :disabled {
        cursor: not-allowed;
    }

    :hover {
        border-bottom: ${(p) => p.theme.border.inactive};
    }

    :focus {
        outline: none;
        border-bottom: ${(p) => p.theme.border.inactive};
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
    onFocus?: () => void;
    onBlur?: () => void;
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
    onBlur,
    onFocus,
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
            onFocus={onFocus}
            onBlur={onBlur}
            {...rest}
        />
    );
};

export default Input;
