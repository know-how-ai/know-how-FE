import type { MouseEventHandler, ReactNode } from "react";

export interface ButtonProps {
    type?: "button" | "submit" | "reset";
    children?: ReactNode | string | any;
    onClick?: MouseEventHandler<HTMLButtonElement> | (() => void);
    className?: string;
    ariaLabel?: string;
    tabIndex?: number;
    disabled?: boolean;
    loading?: boolean;
}
