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

      /* ========== 菜单样式（药丸效果，保持字体大小行距不变） ========== */
      /* 强制移除所有菜单链接的下划线和默认背景 */
      .menu-custom .menu-link {
        text-decoration: none !important;
        /* 不设置 font-size，保持主题原有大小 */
        /* 不设置 line-height，保持原有行距 */
        transition: all 0.2s ease;
        border-radius: 9999px;
        padding: 0.25rem 0.75rem;
        display: inline-block;
      }

      /* 白天模式：文字蓝色，背景透明 */
      .menu-custom .menu-link {
        color: #2563EB !important;
        background-color: transparent !important;
      }
      /* 白天模式悬停：文字白色，背景蓝色（药丸） */
      .menu-custom .menu-link:hover {
        color: white !important;
        background-color: #2563EB !important;
      }

      /* 黑暗模式：文字白色，背景透明 */
      .dark .menu-custom .menu-link {
        color: white !important;
        background-color: transparent !important;
      }
      /* 黑暗模式悬停：文字蓝色，背景白色（药丸） */
      .dark .menu-custom .menu-link:hover {
        color: #2563EB !important;
        background-color: white !important;
      }

      /* ---------- 二级菜单特殊处理：去除灰白色/黑色长条背景 ---------- */
      /* 清除二级菜单容器 glassmorphism 的所有背景、阴影、边框、模糊效果 */
      .menu-custom .glassmorphism {
        background: transparent !important;
        backdrop-filter: none !important;
        box-shadow: none !important;
        border: none !important;
      }
      /* 二级菜单包裹层的背景透明 */
      .menu-custom .absolute {
        background: transparent !important;
      }
      /* 二级菜单项 li 的背景透明 */
      .menu-custom .absolute ul li {
        background: transparent !important;
        margin-bottom: 0;
        padding: 0;
      }
      /* 二级菜单项中的链接样式沿袭一级菜单的药丸效果 */
      .menu-custom .absolute ul li a {
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
        transition: all 0.2s ease;
        display: inline-block;
        width: auto;
      }
      /* 移除二级菜单中可能存在的额外背景色（dark:bg-gray-900 等） */
      .dark .menu-custom .absolute ul li a {
        background-color: transparent !important;
      }
      /* 二级菜单项的文字颜色独立控制（白天） */
      .menu-custom .absolute ul li a,
      .menu-custom .absolute ul li a .menu-link {
        color: #2563EB !important;
      }
      .dark .menu-custom .absolute ul li a,
      .dark .menu-custom .absolute ul li a .menu-link {
        color: white !important;
      }
      /* 二级菜单悬停时保持一致药丸效果 */
      .menu-custom .absolute ul li a:hover,
      .menu-custom .absolute ul li a:hover .menu-link {
        color: white !important;
        background-color: #2563EB !important;
      }
      .dark .menu-custom .absolute ul li a:hover,
      .dark .menu-custom .absolute ul li a:hover .menu-link {
        color: #2563EB !important;
        background-color: white !important;
      }
    `}</style>
  )
}

export { Style }
