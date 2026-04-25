<style jsx global>{`
        @media (min-width: 1024px) {
          /* 1. 目录父容器：设为0宽度，防止干扰点击 */
          #theme-typography .md\:w-64 {
            width: 0 !important;
            margin-right: 0 !important;
            overflow: visible !important;
          }

          /* 2. 目录主体：贴左固定 */
          .custom-toc-fixed {
            position: fixed !important;
            left: 20px; /* 距离左边缘20px */
            top: 150px;
            width: 200px;
            z-index: 100;
          }
          
          /* 3. 正文区域逻辑：
             关键：通过 padding 留出左右空间，避开目录和信息卡 
          */
          #article-wrapper .flex-1.xl\:max-w-4xl,
          #article-wrapper .2xl\:max-w-6xl {
            max-width: 95vw !important; /* 扩大容器到视口 95% */
            width: 100% !important;
            margin: 0 auto !important;
            /* 重点：padding-left 略大于目录宽度(200)，padding-right 略大于右侧卡片宽度(160) */
            padding-left: 240px !important; 
            padding-right: 200px !important;
            flex: none !important;
          }

          /* 如果是首页或列表页，恢复正常间距，不应用上面的 padding */
          #posts-wrapper {
             padding-left: 0 !important;
             padding-right: 0 !important;
          }
        }

        /* 针对小屏幕，保持默认布局 */
        @media (max-width: 1023px) {
          .custom-toc-fixed {
            display: none;
          }
        }
      `}</style>
