/* eslint-disable react/no-unknown-property */
/**
 * 此处样式只对当前主题生效
 * 此处不支持 tailwindCSS 的 @apply 语法
 * @returns
 */
const Style = () => {
  return (
    <style jsx global>{`
      html {
        -webkit-font-smoothing: antialiased;
      }
      .font-typography {
        font-weight: 400;
        font-family:
          Source Sans Pro,
          Roboto,
          Helvetica,
          Helvetica Neue,
          Source Han Sans SC,
          Source Han Sans TC,
          PingFang SC,
          PingFang HK,
          PingFang TC,
          sans-serif !important;
        }
      }
      // 底色
      .dark body {
        background-color: rgb(35, 34, 34);
      }
      // 文本不可选取
      .forbid-copy {
        user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
      }

      .dark #theme-typography {
        background-image: linear-gradient(
              to right,
              rgb(255 255 255 / 0.04) 1px,
              transparent 1px
            ),
            linear-gradient(to bottom, rgb(255 255 255 / 0.04) 1px, transparent 1px);
      }

      #theme-typography {
        --primary-color: #2e405b;
        background-color: rgb(255 255 255) / 1;
        color: #2e405b;
        background-size: 7px 7px;
        text-shadow: 1px 1px 1px rgb(0 0 0 / 0.04);
        background-image: linear-gradient(
            to right,
            rgb(0 0 0 / 0.04) 1px,
            transparent 1px
          ),
          linear-gradient(to bottom, rgb(0 0 0 / 0.04) 1px, transparent 1px);
      }

      #theme-typography #blog-name {
        font-family: HiraMinProN-W6, 'Source Han Serif CN',
          'Source Han Serif SC', 'Source Han Serif TC', serif;
      }

      #theme-typography #blog-name-en {
        font-family: HiraMinProN-W6, 'Source Han Serif CN',
          'Source Han Serif SC', 'Source Han Serif TC', serif;
      }

      #theme-typography .blog-item-title {
        color: #276077;
      }

      .dark #theme-typography .blog-item-title {
        color: #d1d5db;
      }

      .notion {
        margin-top: 0 !important;
        margin-bottom: 0 !important;
      }

      #container-wrapper .scroll-hidden {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
      }

      /* ========== 左侧栏菜单样式（完整重写，满足所有需求） ========== */
      /* 基础重置：去除下划线、设置字体大小和行距 */
      .menu-custom .menu-link,
      .menu-custom .absolute ul li a {
        text-decoration: none !important;
        font-size: 1.2rem !important;      /* 约为原字体 1.2 倍 */
        line-height: 1.4 !important;       /* 行距紧凑，不会过大 */
        transition: all 0.2s ease;
        border-radius: 9999px;
        padding: 0.25rem 0.75rem;
        display: inline-block;
        white-space: nowrap;
      }

      /* 白天模式：正常文字蓝色 */
      .menu-custom .menu-link,
      .menu-custom .absolute ul li a {
        color: #2563EB !important;
        background-color: transparent !important;
      }
      /* 白天模式悬停：文字白色，背景蓝色（药丸） */
      .menu-custom .menu-link:hover,
      .menu-custom .absolute ul li a:hover {
        color: white !important;
        background-color: #2563EB !important;
      }

      /* 夜晚模式：正常文字白色 */
      .dark .menu-custom .menu-link,
      .dark .menu-custom .absolute ul li a {
        color: white !important;
        background-color: transparent !important;
      }
      /* 夜晚模式悬停：文字蓝色，背景白色（药丸） */
      .dark .menu-custom .menu-link:hover,
      .dark .menu-custom .absolute ul li a:hover {
        color: #2563EB !important;
        background-color: white !important;
      }

      /* ---------- 二级菜单容器：彻底去除玻璃效果和背景条 ---------- */
      .menu-custom .glassmorphism,
      .menu-custom .absolute,
      .menu-custom ul,
      .menu-custom .absolute ul {
        background: transparent !important;
        backdrop-filter: none !important;
        box-shadow: none !important;
        border: none !important;
      }
      /* 移除二级菜单项的默认背景（包括 dark:bg-gray-900） */
      .menu-custom .absolute ul li {
        background: transparent !important;
        margin: 0;
        padding: 0;
        border: none;
      }
      /* 确保二级菜单项在白天/黑夜无背景 */
      .dark .menu-custom .absolute ul li {
        background: transparent !important;
      }
      /* 二级菜单项之间的间距可以保留一点 */
      .menu-custom .absolute ul li {
        margin-bottom: 0.25rem;
      }
    `}</style>
  )
}

export { Style }
