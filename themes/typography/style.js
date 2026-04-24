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

      /* ========== 新增：强制覆盖布局边距和位置 ========== */
      /* 1. 文章内容区左右内边距改为 0.25rem (约4px)，显著收窄 */
      #container-inner {
        padding-left: 0.25rem !important;
        padding-right: 0.25rem !important;
      }

      /* 2. 右侧边栏顶部距离从 5rem 改为 3rem */
      .sticky.top-20 {
        top: 3rem !important;
      }

      /* 3. 右侧边栏内部容器的顶部外边距从 5rem 改为 2.5rem（紫色虚线高度减半） */
      .flex.flex-col.justify-between.md\:mt-20 {
        margin-top: 2.5rem !important;
      }

      /* 4. 桌面端媒体查询确保生效 */
      @media (min-width: 768px) {
        #container-inner {
          padding-left: 0.25rem !important;
          padding-right: 0.25rem !important;
        }
        .sticky.top-20 {
          top: 3rem !important;
        }
        .flex.flex-col.justify-between.md\:mt-20 {
          margin-top: 2.5rem !important;
        }
      }
    `}</style>
  )
}

export { Style }
