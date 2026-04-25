import { siteConfig } from '@/lib/config'
import { MenuList } from './MenuList'
import SocialButton from './SocialButton'
import SmartLink from '@/components/SmartLink'

/**
 * 终极布局：左右双翼固定，中间正文全开
 */
export default function NavBar(props) {
  return (
    <>
      <style jsx global>{`
        @media (min-width: 768px) {
          /* 1. 右侧导航栏：钉死在屏幕最右侧 */
          .nav-bar-fixed-wrapper {
            position: fixed !important;
            top: 5rem;
            right: 2rem; /* 靠近右边缘 */
            width: 140px; 
            z-index: 90;
          }

          /* 2. 左侧目录：钉死在屏幕最左侧 */
          /* 针对文章页里的目录容器进行强制重排 */
          #theme-typography .md\:w-64 {
            position: fixed !important;
            left: 2rem;  /* 靠近左边缘 */
            top: 5rem;
            width: 200px !important;
            z-index: 90;
            height: fit-content;
          }

          /* 3. 正文区域：极致利用中间空间 */
          /* 移除原本的最大宽度限制，让正文根据左右固定栏自动腾出的空间伸缩 */
          #theme-typography .flex-1.xl\:max-w-4xl,
          #theme-typography .2xl\:max-w-6xl {
            max-width: 1000px !important; /* 调大正文上限 */
            margin: 0 auto !important;     /* 居中 */
            padding-left: 20px;
            padding-right: 20px;
          }

          /* 4. 整体布局补偿 */
          /* 防止内容钻到固定栏下面，给左右各留出足够的安全边距 */
          #theme-typography #container-inner,
          #theme-typography main {
            padding-left: 240px !important;  /* 为左侧目录留位 */
            padding-right: 180px !important; /* 为右侧导航留位 */
          }
          
          /* 隐藏原有的边距类名干扰 */
          .md\:mr-8 { margin-right: 0 !important; }
          .md\:ml-auto { margin-left: 0 !important; }
        }

        /* 5. 表格紧凑化处理 */
        .notion-simple-table {
          line-height: 1.2 !important;
          font-size: 14px !important;
        }
        .notion-simple-table td {
          padding: 6px 10px !important;
        }
      `}</style>

      {/* PC 端固定侧边栏 */}
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

      {/* 移动端逻辑（保持简洁，不固定） */}
      <div className='md:hidden flex flex-col items-center py-4'>
        <header className='mb-4 text-[var(--primary-color)] font-bold text-2xl'>
          {siteConfig('TYPOGRAPHY_BLOG_NAME')}
        </header>
        <MenuList {...props} />
      </div>
    </>
  )
}
