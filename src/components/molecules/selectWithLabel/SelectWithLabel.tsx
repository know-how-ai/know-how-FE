import { Label, Select } from "@components/atoms";
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

interface SelectWithLabelProps extends StyleProps {
    options: string[];
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    selectedValue: string;
    className?: string;
    label?: string;
}

const SelectWithLabel: FC<SelectWithLabelProps> = ({
    options,
    onChange,
    selectedValue,
    disabled,
    label,
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
            <Label disabled={disabled}>{label}</Label>
            <Select
                options={options}
                disabled={disabled}
                selectedValue={selectedValue}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
            />
        </Container_>
    );
};

export default SelectWithLabel;
