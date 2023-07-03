import type { FC, ReactNode } from "react";
import styled from "styled-components";

interface StyleProps {
    disabled?: boolean;
}

const LabelSpan_ = styled.span<StyleProps>`
    display: inline-block;
    font-size: ${(p) => p.theme.size.md};
    color: ${(p) => p.theme.color.textColor};
    margin: auto ${(p) => p.theme.size.sm};
    font-weight: 600;
    cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
`;

interface LabelSpanProps extends StyleProps {
    children?: ReactNode | string | any;
    className?: string;
}

const LabelSpan: FC<LabelSpanProps> = ({ children, className, disabled }) => {
    return (
        <LabelSpan_ className={className} disabled={disabled}>
            {children}
        </LabelSpan_>
    );
};

export default LabelSpan;
