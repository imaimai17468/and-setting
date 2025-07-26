import type { Rule } from "@/entities/rule";
import { mockMemberArray } from "@/gateways/member/testData";

const now = new Date();
const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

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
		createdAt: weekAgo.toISOString(),
		updatedAt: yesterday.toISOString(),
	},
	{
		id: "rule_02",
		member: mockMemberArray[1],
		title: "コンポーネント設計の高度なパターン",
		contentArray: [
			{
				title: "Component Architecture",
				content: `# Component Architecture Best Practices

When building React applications, proper component architecture is crucial for maintainability and scalability. Here are the key principles to follow:

## 1. Single Responsibility Principle
Each component should have a single, well-defined responsibility. This makes components easier to understand, test, and maintain.

## 2. Composition over Inheritance
React favors composition over inheritance. Use component composition to build complex UIs from simpler components.

## 3. Props Interface Design
Design clear and intuitive props interfaces. Use TypeScript to define prop types and provide good developer experience.

\`\`\`typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}
\`\`\`

## 4. State Management
Keep state as close to where it's needed as possible. Use local state for component-specific data and global state for shared data.

## 5. Performance Considerations
- Use React.memo for expensive components
- Implement proper key props for lists
- Avoid creating objects in render methods
- Use useCallback and useMemo judiciously

This architecture approach ensures your React applications remain maintainable and performant as they grow in complexity.`,
			},
			{
				title: "State Management",
				content: `# State Management Strategies

Effective state management is the backbone of any React application. This guide covers various approaches and when to use them.

## Local State with useState
For component-specific state that doesn't need to be shared:

\`\`\`typescript
const [count, setCount] = useState(0);
const [isLoading, setIsLoading] = useState(false);
\`\`\`

## Context API for Theme and User Data
Use React Context for data that needs to be accessible by many components:

\`\`\`typescript
const ThemeContext = createContext<{
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}>({
  theme: 'light',
  toggleTheme: () => {}
});
\`\`\`

## External State Management
For complex applications, consider:
- **Zustand**: Lightweight and simple
- **Redux Toolkit**: For complex state logic
- **Jotai**: Atomic state management

## Server State
Use specialized libraries for server state:
- **TanStack Query**: For data fetching and caching
- **SWR**: Simple data fetching with caching

## Best Practices
1. Keep state as local as possible
2. Normalize complex state structures
3. Use reducers for complex state logic
4. Separate server state from client state
5. Implement proper error boundaries

Remember: the best state management solution is the simplest one that meets your needs.`,
			},
			{
				title: "Performance Optimization",
				content: `# React Performance Optimization

Performance optimization in React requires understanding how React works under the hood and applying the right techniques at the right time.

## Profiling and Measurement
Before optimizing, measure performance using:
- React DevTools Profiler
- Chrome DevTools Performance tab
- Web Vitals metrics

## Optimization Techniques

### 1. Memoization
Use React.memo to prevent unnecessary re-renders:

\`\`\`typescript
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* Complex rendering logic */}</div>;
});
\`\`\`

### 2. useCallback and useMemo
Optimize expensive calculations and function references:

\`\`\`typescript
const memoizedValue = useMemo(() => {
  return expensiveCalculation(a, b);
}, [a, b]);

const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
\`\`\`

### 3. Code Splitting
Split your code to reduce initial bundle size:

\`\`\`typescript
const LazyComponent = lazy(() => import('./LazyComponent'));
\`\`\`

### 4. Virtual Scrolling
For large lists, implement virtual scrolling:
- react-window
- react-virtualized

### 5. Image Optimization
- Use Next.js Image component
- Implement lazy loading
- Choose appropriate formats (WebP, AVIF)

## Common Performance Pitfalls
1. Creating objects in render methods
2. Using array indices as keys
3. Not memoizing expensive calculations
4. Over-using useEffect
5. Large bundle sizes

## Monitoring
Set up performance monitoring:
- Core Web Vitals
- Real User Monitoring (RUM)
- Synthetic testing

Performance optimization is an ongoing process. Focus on the biggest impact areas first and measure the results of your optimizations.`,
			},
		],
		toolArray: ["Copilot", "Cursor"],
		tagArray: ["architecture", "react", "best-practice"],
		createdAt: yesterday.toISOString(),
		updatedAt: yesterday.toISOString(),
	},
	{
		id: "rule_03",
		member: mockMemberArray[2],
		title: "Git利用時の注意点",
		contentArray: [], // コンテンツがないケース
		toolArray: ["Cline"],
		tagArray: ["git", "workflow"],
		createdAt: now.toISOString(),
		updatedAt: now.toISOString(),
	},
];
