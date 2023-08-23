import { forwardRef, type HTMLInputTypeAttribute } from "react";
import styled from "styled-components";
import type { CommonInputProps } from "../atomTypes";

const Input_ = styled.input`
    color: ${(p) => p.theme.color.gray};
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

    :hover:not(:disabled),
    :focus:not(:disabled),
    :active:not(:disabled) {
        outline: none;
        border-bottom-color: ${(p) => p.theme.color.blue};
    }

    :disabled {
        font-style: italic;
        color: ${(p) => p.theme.color.gray};
        cursor: not-allowed;
        border-bottom-color: transparent;
    }

    /* ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button {
        appearance: none;
        margin: 0;
    } */
`;

interface InputProps extends CommonInputProps {
    type: HTMLInputTypeAttribute;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
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
        },
        ref
    ) => {
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
                ref={ref}
                {...register}
                {...rest}
            />
        );
    }
);

export default Input;
