import type { Meta, StoryObj } from "@storybook/react";
import Form from "./Form";

const meta = {
    component: Form,
    tags: ["autodocs"],
} satisfies Meta<typeof Form>;

export default meta;

type FormStory = StoryObj<typeof Form>;

export const Base: FormStory = {
    args: {
        onSubmit: () => {
            console.log("clicked!");
        },
    },
};
