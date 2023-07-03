import type { FC, ReactNode } from "react";
import styled from "styled-components";

interface Props {
    active?: boolean;
    // disabled?: boolean;
}

const Badge_ = styled.span<Props>`
    color: ${(p) => p.theme.color.textColor};
    text-decoration: ${(p) => (p.active ? "underline 0.125rem" : "none")};

    border: ${(p) =>
        p.active ? p.theme.border.active : p.theme.border.inactive};
    border-radius: 20rem;

    transition: ${(p) => p.theme.transition.fast};
    padding: 1rem;
    font-size: 2rem;
    cursor: pointer;
    display: flex; // inline-block
    max-width: 15rem; // 조정 필요
    font-size: 1.5rem;
    justify-content: center;
    align-items: center;

    :hover {
        opacity: 0.7;
        border: ${(p) => p.theme.border.active};
    }
`;

interface BadgeProps extends Props {
    children?: ReactNode | string | any;
    onClick?: () => void;
    className?: string;
}

const Badge: FC<BadgeProps> = ({
    children,
    onClick,
    active = false,
    className,
    // disabled = false,
}) => {
    return (
        <Badge_ onClick={onClick} active={active} className={className}>
            # {children}
        </Badge_>
    );
};

export default Badge;
