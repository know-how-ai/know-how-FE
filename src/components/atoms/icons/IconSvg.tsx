import styled from "styled-components";
import type { IconProps } from "./iconTypes";
import { fadeIn } from "@components/styles/keyframes";

export const Svg = styled.svg<IconProps>`
    min-height: 2.5rem;
    width: 100%;
    aspect-ratio: 1;
    stroke-width: ${(p) => (p.strokeWidth ? p.strokeWidth : 1.5)};
    scale: 0.75;
    stroke: ${(p) => (p.strokeColor ? p.strokeColor : p.theme.color.textColor)};
    opacity: 0;
    transition: ${(p) => p.theme.transition.fast};
    animation: ${fadeIn} 0.5s forwards ease-in-out;
`;
