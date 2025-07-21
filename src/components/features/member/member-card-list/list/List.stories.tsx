import type { Meta, StoryObj } from "@storybook/react";
import { mockMemberArray } from "@/gateways/member/testData";
import { List } from "./List";

const meta = {
	component: List,
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		memberArray: mockMemberArray,
	},
};

export const Empty: Story = {
	args: {
		memberArray: [],
	},
};

export const SingleMember: Story = {
	args: {
		memberArray: [mockMemberArray[0]],
	},
};

export const ManyMembers: Story = {
	args: {
		memberArray: [
			...mockMemberArray,
			...mockMemberArray.map((member, index) => ({
				...member,
				id: `${member.id}_copy_${index}`,
				name: `${member.name} (コピー ${index + 1})`,
			})),
		],
	},
};
