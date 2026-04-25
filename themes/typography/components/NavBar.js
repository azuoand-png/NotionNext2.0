import { siteConfig } from '@/lib/config'
import { MenuList } from './MenuList'
import SocialButton from './SocialButton'
import SmartLink from '@/components/SmartLink'

/**
 * 菜单导航 - 终极位置死锁版
 */
export default function NavBar(props) {
  return (
    <>
      <style jsx global>{`
        /* 1. 核心：在 PC 端将边栏从布局中抽离，固定在窗口右侧 */
        @media (min-width: 768px) {
          .nav-bar-fixed-wrapper {
            position: fixed !important;
            top: 5rem;
            /* 这里的 right 值你可以根据你的格子背景微调，通常 2rem 到 5rem 比较美观 */
            right: 3rem; 
            width: 160px; /* 给一个固定宽度，确保垂直文字排版不乱 */
            z-index: 90;
          }

          /* 2. 核心：解决“遮挡”问题 */
          /* 不管左边是首页列表还是文章页，强制主内容区留出右边距 */
          #theme-typography main, 
          #theme-typography #container-inner {
            padding-right: 200px !important; 
          }
          
          /* 移除原主题可能存在的干扰偏移 */
          .md\:ml-auto {
            margin-left: 0 !important;
          }
        }
      `}</style>

      {/* PC 端显示的固定边栏 */}
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

      {/* 移动端保持默认布局（不固定），防止遮挡屏幕 */}
      <div className='md:hidden flex flex-col items-center py-4'>
        <header className='mb-4 text-[var(--primary-color)] font-bold text-2xl'>
          {siteConfig('TYPOGRAPHY_BLOG_NAME')}
        </header>
        <MenuList {...props} />
      </div>
    </>
  )
}
