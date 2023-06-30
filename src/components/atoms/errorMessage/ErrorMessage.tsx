import styled from "styled-components";

const ErrorMessage_ = styled.span`
    display: inline-block;
    padding: 0.25rem;
    color: ${(p) => p.theme.color.red};
    transition: ${(p) => p.theme.transition.fast};
    animation: fadeIn 0.3s 2 ease-out;
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

interface Props {
    children?: string;
}

const ErrorMessage = ({ children }: Props) => {
    return <ErrorMessage_>{children}</ErrorMessage_>;
};

export default ErrorMessage;
