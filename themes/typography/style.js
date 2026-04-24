/* eslint-disable react/no-unknown-property */
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
      .dark body {
        background-color: rgb(35, 34, 34);
      }
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
        /* 取消所有文字黑色阴影 */
        text-shadow: none !important;
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

      /* 暗色模式下英文名变为白色 */
      .dark #theme-typography #blog-name-en {
        color: white !important;
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
        -ms-overflow-style: none;
        scrollbar-width: none;
      }

      /* ========== 左侧栏菜单样式 ========== */
      /* 菜单基础：行距1.1倍，字体大小1.2rem（之前已设） */
      .menu-custom .menu-link,
      .menu-custom .absolute ul li a {
        text-decoration: none !important;
        font-size: 1.2rem !important;
        line-height: 1.1 !important;   /* 行距 1.1 倍 */
        transition: all 0.2s ease;
        border-radius: 9999px;
        padding: 0.25rem 0.75rem;
        display: inline-block;
        white-space: nowrap;
      }

      /* 白天模式文字颜色 */
      .menu-custom .menu-link,
      .menu-custom .absolute ul li a {
        color: #2563EB !important;
        background-color: transparent !important;
      }
      /* 白天悬停药丸效果 */
      .menu-custom .menu-link:hover,
      .menu-custom .absolute ul li a:hover {
        color: white !important;
        background-color: #2563EB !important;
      }

      /* 暗色模式文字颜色 */
      .dark .menu-custom .menu-link,
      .dark .menu-custom .absolute ul li a {
        color: white !important;
        background-color: transparent !important;
      }
      /* 暗色悬停 */
      .dark .menu-custom .menu-link:hover,
      .dark .menu-custom .absolute ul li a:hover {
        color: #2563EB !important;
        background-color: white !important;
      }

      /* 调整右箭头（右括号）位置，避免与文字重叠 */
      .menu-custom .fa-chevron-right {
        margin-left: 0.75rem;
        position: relative;
        top: 1px;
      }
      /* 针对有二级菜单的项，让箭头和文字保持间距，同时二级菜单出现时箭头旋转（由原有JS处理）不影响布局 */
      .menu-custom .relative .fa-chevron-right {
        margin-left: 0.5rem;
      }

      /* 二级菜单容器：清除背景，同时调整位置避免与菜单文字重叠（因为整体菜单左移2rem） */
      .menu-custom .glassmorphism,
      .menu-custom .absolute,
      .menu-custom ul,
      .menu-custom .absolute ul {
        background: transparent !important;
        backdrop-filter: none !important;
        box-shadow: none !important;
        border: none !important;
      }
      /* 二级菜单整体左移，适应父菜单左移后的对齐 */
      .menu-custom .absolute {
        left: 0 !important;  /* 覆盖原有的 md:left-28，使之紧贴父元素左侧，可根据需要微调 */
        transform: translateX(-0.5rem); /* 可选稍微左移，避免与文字重叠 */
      }
      /* 二级菜单项背景透明 */
      .menu-custom .absolute ul li {
        background: transparent !important;
        margin: 0;
        padding: 0;
      }
      .dark .menu-custom .absolute ul li {
        background: transparent !important;
      }
      .menu-custom .absolute ul li {
        margin-bottom: 0.25rem;
      }

      /* ========== 目录样式：行距1.5倍，目录标题字体1.2倍 ========== */
      /* 目录中每个链接（文章标题）行距1.5 */
      .catalog-item,
      .notion-table-of-contents-item {
        line-height: 1.5 !important;
      }
      /* 目录标题“目录”二字字体放大1.2倍 */
      .catalog-title,
      .fa-stream + span,
      .dark:text-white.mb-2.text-sm.font-semibold {
        font-size: 1.2em !important;
      }
      /* 确保目录容器内的所有链接行距生效 */
      .overflow-y-auto nav a {
        line-height: 1.5 !important;
      }
    `}</style>
  )
}

export { Style }
