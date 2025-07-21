import type { Meta, StoryObj } from "@storybook/react";
import { mockRuleArray } from "@/gateways/rule/testData";
import { RuleCard } from "./RuleCard";

const meta = {
	component: RuleCard,
	tags: ["autodocs"],
} satisfies Meta<typeof RuleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		rule: mockRuleArray[0],
	},
};

export const LongContent: Story = {
	args: {
		rule: mockRuleArray[1],
	},
};

export const NoContent: Story = {
	args: {
		rule: mockRuleArray[2],
	},
};

export const NoMemberIcon: Story = {
	args: {
		rule: {
			...mockRuleArray[0],
			member: {
				...mockRuleArray[0].member,
				iconUrl: undefined,
			},
		},
	},
};
