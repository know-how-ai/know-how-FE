import type { LinkProps } from "next/link";
import Link from "next/link";
import { type FC, type ReactNode } from "react";
import styled from "styled-components";

// Link > a : ui DOMnesting error
const Link_ = styled(Link)`
    color: ${(p) => p.theme.color.light};
    text-decoration: none;

    :visited {
        color: ${(p) => p.theme.color.lightBlue};
    }
`;

interface AnchorProps extends LinkProps {
    children?: ReactNode | string | any;
    className?: string;
}

const Anchor: FC<AnchorProps> = ({ href, children, className }) => {
    return (
        <Link_ href={href} className={className}>
            {children}
        </Link_>
    );
};

const ex = styled(Anchor)``;

export default Anchor;
