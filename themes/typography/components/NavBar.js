import { siteConfig } from '@/lib/config'
import { MenuList } from './MenuList'
import SocialButton from './SocialButton'
import SmartLink from '@/components/SmartLink'

// 卡片1：博客名称（磕学英语 / 抱鸭将军）
export function NameCard() {
  return (
    <div className="fixed right-6 top-24 z-30 hidden md:block">
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
    </div>
  )
}

// 卡片2：菜单 + 社交按钮
export function MenuCard(props) {
  return (
    <div className="fixed right-6 top-48 z-30 hidden md:block">
      <nav className="md:pt-4 z-20 flex-shrink-0 w-full">
        <div id="nav-bar-inner" className="text-sm md:text-md text-left">
          <MenuList {...props} />
        </div>
        <div className="mt-4 flex justify-start">
          <SocialButton />
        </div>
      </nav>
    </div>
  )
}

// 保留默认导出以防其他引用（实际不使用）
export default function NavBar() {
  return null
}
