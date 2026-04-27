import DarkModeButton from '@/components/DarkModeButton'
import { siteConfig } from '@/lib/config'

export default function Footer(props) {
  const chars = ['抱', '鸭', '将', '军']

  return (
    <footer>
      <style jsx global>{`
        .fixed-dark-button {
          position: fixed !important;
          top: 3.9rem;
          right: 1.5rem;
          z-index: 100;
          cursor: pointer;
          background: transparent;
        }
        .fixed-dark-button svg {
          width: 1.4rem;
          height: 1.4rem;
        }
        .fixed-stats {
          position: fixed;
          bottom: 1rem;
          right: 0.6rem;
          z-index: 99;
          font-size: 0.75rem;
          color: #4b5563; /* gray-600 */
          display: flex;
          gap: 0.8rem;
          align-items: center;
          pointer-events: none;
        }
        .dark .fixed-stats {
          color: #e5e7eb; /* gray-200 */
        }
        .fixed-stats i {
          margin-right: 0.2rem;
        }
        .fixed-stats span {
          display: inline-flex;
          align-items: center;
        }
      `}</style>

      {/* 抱鸭将军竖排带圆的效果 */}
      <div className="fixed left-6 bottom-4 z-30 hidden md:block">
        <div className="flex flex-col items-center gap-1">
          {chars.map((ch, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center w-8 h-8 rounded-full border border-current text-inherit text-xl font-bold"
              style={{ margin: 0, lineHeight: 1 }}
            >
              {ch}
            </div>
          ))}
        </div>
      </div>

      <div className="fixed-dark-button">
        <DarkModeButton />
      </div>

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
