import type { Rule } from "@/entities/rule";
import { mockMemberArray } from "@/gateways/member/testData";

export const mockRuleArray: Rule[] = [
	{
		id: "rule_01",
		member: mockMemberArray[0],
		title: "and-setting プロジェクト開発ルール",
		contentArray: [
			{
				title: "CLAUDE.md",
				content: `## 重要: 基本原則
### 1. 日本語コミュニケーション
すべてのやり取りは日本語で行います。`,
			},
		],
		toolArray: ["Claude", "Gemini"],
		tagArray: ["project-rule", "must-read"],
	},
	{
		id: "rule_02",
		member: mockMemberArray[1],
		title: "コンポーネント設計の高度なパターン",
		contentArray: [
			{
				title: "docs/component-guidelines.md",
				content: `Presenterパターンは、コンポーネントから表示ロジックを分離するための強力な手法です。
1.  **責務の分離**: コンポーネントはJSXの構造に、Presenterは表示内容の生成に集中できます。
2.  **テストの容易性**: 表示ロジックが純粋関数になるため、単体テストが非常に簡単になります。
3.  **可読性の向上**: コンポーネントから複雑な三項演算子や文字列操作が消え、見通しが良くなります。
このパターンを積極的に採用してください。`,
			},
		],
		toolArray: ["Copilot", "Cursor"],
		tagArray: ["architecture", "react", "best-practice"],
	},
	{
		id: "rule_03",
		member: mockMemberArray[2],
		title: "Git利用時の注意点",
		contentArray: [], // コンテンツがないケース
		toolArray: ["Cline"],
		tagArray: ["git", "workflow"],
	},
];
