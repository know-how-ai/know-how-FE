import type { FC, LabelHTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

const Label_ = styled.label`
    /* background-color: ${(p) => p.theme.color.backgroundColor}; */
    color: ${(p) => p.theme.color.textColor};
    font-size: 1.5rem;
    line-height: 3rem;
    padding: 0.5rem;
    /* position: absolute; */
`;

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
    children?: ReactNode | string | any;
}

const Label: FC<Props> = ({ children, ...rest }) => {
    return <Label_ {...rest}>{children}</Label_>;
};

export default Label;
