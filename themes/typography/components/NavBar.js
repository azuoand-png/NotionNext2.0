import { siteConfig } from '@/lib/config'
import { MenuList } from './MenuList'
import SocialButton from './SocialButton'
import SmartLink from '@/components/SmartLink'

export default function NavBar(props) {
  return (
    // 移除内部可能的多余 padding，整体紧贴右侧
    <div className='flex flex-col items-end'>
      <header className='w-fit self-end md:pb-8 md:border-l-2 dark:md:border-white dark:text-white md:border-[var(--primary-color)] text-[var(--primary-color)] md:[writing-mode:vertical-lr] px-4 hover:bg-[var(--primary-color)] dark:hover:bg-white hover:text-white dark:hover:text-[var(--primary-color)] ease-in-out duration-700 md:hover:pt-4 md:hover:pb-4 mb-2'>
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
      <nav className='md:pt-4 z-20 flex-shrink-0 w-full'>
        <div id='nav-bar-inner' className='text-sm md:text-md text-right'>
          <MenuList {...props} />
        </div>
        <div className='mt-4 flex justify-end'>
          <SocialButton />
        </div>
      </nav>
    </div>
  )
}
