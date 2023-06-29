import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        color: {
            purple: string;
            blue: string;
            gray: string;
            green: string;
            lightGreen: "#99ecdd";
            darkGray: string;
            backgroundColor: string;
            textColor: string;
        };
        boxShadow: {
            normal: "0 3px 8px 0 rgb(0 0 0 / 10%)";
            purple: "0 3px 8px 0 #d6c9ff";
            blue: "0 3px 8px 0 #b3e2e6";
        };
        filter: {
            blur: "blur(70%);";
        };
        transition: {
            fast: "all 0.3s ease-in-out;";
        };
        border: {
            active: "2px solid #99ecdd;";
            nonActive: "2px solid transparent;";
        };
    }
}
