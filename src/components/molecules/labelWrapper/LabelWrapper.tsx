import { Label } from "@components/atoms";
import type { FC, ReactNode } from "react";
import styled from "styled-components";

interface StyleProps {
    disabled?: boolean;
}

const Wrapper = styled.label<StyleProps>`
    display: grid;
    grid-template-columns: 1fr 2fr;
    align-items: center;
    padding: ${(p) => p.theme.size.xs};
    border: ${(p) => p.theme.border.inactive};
    border-radius: ${(p) => p.theme.border.radius};
    transition: ${(p) => p.theme.transition.fast};
    cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
`;

interface TextboxWithLabelProps extends StyleProps {
    required?: boolean;
    label?: string;
    error?: string;
    children?: ReactNode | any;
}

const LabelWrapper: FC<TextboxWithLabelProps> = ({
    children,
    disabled,
    label,
}) => {
    return (
        <Wrapper disabled={disabled}>
            <Label disabled={disabled}>{label}</Label>
            {children}
        </Wrapper>
    );
};

export default LabelWrapper;
