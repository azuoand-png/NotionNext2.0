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
      /* 底色 */
      .dark body {
        background-color: rgb(35, 34, 34);
      }
      /* 文本不可选取 */
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

      /* ========== 强制布局覆盖（解决边距和右侧栏位置） ========== */
      /* 1. 文章内容区左右内边距归零 */
      #container-inner {
        padding-left: 0 !important;
        padding-right: 0 !important;
      }

      /* 2. 右侧边栏紧贴顶部 */
      .sticky {
        top: 0 !important;
      }

      /* 3. 右侧边栏内部紫色虚线区域高度归零 */
      .flex.flex-col.justify-between.md\:mt-20 {
        margin-top: 0 !important;
      }

      /* 4. 右侧边栏向右移动 6rem（96px），增大间距 */
      .hidden.md\:flex.md\:flex-col.md\:flex-shrink-0.md\:h-\[100vh\].sticky {
        margin-left: 6rem !important;
      }
    `}</style>
  )
}

export { Style }
