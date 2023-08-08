import type { MouseEventHandler, ReactNode } from "react";

export interface ButtonProps {
    type?: "button" | "submit" | "reset";
    children?: ReactNode | string | any;
    onClick?: MouseEventHandler<HTMLButtonElement> | function;
    onKeyDown?: function;
    className?: string;
    ariaLabel?: string;
    tabIndex?: number;
    disabled?: boolean;
    loading?: boolean;
    color?: "blue" | "transparent";
    shape?: "rect" | "square";
    size?: "initial" | "infinite";
}
