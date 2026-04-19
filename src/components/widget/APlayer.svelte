<script>
  import { onMount } from 'svelte';

  let playerContainer;
  let ap = null;

  // --- 在这里填入你想播放的单曲 ID 列表 ---
  const songIds = ['3359827044', '3347766479', '3342981041', '3320933124', '3336080601', '3315029170', '2750034058', '2707332868', '2633225875', '2154644185', '2108548014', '2058124989', '435278010', ]; 
  // ---------------------------------------

  onMount(async () => {
    const initPlayer = async () => {
      if (ap) ap.destroy();

      try {
        // 1. 根据 ID 列表，并行请求网易云单曲数据
        const fetchPromises = songIds.map(id => 
          fetch(`https://meting-api-omega.vercel.app/api?server=netease&type=song&id=${id}`)
          .then(res => res.json())
        );

        // 2. 等待所有请求完成，并将结果展平为一个数组
        const results = await Promise.all(fetchPromises);
        const playlist = results.map(data => data[0]); // 每个接口返回的是数组，取第一个元素

        // 3. 初始化播放器
        // @ts-ignore
        ap = new window.APlayer({
          container: playerContainer,
          audio: playlist,
          fixed: false,
          autoplay: false,
          order: 'list',
          listFolded: true,
          lrcType: 3, // Meting API 默认返回 lrc 链接
        });
      } catch (e) {
        console.error("加载单曲失败:", e);
      }
    };

    document.addEventListener('astro:after-swap', initPlayer);
    initPlayer();

    return () => {
      document.removeEventListener('astro:after-swap', initPlayer);
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