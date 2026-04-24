import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import { MenuList } from './MenuList'
import SocialButton from './SocialButton'

export default function NavBar(props) {
  return (
    <div className='flex flex-col justify-between md:mt-8 md:h-auto'>
      {/* 标题区域：缩放0.7倍，同时通过负下边距减少占位高度 */}
      <header
        className='relative w-fit self-center md:self-start md:pb-8 md:border-l-2 dark:md:border-white dark:text-white md:border-[var(--primary-color)] text-[var(--primary-color)] md:[writing-mode:vertical-lr] px-4 hover:bg-[var(--primary-color)] dark:hover:bg-white hover:text-white dark:hover:text-[var(--primary-color)] ease-in-out duration-700 md:hover:pt-4 md:hover:pb-4 mb-0 md:ml-8'
        style={{
          transform: 'scale(0.7)',
          transformOrigin: 'left top',
          marginBottom: '-1.5rem' // 抵消缩放后多余的下方空间
        }}
      >
        <SmartLink href='/'>
          <div className='flex flex-col-reverse md:flex-col items-center md:items-start'>
            <div className='font-bold text-4xl text-center' id='blog-name'>
              {siteConfig('TYPOGRAPHY_BLOG_NAME')}
            </div>
            <div
              className='font-bold text-xl text-center absolute'
              style={{
                writingMode: 'vertical-lr',
                left: '-2rem',
                top: '0',
                bottom: 'auto',
                color: '#B22222' // 暗红色
              }}
              id='blog-name-en'
            >
              {siteConfig('TYPOGRAPHY_BLOG_NAME_EN')}
            </div>
          </div>
        </SmartLink>
      </header>

      {/* 菜单整体左移 2rem，且紧贴标题（上边距归零） */}
      <nav className='md:pt-0 z-20 flex-shrink-0 menu-custom md:-ml-8 mt-0'>
        <div id='nav-bar-inner' className='text-sm md:text-md'>
          <MenuList {...props} />
        </div>
        <SocialButton />
      </nav>
    </div>
  )
}
