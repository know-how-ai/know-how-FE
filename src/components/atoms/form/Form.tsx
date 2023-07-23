import type { FC, ReactNode } from "react";
import styled from "styled-components";

const Form_ = styled.form`
    /* width: 100%; */
    display: grid;
    gap: 1rem;
    // 반응형 - 미디어 쿼리 추가 필요?
`;

interface FormProps {
    children?: ReactNode | any;
    className?: string;
    ariaDescription?: string;
    onSubmit?: (e?: any) => void;
}

const Form: FC<FormProps> = ({
    children,
    className,
    ariaDescription,
    onSubmit,
    ...rest
}) => {
    return (
        <Form_
            data-testid="form"
            aria-description={ariaDescription}
            className={className}
            onSubmit={onSubmit}
            {...rest}
        >
            {children}
        </Form_>
    );
};

export default Form;
