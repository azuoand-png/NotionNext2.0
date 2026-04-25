import { siteConfig } from '@/lib/config'
import { MenuList } from './MenuList'
import SocialButton from './SocialButton'
import SmartLink from '@/components/SmartLink'

/**
 * 菜单导航 - 绝对位置锁定版
 */
export default function NavBar(props) {
  return (
    <>
      <style jsx global>{`
        /* 仅在电脑端生效的强制定位 */
        @media (min-width: 768px) {
          .pc-fixed-sidebar {
            position: fixed !important;
            /* 这里控制离右边的距离，调整为 4rem 确保它在格子背景内看起来更协调 */
            right: 4rem !important; 
            top: 5rem !important;
            width: fit-content !important;
            z-index: 90 !important;
            /* 移除可能导致偏移的边距 */
            margin: 0 !important;
            height: auto !important;
          }
          
          /* 核心：防止文章内容和这个固定的边栏重叠 */
          #theme-typography #container-inner {
             padding-right: 220px !important;
          }
        }
      `}</style>

      {/* PC端显示的固定边栏 */}
      <div className='pc-fixed-sidebar hidden md:flex flex-col justify-between'>
        <div className='flex flex-col'>
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

          <nav className='md:pt-0 z-20 flex-shrink-0'>
            <div id='nav-bar-inner' className='text-sm md:text-md'>
              <MenuList {...props} />
            </div>
            <SocialButton />
          </nav>
        </div>
      </div>

      {/* 移动端保留原样，不使用固定定位，防止手机遮挡内容 */}
      <div className='md:hidden flex flex-col items-center pb-8'>
         <header className='w-fit px-4 mb-4 text-[var(--primary-color)]'>
            <SmartLink href='/'>
               <div className='flex flex-col items-center'>
                  <div className='font-bold text-3xl'>{siteConfig('TYPOGRAPHY_BLOG_NAME')}</div>
               </div>
            </SmartLink>
         </header>
         <MenuList {...props} />
      </div>
    </>
  )
}
