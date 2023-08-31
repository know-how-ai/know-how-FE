import { type Variants, motion } from "framer-motion";
import type { FC, ReactNode } from "react";
import styled from "styled-components";
import Anchor from "../anchor/Anchor";

const LogoContainer_ = styled.div`
    margin: auto ${(p) => p.theme.size.xl};
    user-select: none;
`;

const Logo_ = styled(motion.h3)`
    font-weight: 400;
    font-size: 1.5rem;
    text-align: center;
    letter-spacing: 0.5rem;
    color: ${(p) => p.theme.color.textColor};
`;

const variants: Variants = {
    initial: {
        letterSpacing: "0.5rem",
        fontSize: "1.5rem",
        fontWeight: "400",
        textAlign: "center",
    },
    action: {
        transition: { type: "spring", duration: 0.5 },
        letterSpacing: "0.1rem",
        fontWeight: "600",
        fontSize: "2rem",
        textAlign: "right",
    },
};

interface LogoProps {
    href: string;
    children: string | ReactNode | any;
}

const Logo: FC<LogoProps> = ({ children, href }) => {
    return (
        <LogoContainer_ data-testid={"logo"}>
            <Anchor href={href}>
                <Logo_
                    variants={variants}
                    initial={"initial"}
                    whileHover={"action"}
                    // whileTap={"action"}
                >
                    {children}
                </Logo_>
            </Anchor>
        </LogoContainer_>
    );
};

export default Logo;
