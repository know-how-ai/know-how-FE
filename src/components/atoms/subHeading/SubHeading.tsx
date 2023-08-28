import type { FC, ReactNode } from "react";
import styled from "styled-components";

const SubHeading_ = styled.h5`
    font-weight: 600;
    font-size: 2rem;
    margin: 1rem initial;
`;

interface SubHeadingProps {
    children?: ReactNode | any;
}

const SubHeading: FC<SubHeadingProps> = ({ children }) => {
    return <SubHeading_>{children}</SubHeading_>;
};

export default SubHeading;
