import { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
    color: {
        purple: "#8661de",
        blue: "#00bac7",
        gray: "#f6f6f6",
        green: "#07b495",
        lightGreen: "#99ecdd",
        midGreen: "#00a07f",
        darkGray: "#54595d",
        backgroundColor: "#f3f3f3",
        textColor: "#202020",
        transparent: "transparent",
        red: "#df4558",
    },
    boxShadow: {
        normal: "0 3px 8px 0 rgb(0 0 0 / 15%)",
        strong: "0 3px 24px 0 rgb(0 0 0 / 30%)",
        purple: "0 3px 8px 0 #d6c9ff",
        blue: "0 3px 8px 0 #b3e2e6",
    },
    filter: {
        blur: "blur(70%);",
    },
    transition: {
        fast: "all 0.3s ease-in-out;",
    },
    border: {
        active: "2px solid #99ecdd;",
        nonActive: "2px solid transparent;",
        radius: "1rem",
    },
};

export const darkTheme: DefaultTheme = {
    color: {
        purple: "#8661de",
        blue: "#00bac7",
        gray: "#f6f6f6",
        green: "#07b495",
        lightGreen: "#99ecdd",
        midGreen: "#00a07f",
        darkGray: "#54595d",
        backgroundColor: "#232323",
        textColor: "#fefefe",
        transparent: "transparent",
        red: "#df4558",
    },
    boxShadow: {
        normal: "0 3px 8px 0 rgb(0 0 0 / 15%)",
        strong: "0 3px 24px 0 rgb(0 0 0 / 30%)",
        purple: "0 3px 8px 0 #d6c9ff",
        blue: "0 3px 8px 0 #b3e2e6",
    },
    filter: {
        blur: "blur(70%);",
    },
    transition: {
        fast: "all 0.3s ease-in-out;",
    },
    border: {
        active: "2px solid #99ecdd;",
        nonActive: "2px solid transparent;",
        radius: "1rem",
    },
};

const customMediaQuery = (maxWidth: number): string =>
    `@media (max-width: ${maxWidth}px)`;

export const media = {
    custom: customMediaQuery,
    pc: customMediaQuery(1440),
    tablet: customMediaQuery(768),
    mobile: customMediaQuery(576),
};
