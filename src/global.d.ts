import type { AstroIntegration } from "@swup/astro";

declare global {
	// 由 astro.config.mjs 通过 vite define 在构建期注入
	const __GIT_COMMIT__: string;
	const __GIT_BUILD_DATE__: string;

	// Google Tag Manager 全局对象（Layout.astro 中 gtag 片段使用）
	const dataLayer: any[];

	interface Window {
		// type from '@swup/astro' is incorrect
		swup: AstroIntegration;
		dataLayer: any[];
		pagefind: {
			search: (query: string) => Promise<{
				results: Array<{
					data: () => Promise<SearchResult>;
				}>;
			}>;
		};
	}
}

interface SearchResult {
	url: string;
	meta: {
		title: string;
	};
	excerpt: string;
	content?: string;
	word_count?: number;
	filters?: Record<string, unknown>;
	anchors?: Array<{
		element: string;
		id: string;
		text: string;
		location: number;
	}>;
	weighted_locations?: Array<{
		weight: number;
		balanced_score: number;
		location: number;
	}>;
	locations?: number[];
	raw_content?: string;
	raw_url?: string;
	sub_results?: SearchResult[];
}
