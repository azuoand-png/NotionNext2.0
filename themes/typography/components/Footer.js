import DarkModeButton from '@/components/DarkModeButton'
import { siteConfig } from '@/lib/config'

/**
 * 页脚与黑暗模式按钮自定义
 */
export default function Footer(props) {
  const d = new Date()
  const currentYear = d.getFullYear()
  const since = siteConfig('SINCE')
  const copyrightDate =
    parseInt(since) < currentYear ? since + '-' + currentYear : currentYear

  return (
    <footer className="z-50">
      <style jsx global>{`
        /* 黑暗模式按钮固定在右上角 */
        .fixed-dark-button {
          position: fixed !important;
          top: 2.2rem;
          right: 1.5rem;
          z-index: 100;
          cursor: pointer;
          background: transparent;
        }
        .fixed-dark-button svg {
          width: 1.4rem;
          height: 1.4rem;
        }
        /* 底部统计样式 */
        .site-stats {
          text-align: center;
          font-size: 0.8rem;
          color: var(--primary-color);
          opacity: 0.7;
          padding: 1rem 0;
        }
      `}</style>

      {/* 黑暗模式按钮 */}
      <div className="fixed-dark-button">
        <DarkModeButton />
      </div>

      {/* 站点统计：总访问量 + 总访客数（仅在不蒜子加载后显示） */}
      <div className="site-stats">
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="busuanzi_container_site_pv" style={{ display: 'none' }}>
            <i className="fas fa-eye"></i>
            <span className="px-1 busuanzi_value_site_pv">0</span> 次访问
          </span>
          <span className="busuanzi_container_site_uv" style={{ display: 'none' }}>
            <i className="fas fa-users"></i>
            <span className="px-1 busuanzi_value_site_uv">0</span> 位访客
          </span>
        </span>
      </div>
    </footer>
  )
}
