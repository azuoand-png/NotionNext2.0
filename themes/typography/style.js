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

      /* ========== 菜单样式（药丸效果，保持字体大小不变） ========== */
      /* 一级菜单 & 二级菜单链接基础样式 */
      .menu-custom .menu-link {
        display: inline-block;
        transition: all 0.2s ease;
        border-radius: 9999px; /* 药丸形状的基础圆角 */
        padding: 0.25rem 0.75rem; /* 确保背景区域足够形成药丸，不改变原有布局太多 */
        text-decoration: none !important;
      }

      /* 白天模式：正常文字蓝色 */
      .menu-custom .menu-link {
        color: #2563EB !important;
        background: transparent;
      }

      /* 白天模式悬停：文字白色，背景蓝色 */
      .menu-custom .menu-link:hover {
        color: white !important;
        background-color: #2563EB !important;
      }

      /* 黑暗模式：正常文字白色 */
      .dark .menu-custom .menu-link {
        color: white !important;
        background: transparent;
      }

      /* 黑暗模式悬停：文字蓝色，背景白色 */
      .dark .menu-custom .menu-link:hover {
        color: #2563EB !important;
        background-color: white !important;
      }

      /* ---------- 二级菜单特殊处理：去掉灰白色长条背景 ---------- */
      .menu-custom .glassmorphism {
        background: transparent !important;
        backdrop-filter: none !important;
        box-shadow: none !important;
        border: none !important;
      }
      /* 二级菜单项的背景条也要清除，并应用药丸悬停效果 */
      .menu-custom .absolute ul li a {
        /* 保证和一级菜单一样的悬停效果 */
        display: inline-block;
        border-radius: 9999px;
        padding: 0.25rem 0.75rem;
        transition: all 0.2s ease;
      }
      /* 二级菜单白天文字颜色继承链接样式 */
      .menu-custom .absolute ul li a {
        color: #2563EB !important;
      }
      .dark .menu-custom .absolute ul li a {
        color: white !important;
      }
      .menu-custom .absolute ul li a:hover {
        color: white !important;
        background-color: #2563EB !important;
      }
      .dark .menu-custom .absolute ul li a:hover {
        color: #2563EB !important;
        background-color: white !important;
      }
      /* 可选：移除二级菜单项的默认背景条和边框 */
      .menu-custom .absolute ul li {
        background: transparent !important;
      }
    `}</style>
  )
}

export { Style }
