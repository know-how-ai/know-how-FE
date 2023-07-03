import type { StorybookConfig } from "@storybook/nextjs";

const path = require("path");

const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "@storybook/addon-a11y",
        {
            name: "@storybook/addon-styling",
            options: {},
        },
    ],
    framework: {
        name: "@storybook/nextjs",
        options: {},
    },
    docs: {
        autodocs: "tag",
    },

    webpackFinal: async (config) => {
        //@ts-ignore
        config.resolve.modules = [
            path.resolve(__dirname, ".."),
            "node_modules",
            "styles",
        ];
        //@ts-ignore
        config.resolve.alias = {
            //@ts-ignore
            ...config.resolve.alias,
            "@components": path.resolve(__dirname, "../src/components"),
            "@libs": path.resolve(__dirname, "../src/libs"),
            "@contexts": path.resolve(__dirname, "../src/contexts"),
        };

        return config;
    },
};
export default config;
