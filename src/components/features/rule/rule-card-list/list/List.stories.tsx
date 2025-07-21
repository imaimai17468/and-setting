import type { Meta, StoryObj } from "@storybook/react";
import { mockRuleArray } from "@/gateways/rule/testData";
import { List } from "./List";

const meta = {
	component: List,
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		ruleArray: mockRuleArray,
	},
};

export const Empty: Story = {
	args: {
		ruleArray: [],
	},
};

export const SingleRule: Story = {
	args: {
		ruleArray: [mockRuleArray[0]],
	},
};

export const ManyRules: Story = {
	args: {
		ruleArray: [
			...mockRuleArray,
			...mockRuleArray.map((rule, index) => ({
				...rule,
				id: `${rule.id}_copy_${index}`,
				title: `${rule.title} (コピー ${index + 1})`,
			})),
			...mockRuleArray.map((rule, index) => ({
				...rule,
				id: `${rule.id}_copy2_${index}`,
				title: `${rule.title} (コピー2 ${index + 1})`,
			})),
		],
	},
};
