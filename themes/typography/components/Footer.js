import DarkModeButton from '@/components/DarkModeButton'
import { siteConfig } from '@/lib/config'

/**
 * 页脚与黑暗模式按钮自定义
 * 1. 移除了底部版权和 All rights reserved 文字
 * 2. 将月亮图标通过 fixed 定位到右上角
 */
export default function Footer(props) {
  // 逻辑保留，以备后续其他地方可能用到，但不再在 return 中渲染文字
  const d = new Date()
  const currentYear = d.getFullYear()
  const since = siteConfig('SINCE')
  const copyrightDate =
    parseInt(since) < currentYear ? since + '-' + currentYear : currentYear

  return (
    <footer className="z-50">
      <style jsx global>{`
        /* 强制将黑暗模式按钮固定在右上角 */
        .fixed-dark-button {
          position: fixed !important;
          top: 1.5rem;   /* 距离顶部距离 */
          right: 1.5rem; /* 距离右侧距离 */
          z-index: 100;  /* 确保在最上层 */
          cursor: pointer;
          background: transparent;
        }

        /* 如果按钮内图标太小，可以微调 */
        .fixed-dark-button svg {
           width: 1.25rem;
           height: 1.25rem;
        }
      `}</style>

      {/* 黑暗模式按钮，应用固定定位类名 */}
      <div className="fixed-dark-button">
        <DarkModeButton />
      </div>

      {/* 此处已移除原有的两行文字信息 div */}
    </footer>
  )
}
