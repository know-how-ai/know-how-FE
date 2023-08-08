import { Button } from "@components/atoms";
import type { ReactNode, FC } from "react";
import styled from "styled-components";

const FloatingButton_ = styled(Button)`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1;
    bottom: 2rem;
    right: 2rem;
    border-radius: 45%;
    z-index: 1;
    box-shadow: ${(p) => p.theme.boxShadow.normal};
    // max-width:
    :hover {
        box-shadow: ${(p) => p.theme.boxShadow.strong};
    }
`;

interface FloatingButtonProps {
    children?: ReactNode | string | any;
    onClick?: Function;
    ariaLabel?: string;
}

const FloatingButton: FC<FloatingButtonProps> = ({
    children,
    onClick,
    ariaLabel,
}) => {
    return (
        <FloatingButton_ ariaLabel={ariaLabel} onClick={onClick}>
            {children}
        </FloatingButton_>
    );
};

export default FloatingButton;
