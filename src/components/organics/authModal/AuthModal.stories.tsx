import type { Meta, StoryObj } from "@storybook/react";
import AuthModal from "./AuthModal";

const meta = {
    component: AuthModal,
    tags: ["autodocs"],
} satisfies Meta<typeof AuthModal>;

export default meta;

type AuthModalStory = StoryObj<typeof AuthModal>;

export const Base: AuthModalStory = {
    args: {
        handleClose: () => {},
        onError: () => {},
        onSuccess: () => {},
    },
};
