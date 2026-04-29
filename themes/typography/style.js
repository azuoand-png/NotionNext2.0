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
      /* 抱鸭将军样式 */
      #theme-typography #blog-name-en {
        font-family: 'SimHei', 'Hei', 'Microsoft YaHei', '黑体', sans-serif;
        letter-spacing: 0.5rem;
        font-size: 1.125rem;
        color: #2D519C;
        transition: color 0.2s ease;
      }
      .dark #theme-typography #blog-name-en {
        color: #ffffff;
      }
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

      #article-wrapper .notion-page *:not(.notion-h1):not(.notion-h2):not(.notion-h3):not(.notion-h4) {
        line-height: 1.5 !important;
        text-align: justify !important;
      }
      #article-wrapper .notion-page .notion-table *,
      #article-wrapper .notion-page .notion-simple-table * {
        line-height: 1.4 !important;
        text-align: justify !important;
      }
      #article-wrapper .notion-page .notion-h1,
      #article-wrapper .notion-page .notion-h2,
      #article-wrapper .notion-page .notion-h3,
      #article-wrapper .notion-page .notion-h4 {
        text-align: left !important;
        line-height: 1.2 !important;
      }

      .menu-item .absolute.glassmorphism,
      .menu-item ul.absolute {
        background: transparent !important;
        backdrop-filter: none !important;
        border: none !important;
        box-shadow: none !important;
        background-color: transparent !important;
      }

      /* ========== Cusdis 评论区样式覆盖（仅外层） ========== */
      /* 1. 隐藏原有的红色 "Cusdis" 文字，并添加新的标题 */
      .comment .mb-5 ul {
        position: relative;
        text-align: center;
      }
      .comment .mb-5 ul li {
        display: none; /* 隐藏原始标签 */
      }
      .comment .mb-5 ul::before {
        content: "欢迎评论留言";
        display: inline-block;
        font-family: 'Microsoft YaHei', '微软雅黑', sans-serif;
        font-size: 1rem;
        font-weight: bold;
        color: #215E99;
        border-bottom: 2px solid #215E99;
        padding-bottom: 0.25rem;
      }
      .dark .comment .mb-5 ul::before {
        color: #e5e7eb; /* 浅白色 */
        border-bottom-color: #e5e7eb;
      }

      /* 6. 黑暗模式下评论区域背景：移除黑色背景，恢复格子背景 */
      .dark .comment {
        background: transparent !important;
        box-shadow: none !important;
      }
      /* 确保 iframe 容器背景也透明（让网页背景透出） */
      .dark #cusdis_thread,
      .dark .comment section {
        background: transparent !important;
      }
    `}</style>
  )
}

export { Style }
