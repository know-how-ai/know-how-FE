import { media } from "@components/styles/theme";
import styled from "styled-components";
import type { CommonInputProps } from "../atomTypes";

const TextArea_ = styled.textarea`
    color: ${(p) => p.theme.color.textColor};
    border: none;
    border-bottom: ${(p) => p.theme.border.gray};
    transition: ${(p) => p.theme.transition.fast};
    margin: ${(p) => p.theme.size.xs};
    margin-top: 0.75rem;
    padding: ${(p) => p.theme.size.xs};
    background-color: transparent;
    min-height: 15rem;
    min-width: 30rem;
    ${media.mobile} {
        min-height: 10rem;
        min-width: 50vw;
    }
    font-family: inherit;
    overflow-y: scroll;

    ::placeholder {
        font-style: italic;
    }

    :disabled {
        cursor: not-allowed;
    }

    :hover {
        border-bottom-color: ${(p) => p.theme.color.blue};
    }

    :focus,
    :active {
        outline: none;
        border-bottom-color: ${(p) => p.theme.color.blue};
    }
`;

const Textarea = ({
    placeholder,
    ariaDescription,
    disabled,
    ariaLabel,
    autoComplete,
    autoCorrect,
    className,
    id,
    register,
    required,
    ...rest
}: CommonInputProps) => {
    return (
        <TextArea_
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            autoComplete={autoComplete}
            autoCorrect={autoCorrect}
            id={id}
            className={className}
            aria-label={ariaLabel}
            aria-description={ariaDescription}
            {...register}
            {...rest}
        />
    );
};

Textarea.displayName = "Textarea";

export default Textarea;
