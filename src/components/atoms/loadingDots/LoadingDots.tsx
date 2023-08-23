import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    text-align: center;
    align-items: center;
    margin: 0.4rem 0.6rem;

    span {
        width: 0.5rem;
        height: 0.5rem;
        aspect-ratio: 1;
        border-radius: 100%;
        background-color: ${(p) => p.theme.color.light};
        margin: auto 0.25rem;
        animation: blink 1.5s infinite ease-in-out;
    }

    span:nth-child(2) {
        animation-delay: 0.15s;
    }

    span:last-child {
        animation-delay: 0.3s;
    }

    @keyframes blink {
        0% {
            opacity: 0.7;
            transform: translateY(0px);
        }
        20% {
            opacity: 0.3;
            transform: translateY(-5px);
        }
        50% {
            opacity: 0.5;
            transform: translateY(1px);
        }
        100% {
            opacity: 0.7;
            transform: translateY(0px);
        }
    }
`;

const LoadingDots = () => {
    return (
        <Wrapper>
            <span key={"loadingDot1"} />
            <span key={"loadingDot2"} />
            <span key={"loadingDot3"} />
        </Wrapper>
    );
};

export default LoadingDots;
