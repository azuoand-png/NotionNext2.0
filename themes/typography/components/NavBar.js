import { siteConfig } from '@/lib/config'
import { MenuList } from './MenuList'
import SocialButton from './SocialButton'
import SmartLink from '@/components/SmartLink'

/**
 * 菜单导航 - 纯净版
 * 仅负责标题和菜单，不干涉页脚，通过 CSS 解决容器限制
 */
export default function NavBar(props) {
  return (
    <>
      {/* 核心修复：直接暴力破除父容器的宽度和截断限制 */}
      <style jsx global>{`
        /* 1. 扩大主容器的最大宽度，从 7xl(1280px) 扩大到 95% 屏幕宽度 */
        .md\\:max-w-7xl {
          max-width: 95% !important;
        }
        /* 2. 彻底禁止截断 */
        .overflow-hidden {
          overflow: visible !important;
        }
        /* 3. 修正侧边栏与右边缘的距离 */
        .sticky.md\\:ml-auto {
          margin-right: 2rem; /* 调整这个数值可以控制靠右的间距 */
        }
      `}</style>

      {/* 侧边栏主体：去掉所有 translate 平移，靠 CSS margin 自然定位 */}
      <div className='flex flex-col justify-between md:mt-20 md:h-fit min-w-max'>
        
        <div className='flex flex-col'>
          {/* 站点标题 */}
          <header className='w-fit self-center md:self-start md:pb-8 md:border-l-2 dark:md:border-white dark:text-white md:border-[var(--primary-color)] text-[var(--primary-color)] md:[writing-mode:vertical-lr] px-4 hover:bg-[var(--primary-color)] dark:hover:bg-white hover:text-white dark:hover:text-[var(--primary-color)] ease-in-out duration-700 md:hover:pt-4 md:hover:pb-4 mb-2'>
            <SmartLink href='/'>
              <div className='flex flex-col-reverse md:flex-col items-center md:items-start'>
                <div className='font-bold text-4xl text-center' id='blog-name'>
                  {siteConfig('TYPOGRAPHY_BLOG_NAME')}
                </div>
                <div className='font-bold text-xl text-center' id='blog-name-en'>
                  {siteConfig('TYPOGRAPHY_BLOG_NAME_EN')}
                </div>
              </div>
            </SmartLink>
          </header>

          {/* 导航菜单 */}
          <nav className='md:pt-0 z-20 flex-shrink-0'>
            <div id='nav-bar-inner' className='text-sm md:text-md'>
              <MenuList {...props} />
            </div>
            <SocialButton />
          </nav>
        </div>

        {/* 这里删除了所有手动添加的 footer 代码，系统会自动显示带黑暗模式的原生页脚 */}
      </div>
    </>
  )
}
