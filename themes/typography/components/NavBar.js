import { siteConfig } from '@/lib/config'
import { MenuList } from './MenuList'
import SocialButton from './SocialButton'
import SmartLink from '@/components/SmartLink'

/**
 * 针对 Typography 主题深度优化的全屏正文布局
 */
export default function NavBar(props) {
  return (
    <>
      <style jsx global>{`
        @media (min-width: 768px) {
          /* 1. 强制重置最外层 flex 容器，确保不产生多余位移 */
          #theme-typography .flex.flex-col.md\:flex-row {
            display: block !important; /* 核心：取消 flex，防止正文被挤压 */
            position: relative;
          }

          /* 2. 左侧目录：钉在左边缘 */
          #theme-typography .md\:w-64 {
            position: fixed !important;
            left: 20px !important;
            top: 120px;
            width: 220px !important;
            z-index: 90;
          }

          /* 3. 右侧导航栏：钉在右边缘 */
          .nav-bar-fixed-wrapper {
            position: fixed !important;
            right: 20px !important;
            top: 80px;
            width: 150px;
            z-index: 90;
          }

          /* 4. 正文内容区：极致拉伸 */
          /* 覆盖原本的 flex-1 和 xl:max-w-4xl */
          #theme-typography .flex-1.xl\:max-w-4xl,
          #theme-typography .2xl\:max-w-6xl {
            max-width: 90% !important; /* 允许占据 90% 的宽度 */
            margin: 0 auto !important;
            padding-left: 200px !important;  /* 避开左侧固定栏 */
            padding-right: 140px !important; /* 避开右侧固定栏 */
            width: auto !important;
          }

          /* 5. 针对你提供的 HTML 结构中的 container-inner 修正 */
          #container-inner {
            overflow: visible !important; /* 防止内部滚动条导致的布局偏移 */
          }
          
          /* 移除可能导致居中偏差的 margin */
          .md\:mr-8 { margin-right: 0 !important; }
        }

        /* 6. 表格行距优化（你最关心的剧本表格） */
        .notion-simple-table {
          line-height: 1.3 !important;
          font-size: 15px !important;
        }
        .notion-simple-table td {
          padding: 8px 12px !important;
        }
      `}</style>

      {/* PC 端：右侧导航栏 */}
      <div className='nav-bar-fixed-wrapper hidden md:flex flex-col'>
        <header className='w-fit self-start md:pb-8 md:border-l-2 dark:md:border-white dark:text-white md:border-[var(--primary-color)] text-[var(--primary-color)] md:[writing-mode:vertical-lr] px-4 hover:bg-[var(--primary-color)] dark:hover:bg-white hover:text-white dark:hover:text-[var(--primary-color)] ease-in-out duration-700 md:hover:pt-4 md:hover:pb-4 mb-2'>
          <SmartLink href='/'>
            <div className='flex flex-col items-start'>
              <div className='font-bold text-4xl text-center' id='blog-name'>
                {siteConfig('TYPOGRAPHY_BLOG_NAME')}
              </div>
              <div className='font-bold text-xl text-center' id='blog-name-en'>
                {siteConfig('TYPOGRAPHY_BLOG_NAME_EN')}
              </div>
            </div>
          </SmartLink>
        </header>

        <nav className='md:pt-4 z-20 flex-shrink-0'>
          <div id='nav-bar-inner' className='text-sm md:text-md'>
            <MenuList {...props} />
          </div>
          <div className='mt-4'>
            <SocialButton />
          </div>
        </nav>
      </div>

      {/* 移动端：顶部简单排列 */}
      <div className='md:hidden flex flex-col items-center py-4'>
        <header className='mb-4 text-[var(--primary-color)] font-bold text-2xl'>
          {siteConfig('TYPOGRAPHY_BLOG_NAME')}
        </header>
        <MenuList {...props} />
      </div>
    </>
  )
}
