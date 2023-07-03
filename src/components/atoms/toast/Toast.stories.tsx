import type { Meta, StoryObj } from "@storybook/react";
import Toast from "./Toast";

const meta = {
    component: Toast,
    // tags: ["autodocs"],
} satisfies Meta<typeof Toast>;

export default meta;

type ToastStory = StoryObj<typeof Toast>;

export const Base: ToastStory = {
    args: {
        children: "Congratulations! 🥳",
        duration: 3000,
        isShow: true,
    },
};
