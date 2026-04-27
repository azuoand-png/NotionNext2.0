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
      /* 抱鸭将军样式：黑体，字间距0.5rem，大小缩小0.9倍 */
      #theme-typography #blog-name-en {
        font-family: 'SimHei', 'Hei', 'Microsoft YaHei', '黑体', sans-serif;
        letter-spacing: 0.5rem;
        font-size: 1.125rem; /* 原 text-xl 1.25rem * 0.9 */
        color: #2D519C;
        transition: color 0.2s ease;
      }
      .dark #theme-typography #blog-name-en {
        color: #ffffff;
      }
      /* 悬停时颜色互换：白天变白，暗色变 #2D519C */
      #theme-typography header:hover #blog-name-en {
        color: #ffffff !important;
      }
      .dark #theme-typography header:hover #blog-name-en {
        color: #2D519C !important;
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

      /* 文章正文自然舒展 */
      #article-wrapper .notion {
        max-width: none !important;
        width: 100% !important;
        padding: 0 !important;
      }
      .notion-page,
      .notion-viewport {
        width: 100% !important;
        max-width: 100% !important;
      }
      .notion-table,
      .notion-image,
      .notion-asset-wrapper {
        max-width: 100% !important;
        overflow-x: auto;
      }

      /* ========== 修改：正文所有文本样式（两端对齐 + 行距1.5倍，排除标题） ========== */
      #article-wrapper .notion-page *:not(.notion-h1):not(.notion-h2):not(.notion-h3):not(.notion-h4) {
        line-height: 1.5 !important;
        text-align: justify !important;
      }
      /* 表格内文字单独恢复行距1.4倍，同时保留两端对齐 */
      #article-wrapper .notion-page .notion-table *,
      #article-wrapper .notion-page .notion-simple-table * {
        line-height: 1.4 !important;
        text-align: justify !important;
      }
      /* 标题保持左对齐，不两端对齐 */
      #article-wrapper .notion-page .notion-h1,
      #article-wrapper .notion-page .notion-h2,
      #article-wrapper .notion-page .notion-h3,
      #article-wrapper .notion-page .notion-h4 {
        text-align: left !important;
        line-height: 1.2 !important;
      }

      /* 去掉二级菜单容器的背景、边框、阴影（保留子项的悬停样式） */
      .menu-item .absolute.glassmorphism,
      .menu-item ul.absolute {
        background: transparent !important;
        backdrop-filter: none !important;
        border: none !important;
        box-shadow: none !important;
        background-color: transparent !important;
      }
    `}</style>
  )
}

export { Style }
