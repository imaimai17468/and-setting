import type { Meta, StoryObj } from "@storybook/react";
import { AddRuleCard } from "./AddRuleCard";

const meta = {
	component: AddRuleCard,
} satisfies Meta<typeof AddRuleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
