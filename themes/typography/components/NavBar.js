import { siteConfig } from '@/lib/config'
import { MenuList } from './MenuList'
import SocialButton from './SocialButton'
import SmartLink from '@/components/SmartLink'

// 卡片1：固定右上角的博客名称（磕学英语 / 抱鸭将军）
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

// 卡片2：右侧菜单（用于首页，位于 NameCard 下方）
export function MenuCardRight(props) {
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

// 卡片3：左侧菜单（用于文章页，位于目录下方，随目录滚动，不会重叠）
export function MenuCardLeft(props) {
  return (
    <div className="mt-8 w-full">
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

// 默认导出（避免其他文件引用报错）
export default function NavBar() {
  return null
}
