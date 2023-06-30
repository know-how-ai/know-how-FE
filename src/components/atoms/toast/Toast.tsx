import {
    fadeIn,
    fadeOut,
    sinkDown,
    uprise,
} from "@components/styles/keyframes";
import { useEffect, type FC, type ReactNode } from "react";
import styled from "styled-components";

interface StyleProps {
    duration: number;
}

const ToastContainer = styled.div<StyleProps>`
    animation: ${fadeIn} 0.5s ease-in-out, ${uprise} 0.5s ease-in-out,
        ${sinkDown} 0.5s ${(p) => p.duration - 0.4}s ease-in-out forwards,
        ${fadeOut} 0.5s ${(p) => p.duration - 0.4}s ease-in-out forwards;
    box-shadow: ${(p) => p.theme.boxShadow.strong};
    position: absolute;
    bottom: 4rem;
    right: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 21;
    color: ${(p) => p.theme.color.textColor};
    background-color: ${(p) => p.theme.color.backgroundColor};
    border-radius: ${(p) => p.theme.border.radius};
    padding: 1.5rem 2rem;
    margin: 1.5rem 1rem;
    width: 100%;
    max-width: 20rem;
    font-size: 1.5rem;
`;

// const ToastContent = styled.div`
//     /*  */
// `

interface ToastProps {
    children?: ReactNode | string | any;
    duration?: number;
    isShow?: boolean;
    handleClose: () => void;
}

const Toast: FC<ToastProps> = ({
    children,
    duration = 3900,
    handleClose,
    isShow,
}) => {
    if (!isShow) return null;

    useEffect(() => {
        const timer = setTimeout(handleClose, duration);

        return () => {
            clearTimeout(timer);
        };
    }, [handleClose, duration]);

    return (
        <ToastContainer data-testid="toast" duration={duration * 0.001}>
            {children}
        </ToastContainer>
    );
};

export default Toast;
