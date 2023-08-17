import type { Meta, StoryObj } from "@storybook/react";
import ProfileWidget from "./ProfileWidget";

const meta = {
    component: ProfileWidget,
    tags: ["autodocs"],
} satisfies Meta<typeof ProfileWidget>;

export default meta;

type ProfileWidgetStory = StoryObj<typeof ProfileWidget>;

export const Base: ProfileWidgetStory = {
    args: {},
};
