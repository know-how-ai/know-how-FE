import type { FC, LabelHTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

const Label_ = styled.label`
    /* background-color: ${(p) => p.theme.color.backgroundColor}; */
    color: ${(p) => p.theme.color.textColor};
    font-size: 1.25rem;
    line-height: 1.75rem;
    padding: 1rem;
    display: inline-block;
    /* position: absolute; */
`;

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
    children?: ReactNode | string | any;
    className?: string;
}

const Label: FC<Props> = ({ children, className, ...rest }) => {
    return (
        <Label_ className={className} {...rest}>
            {children}
        </Label_>
    );
};

export default Label;
