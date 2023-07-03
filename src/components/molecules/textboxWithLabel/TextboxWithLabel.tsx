import { Input, LabelSpan } from "@components/atoms";
import { type FC, type ChangeEvent, useState, useCallback } from "react";
import styled from "styled-components";

interface StyleProps {
    disabled?: boolean;
    isFocused?: boolean;
}

const Container_ = styled.label<StyleProps>`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: ${(p) => p.theme.size.xs};
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

interface TextboxWithLabelProps extends StyleProps {
    required?: boolean;
    placeholder?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    currentValue?: string;
    label?: string;
}

const TextboxWithLabel: FC<TextboxWithLabelProps> = ({
    onChange,
    currentValue,
    disabled,
    label,
    required,
    placeholder,
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const onFocus = useCallback(() => {
        setIsFocused(true);
    }, []);
    const onBlur = useCallback(() => {
        setIsFocused(false);
    }, []);

    return (
        <Container_ disabled={disabled} isFocused={isFocused}>
            <LabelSpan disabled={disabled}>{label}</LabelSpan>
            <Input
                placeholder={placeholder}
                isFocused={isFocused}
                disabled={disabled}
                type="text"
                required={required}
                currentValue={currentValue}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={onChange}
            />
        </Container_>
    );
};

export default TextboxWithLabel;
