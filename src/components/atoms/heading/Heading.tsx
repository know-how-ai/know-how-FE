import { type ReactNode, forwardRef } from "react";
import styled from "styled-components";

interface HeadingStyleProps {
    fontSize?: number;
}

const Heading3 = styled.h3<HeadingStyleProps>`
    font-weight: 600;
    margin: 2.5rem auto;
    text-align: center;
    font-size: ${(p) => (p.fontSize || 2.5) + "rem"};
    line-height: ${(p) => (p.fontSize || 3) + 0.5 + "rem"};
    word-break: keep-all;
    white-space: nowrap;
`;

interface HeadingProps extends HeadingStyleProps {
    children?: string | ReactNode | any;
    [key: string]: any;
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
    ({ children, fontSize, ...rest }, ref) => {
        return (
            <Heading3 ref={ref} fontSize={fontSize} {...rest}>
                {children}
            </Heading3>
        );
    }
);

export default Heading;
