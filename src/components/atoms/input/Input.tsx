import { type HTMLInputTypeAttribute } from "react";
import { type UseFormRegisterReturn } from "react-hook-form";
import styled from "styled-components";

interface StyleProps {
    disabled?: boolean;
}

const Input_ = styled.input<StyleProps>`
    color: ${(p) => p.theme.color.textColor};
    border: none;
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
        border-bottom-color: ${(p) => p.theme.color.blue};
    }

    :focus,
    :active {
        outline: none;
        border-bottom-color: ${(p) => p.theme.color.blue};
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
    id?: string;
    className?: string;
    register?: UseFormRegisterReturn;
    ariaLabel?: string;
    ariaDescription?: string;
    autoComplete?: "on" | "off";
    autoCorrect?: "on" | "off";
}

const Input = ({
    type,
    id,
    disabled,
    placeholder,
    required,
    className,
    register,
    ariaDescription,
    autoComplete,
    autoCorrect,
    ariaLabel,
    ...rest
}: InputProps) => {
    return (
        <Input_
            type={type}
            disabled={disabled}
            placeholder={placeholder}
            required={required}
            autoComplete={autoComplete}
            autoCorrect={autoCorrect}
            id={id}
            className={className}
            aria-label={ariaLabel}
            aria-description={ariaDescription}
            {...register}
            {...rest}
        />
    );
};

export default Input;
