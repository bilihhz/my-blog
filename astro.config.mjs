import { execSync } from "node:child_process";
import { unified } from "@astrojs/markdown-remark";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import swup from "@swup/astro";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeComponents from "rehype-components";/* Render the custom directive content */
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkDirective from "remark-directive";/* Handle directives */
import remarkGithubAdmonitionsToDirectives from "remark-github-admonitions-to-directives";
import remarkMath from "remark-math";
import remarkSectionize from "remark-sectionize";
import { expressiveCodeConfig } from "./src/config.ts";
import { pluginLanguageBadge } from "./src/plugins/expressive-code/language-badge.ts";
import { AdmonitionComponent } from "./src/plugins/rehype-component-admonition.mjs";
import { GithubCardComponent } from "./src/plugins/rehype-component-github-card.mjs";
import { parseDirectiveNode } from "./src/plugins/remark-directive-rehype.js";
import { remarkExcerpt } from "./src/plugins/remark-excerpt.js";
import { remarkReadingTime } from "./src/plugins/remark-reading-time.mjs";
import { pluginCustomCopyButton } from "./src/plugins/expressive-code/custom-copy-button.js";

import cloudflare from "@astrojs/cloudflare";
import rehypeFigure from "./src/plugins/rehype-figure.mjs";
import remarkImageWidth from './src/plugins/remark-image-width.js'
import rehypeEmailProtection from "./src/plugins/rehype-email-protection.mjs";
import { UrlCardComponent } from "./src/plugins/rehype-component-url-card.mjs";

// workerd 环境不支持 CommonJS（如 module.exports），会在 dev 服务器里触发 "module is not defined"。
// 参考 Cloudflare 适配器文档：用 configEnvironment 把相关依赖预编译进 optimizeDeps.include。
function optimizeDepsForServer() {
	return {
		name: "optimize-astro-icon-deps",
		configEnvironment(name) {
			if (name !== "client") {
				return {
					optimizeDeps: {
						include: ["astro-icon/components", "@iconify/utils"],
					},
				};
			}
		},
	};
}

// 在 Node 环境（构建期）计算 git 信息，再通过 vite define 注入，
// 因为新 Cloudflare 适配器在 workerd 里预渲染，运行时无法调用 node:child_process
const gitInfo = (() => {
	try {
		const commitHash = execSync("git rev-parse --short=7 HEAD").toString().trim();
		const date = new Date();
		const parts = new Intl.DateTimeFormat("zh-CN", {
			timeZone: "Asia/Shanghai",
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			hour12: false,
		}).formatToParts(date);
		const get = (type) => parts.find((p) => p.type === type)?.value ?? "00";
		const buildDate = `${get("year")}-${get("month")}-${get("day")} ${get("hour")}:${get("minute")}:${get("second")}`;
		return { commitHash, buildDate };
	} catch {
		return { commitHash: "unknown", buildDate: "unknown" };
	}
})();

