import { siteConfig } from '@/lib/config'
import { MenuList } from './MenuList'
import SocialButton from './SocialButton'
import SmartLink from '@/components/SmartLink'

/**
 * 菜单导航 - 绝对固定版
 * 无论首页还是文章页，位置永远锁定在屏幕右侧固定距离
 */
export default function NavBar(props) {
  return (
    <>
      <style jsx global>{`
        /* 1. 核心修复：锁死边栏位置 */
        .fixed-sidebar-container {
          position: fixed !important;
          /* 这里的 2rem 决定了它距离屏幕最右侧的距离，你可以根据需要调整 */
          right: 2rem; 
          top: 5rem;
          width: fit-content;
          z-index: 100;
        }

        /* 2. 核心修复：防止内容区被边栏遮挡 */
        /* 在大屏幕下，给主容器增加右侧内边距，确保文章内容不会钻到菜单下面 */
        @media (min-width: 768px) {
          #theme-typography #container-inner,
          #theme-typography .flex-1 {
            padding-right: 180px !important; 
          }
        }

        /* 3. 彻底取消父容器对它的限制 */
        .overflow-hidden {
          overflow: visible !important;
        }
      `}</style>

      {/* 将原有的 div 加上 fixed-sidebar-container 类名 */}
      <div className='fixed-sidebar-container flex flex-col justify-between md:h-[70vh]'>
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
      </div>
    </>
  )
}
