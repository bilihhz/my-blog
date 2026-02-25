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
1.首先，fork Fuwari的仓库，随便取名字   
::github{repo="saicaca/fuwari"}   
2.然后用 `git` 克隆仓库到本地：`git clone 你的仓库链接`  
:::warning
不要像我当时傻乎乎的直接下载源码，这样无法使用git
:::
3.打开`Node.js command prompt`，安装pnpm：`npm install -g pnpm`  
4.然后cd到你的项目的根目录，安装依赖：`pnpm install`  
至此，可以开始更改fuwari的配置了  
5.打开根目录下`src`文件夹中的`config.ts`，开始修改  
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


## 开始写作

1.转移或删除`src/content/posts`中的示例md教程文章  
2.在`Node.js command prompt`中cd到你的项目根目录，执行：`pnpm new-post 文章标题（也是文件名称）`  
3.然后`src/content/posts`下就会出现一个`你刚输的标题.md`  
4.用你喜欢的md编辑器打开文件，你应该可以看到这些：
```md title=你刚输的标题.md
---
title: 你刚输的标题
published: 2026-02-23
description: ''
image: ''
tags: []
category: ''
draft: false 
lang: ''
---
```
- `title`：文章标题
- `published`：文章创建时间
- `description`：文章描述，在标题下方小字
- `image`：文章封面图片，也会在文章最开头显示
- `tags`：文章标签，多个标签格式为`["xxx" , "xxx"]`
- `category`：分类，应该只能写一个
- 剩下两个正常情况不用管  
  
5.markdown语法这里就不讲了，可以自己搜或去看一开始`src/content/posts`里的md教程文章

## 预览并部署
- `预览`  
1.在`Node.js command prompt`中cd到你的项目根目录，执行：`pnpm dev`就可以预览你的博客，支持热修改  
- `推送`  
2.打开`Git bash`，首先让git知道你是谁，执行：`git config --global user.name 你的Github用户名`和`git config --global user.email 你的Github账号绑定的邮箱`（git bash内不能ctrl+c ctrl+v，用右键的paste）  
3.然后切换仓库为ssh：`git remote set-url origin git@github.com:用户名/仓库名称`  
4.然后提交所有文件,执行：`git add .`  
5.然后发布一个本地提交，执行：`git commit -m 随便写`（这个是在你这次提交中修改的文件后显示的说明，比如你修改了什么）  
6.然后就可以推送了，执行：`git push`  
7.应该就推送成功了，有什么报错复制去问ai，然后以后再推送只要4，5，6步就可以了  
- `部署`  
1.打开`cloudflare dashboard`（应该叫这个吧）  
2.在侧边栏找到`computer`栏然后展开，选`Workers 和 pages`  
3.点右上角的`创建应用程序`,选最底下的`想要部署 Pages？开始使用`  
4.选`导入现有 Git 存储库`,然后添加你的github账号，选择你的fuwari仓库  
5.设置构建命令为`pnpm build`，构建输出目录为`dist`，然后直接点右下角`保存并部署`就行  
6.然后可以在设置里绑定自定义域名（没钱可以去整个免费的二级域名(最好能托管到`cloudflare`的，这样比较方便)，最好不要用自带的`.pages.dev`）
7.以后只要你推送了，`cloudflare`便会自动更新，不用你去管

---

## 以下均为可选部分，如果你想让你的网站更好看，有更多功能，可以看下去

## 外观部分

外观的css代码基本都在`src/styles/`里：
- `main.css`：全局css，你可以在末尾添加自己的东西，比如我添加的：
```css title=main.css

/*上面就是原始代码*/

body {
    
    background-image:url('https://bing.img.run/uhd.php'); /* 设置背景图片的URL */
    background-repeat: no-repeat; /* 设置背景图片不重复 */
    background-attachment: fixed; /* 设置背景图片固定，不随滚动条滚动 */
    background-size: cover; /* 设置背景图片覆盖整个视口 */
    background-position: center; /* 设置背景图片的位置为居中 */


    font-feature-settings: "cv05",  "ss01";
    
}


@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-VariableFont_opsz,wght.ttf') format('truetype');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
```
- `variables.styl`：颜色全在这里面了，你想要跟我一样的透明效果就更改`define`下面的`--card-bg`(用rgba的原因是oklch兼容性不好)
```styl title=variables.styl
--card-bg: rgba(255, 255, 255, 0.75) rgba(23, 23, 23, 0.75)
```
- `expressive-code.css`：可以更改代码块的字体
- `markdown.css`：可以在里面修改网页/文章的字体（其他的代码看不懂）
- 其他的我看不懂
### 自定义字体
1.将你的字体文件复制到根目录下的`/public/fonts`(没有就创建)  
2.打开刚才提到的`main.css`  
3.在最后添加：
```css title=main.css
@font-face {
  font-family: '字体名字（随便写）';
  src: url('/fonts/字体文件名') format('字体类型（就是woff2，truetype之类的）');
  font-weight: 字体支持宽度范围;
  font-style: normal;
  font-display: swap;
}
/*比如*/
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-VariableFont_opsz,wght.ttf') format('truetype');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
```
4.然后打开并修改根目录下的`tailwind.config.cjs`
```cjs title=tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,mjs}"],
  darkMode: "class", // allows toggling dark mode manually
  theme: {
    extend: {
      fontFamily: {// 修改这里
        sans: ["Inter", "sans-serif", ...defaultTheme.fontFamily.sans],
		// 把第一个字体替换成你刚填的字体名称就行
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
```
5.然后打开并修改`src/styles/markdown.css`
```css title=markdown.css
    code {
        @apply bg-[var(--inline-code-bg)] text-[var(--inline-code-color)] px-1 py-0.5 rounded-md overflow-hidden;
/*应该是在40行，把字体添加到第一个*/
        font-family: 'Inter',  'JetBrains Mono Variable', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;
        &:before {
            content:none;
        }
        &:after {
            content:none;
        }
        

```
6.这时应该已经成功了，如果没成功检查一下代码，或去网上搜别人的方法  

## 功能
### Umami(其他通过添加js的分析平台同样适用)
1.打开[Umami](https://umami.is/)官网，注册一个账号  
2.点添加网站，输入你网站的基本信息，然后得到一个追踪代码，复制   
3.打开`src/layouts/Layout.astro`,翻到差不多一百多行，在<head>里添加就行（你应该会html吧）   
4.顺便讲一下如果没有副标题如何删除那个`-`
```astro title=Layout.astro
let pageTitle: string;
if (title) {
	pageTitle = `${title} - ${siteConfig.title}`;
} else {
	pageTitle = `${siteConfig.title}`;
} // 差不多50多行，应该是改这里，照着我删就行
```

### Giscus评论区
1.创建一个github空仓库，在设置里启用discussion功能  
2.打开[giscus](https://giscus.app/zh-CN)网站，输入刚才那个仓库
3.映射关系选第一个`pathname`，Discussion 分类选`announcements`,特性自己选择，我选的是1，3，4  
4.然后将得到的js添加就行了（我也不知道加到哪，可以看下面那篇文章）  
5.要做适应light/dark切换可以参考这篇文章：https://pcb.im/posts/giscus/


# 未写完

有误请在评论区指出

## 参考文章：
1.https://2x.nz/posts/fuwari/  
2.https://aulypc1.github.io/posts/website/use_custom_fonts_in_fuwari/
3.没写完
# 未写完