// https://astro.build/config
export default defineConfig({
  site: "https://hhz114514.qzz.io/",
  base: "/",
  trailingSlash: "always",
  compressHTML: true, // 保留 v6 的 HTML 感知空白压缩行为（v7 默认改为 'jsx'）
  redirects: {
		"/zl": {
			status: 302,
			destination: `https://zl.hhz114514.qzz.io/`,
		},
        
    },




  integrations: [
      swup({
          theme: false,
          animationClass: "transition-swup-", // see https://swup.js.org/options/#animationselector
          // the default value `transition-` cause transition delay
          // when the Tailwind class `transition-all` is used
          containers: ["main", "#toc"],
          smoothScrolling: true,
          cache: true,
          preload: true,
          accessibility: true,
          updateHead: true,
          updateBodyClass: false,
          globalInstance: true,
      }),
      icon({
          include: {
              "fa6-brands": ["*"],
              "fa6-regular": ["*"],
              "fa6-solid": ["*"],
          },
      }),
      expressiveCode({
          themes: [expressiveCodeConfig.theme, expressiveCodeConfig.theme],
          plugins: [
              pluginCollapsibleSections(),
              pluginLineNumbers(),
              pluginLanguageBadge(),
              pluginCustomCopyButton()
          ],
          defaultProps: {
              wrap: true,
              overridesByLang: {
                  'shellsession': {
                      showLineNumbers: false,
                  },
              },
          },
          styleOverrides: {
              codeBackground: "var(--codeblock-bg)",
              borderRadius: "0.75rem",
              borderColor: "none",
              codeFontSize: "0.875rem",
              codeFontFamily: "'JetBrains Mono Variable', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
              codeLineHeight: "1.5rem",
              frames: {
                  editorBackground: "var(--codeblock-bg)",
                  terminalBackground: "var(--codeblock-bg)",
                  terminalTitlebarBackground: "var(--codeblock-topbar-bg)",
                  editorTabBarBackground: "var(--codeblock-topbar-bg)",
                  editorActiveTabBackground: "none",
                  editorActiveTabIndicatorBottomColor: "var(--primary)",
                  editorActiveTabIndicatorTopColor: "none",
                  editorTabBarBorderBottomColor: "var(--codeblock-topbar-bg)",
                  terminalTitlebarBorderBottomColor: "none"
              },
              textMarkers: {
                  delHue: 0,
                  insHue: 180,
                  markHue: 250
              }
          },
          frames: {
              showCopyToClipboardButton: false,
          }
      }),
      svelte(),
      sitemap(),
	],

  markdown: {
      processor: unified({
          // v7 默认是 Sätteri（不执行 remark/rehype 插件），本项目依赖这些插件，故保留 unified 管道并在此传入插件
          remarkPlugins: [
              remarkMath,
              remarkReadingTime,
              remarkExcerpt,
              remarkGithubAdmonitionsToDirectives,
              remarkDirective,
              remarkSectionize,
              parseDirectiveNode,
              remarkImageWidth,
          ],
          rehypePlugins: [
              rehypeKatex,
              rehypeSlug,
              rehypeFigure,
              [rehypeEmailProtection, { method: "base64" }], // 邮箱保护插件，支持 'base64' 或 'rot13'
          [
              rehypeComponents,
              {
                  components: {
                      github: GithubCardComponent,
                      url: UrlCardComponent,
                      note: (x, y) => AdmonitionComponent(x, y, "note"),
                      tip: (x, y) => AdmonitionComponent(x, y, "tip"),
                      important: (x, y) => AdmonitionComponent(x, y, "important"),
                      caution: (x, y) => AdmonitionComponent(x, y, "caution"),
                      warning: (x, y) => AdmonitionComponent(x, y, "warning"),
                  },
              },
          ],
          [
              rehypeAutolinkHeadings,
              {
                  behavior: "append",
                  properties: {
                      className: ["anchor"],
                  },
                  content: {
                      type: "element",
                      tagName: "span",
                      properties: {
                          className: ["anchor-icon"],
                          "data-pagefind-ignore": true,
                      },
                      children: [
                          {
                              type: "text",
                              value: "#",
                          },
                      ],
                  },
              },
          ],
          ]}),
	},

  vite: {
      plugins: [optimizeDepsForServer()],
      define: {
          __GIT_COMMIT__: JSON.stringify(gitInfo.commitHash),
          __GIT_BUILD_DATE__: JSON.stringify(gitInfo.buildDate),
      },
      build: {
          rollupOptions: {
              onwarn(warning, warn) {
                  // temporarily suppress this warning
                  if (
                      warning.message.includes("is dynamically imported by") &&
                      warning.message.includes("but also statically imported by")
                  ) {
                      return;
                  }
                  warn(warning);
              },
          },
      },
	},

  adapter: cloudflare({
      // 默认图片服务是 cloudflare-binding（运行时 _image/ 端点 + Cloudflare Images），
      // 静态站没有配置 IMAGES binding 会导致图片 404。改用 compile 在构建时用 sharp 处理。
      imageService: "compile",
  }),
});