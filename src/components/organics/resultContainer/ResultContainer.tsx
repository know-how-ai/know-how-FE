import { Button } from "@components/atoms";
import { media } from "@components/styles/theme";
import { useRouter } from "next/router";
import { ReactNode, type FC } from "react";
import styled from "styled-components";

const ResultSection = styled.section`
    display: grid;
    width: 100%;
    max-width: 60vw;

    ${media.tablet} {
        max-width: 75vw;
    }

    ${media.mobile} {
        max-width: 90vw;
    }

    margin: 4rem auto;
    padding: 1rem;
    gap: 2rem;
`;

interface ResultContainerProps {
    children?: ReactNode | string | any;
}

const ResultContainer: FC<ResultContainerProps> = ({ children }) => {
    const { back } = useRouter();

    return (
        <>
            <ResultSection>{children}</ResultSection>

            <Button
                type="button"
                data-testid={"again button"}
                onClick={() => back()}
            >
                다시하기
            </Button>

            <Button
                data-testid={"home button"}
                type="button"
                color="transparent"
                onClick={() => {
                    back();
                    back();
                }}
            >
                메인으로
            </Button>
        </>
    );
};

export default ResultContainer;
