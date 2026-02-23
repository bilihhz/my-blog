---
title: Fuwari + Cloudflare Pages 搭建教程
published: 2026-02-13
description: '将Fuwari部署在cloudflare pages上，得到一个无需自托管的个人博客'
image: './pic/fuwari-build1.png'
tags: ["教程","Fuwari"]
category: '教程'
draft: false 
lang: ''
---

## 准备事项
1.[git](https://git-scm.com)  
2.[Node.js](https://nodejs.org)   
3.一个[Github](https://github.com)账号  
4.一个[Cloudflare](https://cloudflare.com)账号   
5.自己喜欢的IDE和markdown编辑器 

## 正式开始
首先，fork Fuwari的仓库，随便取名字   
::github{repo="saicaca/fuwari"}   
然后用 `git` 克隆仓库到本地：`git clone 你的仓库链接`  
:::warning
不要像我当时傻乎乎的直接下载源码，这样无法使用git
:::
打开`Node.js command prompt`，安装pnpm：`npm install -g pnpm`  
然后cd到你的项目的根目录，安装依赖：`pnpm install`  
至此，可以开始更改fuwari的配置了  
打开根目录下`src`文件夹中的`config.ts`，开始修改  
- `title`：网站标题
- `subtitle`：网站副标题，可以空着，会显示为标题 - 副标题
- `lang`：语言，如zh_CN，en，ja等
- `hue`：主题色，可以在右上角的调色盘图标选好后填写（这是oklch，不是rgba，所以显示不正常说明你的浏览器不支持oklch）
- `banner`：banner图片，可以填url
- `credit`：banner图片出处
- `favicon`：网站图标，可以填url
- `navbatconfig`：`links`：在导航栏上的链接
- `avatar`：左边这个头像
- `name`：名字
- `bio`：个性签名
- `links`：你在其他平台的链接，显示在个性签名下面
- `links`：`icon`：需去[icones.js.org](https://icones.js.org)寻找，fuwari默认支持`fa6-brands`, `fa6-regular`, `fa6-solid`, `material-symbols`这几种
- 附上我的`config.ts`
```ts title="config.ts"
import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "hhz-blog",
	subtitle: "",
	lang: "zh_CN", // Language code, e.g. 'en', 'zh_CN', 'ja', etc.
	themeColor: {
		hue: 65, // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
		fixed: false, // Hide the theme color picker for visitors
	},
	banner: {
		enable: false,
		src: "https://bing.img.run/uhd.php", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
		position: "center", // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
		credit: {
			enable: false, // Display the credit text of the banner image
			text: "", // Credit text to be displayed
			url: "https://bing.img.run/", // (Optional) URL link to the original artwork or artist's page
		},
	},
	background: {
		enable: false, // Enable background image
		src: "https://bing.img.run/uhd.php", // Background image URL (supports HTTPS)
		position: "center", // Background position: 'top', 'center', 'bottom'
		size: "cover", // Background size: 'cover', 'contain', 'auto'
		repeat: "no-repeat", // Background repeat: 'no-repeat', 'repeat', 'repeat-x', 'repeat-y'
		attachment: "fixed", // Background attachment: 'fixed', 'scroll', 'local'
		opacity: 1, // Background opacity (0-1)
	},
	toc: {
		enable: true, // Display the table of contents on the right side of the post
		depth: 2, // Maximum heading depth to show in the table, from 1 to 3
	},
	favicon: [
		// Leave this array empty to use the default favicon
		 {
		   src: 'https://image2url.com/r2/default/images/1770029495841-b5ff076e-283d-4a78-92a6-d656a18b3381.ico',    // Path of the favicon, relative to the /public directory
		//   theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
		//   sizes: '32x32',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
		 }
	],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,
		{
			name: "统计(Umami)",
			url: "https://cloud.umami.is/share/zwNENJkXsBNXmIuP", // Internal links should not include the base path, as it is automatically added
			external: true, // Show an external link icon and will open in a new tab
		},
		{
			name: "监控1",
			url: "https://uptime.hhz114514.qzz.io/", // Internal links should not include the base path, as it is automatically added
			external: true, // Show an external link icon and will open in a new tab
		},
		{
			name: "监控2",
			url: "https://stats.uptimerobot.com/Vvl3i7j1N2", // Internal links should not include the base path, as it is automatically added
			external: true, // Show an external link icon and will open in a new tab
		},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/web.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
	name: "hhz",
	bio: "雷批+月计入",
	links: [
		{
      		name: 'Email',
      		icon: 'fa6-solid:envelope',
      		url: 'hello@hhz114514.qzz.io',
    	},
		{
      		name: 'bilibili',
      		icon: 'fa6-brands:bilibili',
      		url: 'https://space.bilibili.com/1202526655',
    	},
		{
      		name: 'GitHub',
      		icon: 'fa6-brands:github',
      		url: 'https://github.com/bilihhz',
    	},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// Note: Some styles (such as background color) are being overridden, see the astro.config.mjs file.
	// Please select a dark theme, as this blog theme currently only supports dark background color
	theme: "github-dark",
};

```
- 那个`background`不要管他，费案（我代码里其实有好多费案什么的）

- 然后更改根目录下的`astro.config.mjs`
```mjs title=astro.config.mjs
import ......
......
......

// https://astro.build/config
export default defineConfig({
  site: "https://你的博客域名/",  //更改这里
  base: "/",
  trailingSlash: "always",

```

- 现在，你就可以正式开始写文章了
- 
# 未写完