import DarkModeButton from '@/components/DarkModeButton'
import { siteConfig } from '@/lib/config'

export default function Footer(props) {
  return (
    <footer>
      <style jsx global>{`
        .fixed-dark-button {
          position: fixed !important;
          top: 3.0rem;
          right: 1.5rem;
          z-index: 100;
          cursor: pointer;
          background: transparent;
        }
        .fixed-dark-button svg {
          width: 1.4rem;
          height: 1.4rem;
        }
        /* 右下角统计样式 */
        .fixed-stats {
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
          z-index: 99;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(4px);
          padding: 0.3rem 0.8rem;
          border-radius: 2rem;
          font-size: 0.75rem;
          color: white;
          display: flex;
          gap: 0.8rem;
          align-items: center;
          pointer-events: none;
        }
        .fixed-stats i {
          margin-right: 0.2rem;
        }
        .fixed-stats span {
          display: inline-flex;
          align-items: center;
        }
      `}</style>

      {/* 黑暗模式按钮 */}
      <div className="fixed-dark-button">
        <DarkModeButton />
      </div>

      {/* 右下角固定统计 */}
      <div className="fixed-stats">
        <span className="busuanzi_container_site_pv" style={{ display: 'none' }}>
          <i className="fas fa-eye"></i>
          <span className="busuanzi_value_site_pv">0</span> 访问
        </span>
        <span className="busuanzi_container_site_uv" style={{ display: 'none' }}>
          <i className="fas fa-users"></i>
          <span className="busuanzi_value_site_uv">0</span> 访客
        </span>
      </div>
    </footer>
  )
}
