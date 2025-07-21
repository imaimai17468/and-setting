import type { Meta, StoryObj } from "@storybook/react";
import { mockMemberArray } from "@/gateways/member/testData";
import { MemberCard } from "./MemberCard";

const meta = {
	component: MemberCard,
	tags: ["autodocs"],
} satisfies Meta<typeof MemberCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		member: mockMemberArray[0],
	},
};

export const NoIcon: Story = {
	args: {
		member: {
			...mockMemberArray[1],
			iconUrl: undefined,
		},
	},
};

export const ManyFollowers: Story = {
	args: {
		member: {
			...mockMemberArray[2],
			followerArray: Array.from({ length: 150 }, (_, i) => `follower_${i}`),
			followingArray: Array.from({ length: 75 }, (_, i) => `following_${i}`),
		},
	},
};
