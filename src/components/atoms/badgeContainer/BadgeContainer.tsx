import type { ReactNode } from "react";
import styled from "styled-components";

const BadgeContainer_ = styled.section`
    margin: auto;
    padding: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    width: 100%;
    max-width: 50vw;
`;

interface BadgeContainerProps {
    children?: ReactNode | any;
}

const BadgeContainer = ({ children }: BadgeContainerProps) => {
    return <BadgeContainer_>{children}</BadgeContainer_>;
};
export default BadgeContainer;
