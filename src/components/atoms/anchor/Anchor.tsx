import type { LinkProps } from "next/link";
import Link from "next/link";
import type { FC, ReactNode } from "react";
import styled from "styled-components";

// Link > a : ui DOMnesting error
const Anchor_ = styled.div`
    /*  */
`;

interface AnchorProps extends LinkProps {
    children?: ReactNode | string | any;
    tabIndex?: number;
    onKeyDown?: (e: any) => void;
    className?: string;
    onClick?: (e?: any) => void;
}

const Anchor: FC<AnchorProps> = ({
    href,
    tabIndex,
    children,
    onKeyDown,
    className,
    onClick,
}) => {
    return (
        <Link href={href}>
            <Anchor_
                onKeyDown={onKeyDown}
                tabIndex={tabIndex}
                className={className}
                onClick={onClick}
            >
                {children}
            </Anchor_>
        </Link>
    );
};

const ex = styled(Anchor)``;

export default Anchor;
