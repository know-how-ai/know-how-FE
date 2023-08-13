import type { FC, ReactNode } from "react";
import styled from "styled-components";

interface FormStyleProps {
    display: "grid" | "flex";
    gap?: number;
    flexDirection?: "row" | "column";
    justifyContent?: "center" | "start" | "end" | string;
    alignItems?: "center" | "start" | "end" | string;
}

const Form_ = styled.form<FormStyleProps>`
    /* width: 100%; */
    display: ${(p) => p.display};
    gap: ${(p) => p.gap + "rem" || "initial"};
    flex-direction: ${(p) =>
        p.display === "grid" ? "initial" : p.flexDirection || "row"};
    justify-content: ${(p) => p.justifyContent || "initial"};
    align-items: ${(p) => p.alignItems || "initial"};
`;

interface FormProps extends FormStyleProps {
    children?: ReactNode | any;
    className?: string;
    ariaLabel?: string;
    ariaDescription?: string;
    onSubmit?: (e?: any) => void;
}

const Form: FC<FormProps> = ({
    children,
    className,
    ariaLabel,
    ariaDescription,
    onSubmit,
    display,
    flexDirection,
    alignItems,
    justifyContent,
    gap,
    ...rest
}) => {
    return (
        <Form_
            display={display}
            flexDirection={flexDirection}
            gap={gap}
            alignItems={alignItems}
            justifyContent={justifyContent}
            data-testid="form"
            aria-label={ariaLabel}
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
