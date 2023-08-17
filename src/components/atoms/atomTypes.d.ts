import type { MouseEventHandler, ReactNode } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

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
    boxShadow?: boolean;
}

export interface CommonInputProps {
    required?: boolean;
    placeholder?: string;
    id?: string;
    className?: string;
    register?: UseFormRegisterReturn;
    ariaLabel?: string;
    ariaDescription?: string;
    autoComplete?: "on" | "off";
    autoCorrect?: "on" | "off";
    [key: string]: any;
}
