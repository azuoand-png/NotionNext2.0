import { siteConfig } from '@/lib/config'
import { MenuList } from './MenuList'
import SocialButton from './SocialButton'
import SmartLink from '@/components/SmartLink'

export default function NavBar(props) {
  return (
    // 改为左对齐：items-start
    <div className="fixed right-4 top-24 z-30 hidden md:block">
      <div className="flex flex-col items-start">
        <header className="w-fit self-start md:pb-8 md:border-l-2 dark:md:border-white dark:text-white md:border-[var(--primary-color)] text-[var(--primary-color)] md:[writing-mode:vertical-lr] px-4 hover:bg-[var(--primary-color)] dark:hover:bg-white hover:text-white dark:hover:text-[var(--primary-color)] ease-in-out duration-700 md:hover:pt-4 md:hover:pb-4 mb-2">
          <SmartLink href='/'>
            <div className="flex flex-col items-start">
              <div className="font-bold text-4xl text-center" id="blog-name">
                {siteConfig('TYPOGRAPHY_BLOG_NAME')}
              </div>
              <div className="font-bold text-xl text-center" id="blog-name-en">
                {siteConfig('TYPOGRAPHY_BLOG_NAME_EN')}
              </div>
            </div>
          </SmartLink>
        </header>

        <nav className="md:pt-4 z-20 flex-shrink-0 w-full">
          {/* 文本改为左对齐 */}
          <div id="nav-bar-inner" className="text-sm md:text-md text-left">
            <MenuList {...props} />
          </div>
          <div className="mt-4 flex justify-start">
            <SocialButton />
          </div>
        </nav>
      </div>
    </div>
  )
}
