<script>
import { onMount } from "svelte";

let playerContainer;
let ap = null;

const songIds = [
	"3359827044",
	"3347766479",
	"3342981041",
	"3320933124",
	"3336080601",
	"3315029170",
	"2750034058",
	"2707332868",
	"2633225875",
	"2154644185",
	"2108548014",
	"2058124989",
	"435278010",
];

// 1. 最小变动：添加备用 API 列表
const apiSources = [
	"http://124.220.238.163:46666/api",
	"https://meting-api-omega.vercel.app/api",
	"https://api.i-meto.com/meting/api",
	"https://api.injahow.cn/meting/",
	"https://meting.elysium-stack.cn/api",
];

onMount(async () => {
	// 2. 最小变动：添加一个递归抓取函数
	const fetchSong = async (id, index = 0) => {
		if (index >= apiSources.length) return null;
		try {
			const res = await fetch(
				`${apiSources[index]}?server=netease&type=song&id=${id}`,
			);
			const data = await res.json();
			return data[0];
		} catch (e) {
			return fetchSong(id, index + 1);
		}
	};

	const initPlayer = async () => {
		if (ap) ap.destroy();
		try {
			// 并行抓取所有歌曲，会自动尝试备用链接
			const playlist = (
				await Promise.all(songIds.map((id) => fetchSong(id)))
			).filter((i) => i);

			// @ts-expect-error
			ap = new window.APlayer({
				container: playerContainer,
				audio: playlist,
				fixed: false,
				autoplay: false,
				order: "list",
				listFolded: true,
				lrcType: 3,
			});
		} catch (e) {
			console.error("播放器加载失败", e);
		}
	};

	document.addEventListener("astro:after-swap", initPlayer);
	initPlayer();

	return () => {
		document.removeEventListener("astro:after-swap", initPlayer);
		if (ap) ap.destroy();
	};
});
</script>

<div class="aplayer-wrapper">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.css">
  <script src="https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.js"></script>
  <div bind:this={playerContainer}></div>
</div>

<style>

    :global(.aplayer), 
  :global(.aplayer .aplayer-title), 
  :global(.aplayer .aplayer-author), 
  :global(.aplayer .aplayer-lrc) {
    /* 强制继承 Fuwari 定义在 body 或 #widget-layout 上的字体 */
    font-family: inherit !important; 
  }




  .aplayer-wrapper {
    width: 100%;
  }

  /* 1. 最外层容器：设为全透明 */
  :global(.aplayer) {
    background-color: #00000000 !important; /* 全透明 */
    border: 1px solid #00000000 !important; /* 极淡的边框，不需要可改为 #00000000 */
    box-shadow: #00000000 0 0 0 !important;
    border-radius: 12px !important;
    margin: 0 !important;
  }

  /* 2. 移除歌词区域的固体渐变（改为透明渐变） */
  /* 这里是解决“白条”和“黑块”的关键 */
  :global(.aplayer .aplayer-lrc:before) {
    background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%) !important;
  }
  :global(.aplayer .aplayer-lrc:after) {
    background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%) !important;
  }
  
  :global(.aplayer .aplayer-lrc) {
    background-color: #00000000 !important;
  }

  /* 3. 中间信息区域 */
  :global(.aplayer .aplayer-info) {
    background-color: #00000000 !important;
    border-top: 1px solid #00000000 !important;
  }

  /* 4. 进度条轨道：设为半透明灰色，保证在深浅色背景下都隐约可见 */
  :global(.aplayer .aplayer-info .aplayer-controller .aplayer-bar-wrap .aplayer-bar) {
    background-color: #88888844 !important;
  }

  /* 5. 文字颜色：使用中灰色，确保万能适配 */
  
  :global(.aplayer .aplayer-info .aplayer-music .aplayer-author),
  :global(.aplayer .aplayer-info .aplayer-controller .aplayer-time),
  :global(.aplayer .aplayer-lrc p) {
    color: #999999 !important;
  }

  :global(.aplayer .aplayer-info .aplayer-music .aplayer-title) {
    color: #b1b1b1 !important;
  }
  
  /* 高亮歌词可以白一点 */
  :global(.aplayer .aplayer-lrc p.aplayer-lrc-current) {
    color: #b1b1b1 !important;
  }

  /* 6. 图标颜色 */
  :global(.aplayer .aplayer-icon svg path) {
    fill: #999999 !important;
  }

  /* 7. 播放列表：也设为透明 */
  :global(.aplayer .aplayer-list ol li) {
    background-color: #00000000 !important;
    border-top: 1px solid #88888822 !important;
    color: #999999 !important;
  }
  :global(.aplayer .aplayer-list ol li.aplayer-list-light) {
    background-color: #88888822 !important;
  }
</style>