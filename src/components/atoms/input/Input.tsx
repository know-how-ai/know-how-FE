import { type ChangeEvent, type HTMLInputTypeAttribute, useState } from "react";
import styled from "styled-components";

interface StyleProps {
    disabled?: boolean;
    isFocused?: boolean;
}

const Container = styled.label<StyleProps>`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0.5rem;
    border: ${(p) =>
        p.isFocused ? p.theme.border.active : p.theme.border.inactive};
    border-radius: ${(p) => p.theme.border.radius};
    transition: ${(p) => p.theme.transition.fast};

    cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};

    :hover:not(:disabled) {
        opacity: ${(p) => (p.disabled ? 1 : 0.7)};
        border: ${(p) =>
            p.disabled ? p.theme.border.inactive : p.theme.border.active};
    }
`;

const Label = styled.span<StyleProps>`
    display: inline-block;
    font-size: 1.5rem;
    color: ${(p) => p.theme.color.textColor};
    margin: auto 1.5rem;
    font-weight: 600;
    cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
`;

const Input_ = styled.input<StyleProps>`
    color: ${(p) => p.theme.color.textColor};
    border: none;
    transition: ${(p) => p.theme.transition.fast};
    margin-top: 0.25rem;
    padding: 1rem 1.5rem;
    background-color: transparent;
    font-size: 1.25rem;

    :disabled {
        cursor: not-allowed;
    }

    ::placeholder {
        font-style: italic;
    }

    :focus {
        outline: none;
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
    label?: string;
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
    label,
}: InputProps) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <Container disabled={disabled} isFocused={isFocused}>
            <Label disabled={disabled}>{label}</Label>
            <Input_
                value={currentValue}
                onChange={onChange}
                type={type}
                disabled={disabled}
                placeholder={placeholder}
                required={required}
                id={id}
                className={className}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </Container>
    );
};

export default Input;
