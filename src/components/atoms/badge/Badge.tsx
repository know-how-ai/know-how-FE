import type { FC, ReactNode } from "react";
import styled from "styled-components";

interface Props {
    active?: boolean;
    // disabled?: boolean;
}

const Badge_ = styled.span<Props>`
    color: ${(p) => p.theme.color.textColor};
    border: ${(p) =>
        p.active ? p.theme.border.active : p.theme.border.inactive};
    border-radius: 20rem;
    word-break: keep-all;

    transition: ${(p) => p.theme.transition.fast};
    padding: 1rem;
    font-size: 2rem;
    cursor: pointer;
    display: inline-flex;
    max-width: 15rem; // 조정 필요
    font-size: 1.5rem;
    justify-content: center;
    align-items: center;

    :hover {
        opacity: 0.5;
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
            {children}
        </Badge_>
    );
};

export default Badge;
