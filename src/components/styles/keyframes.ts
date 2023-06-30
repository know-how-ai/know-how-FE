import { keyframes } from "styled-components";

export const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

export const fadeOut = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`;

export const uprise = keyframes`
    from {
    transform: translateY(2rem);
    }
    to {
        transform: translateY(0rem);
    }
`;

export const sinkDown = keyframes`
    from {
        transform: translateY(0rem);
    }
    to {
        transform: translateY(2rem);
    }
`;
