import { siteConfig } from '@/lib/config'
import { MenuList } from './MenuList'
import SocialButton from './SocialButton'
import SmartLink from '@/components/SmartLink'

export function NameCard() {
  const chars = ['抱', '鸭', '将', '军']

  return (
    <div className="fixed right-6 top-24 z-30 hidden md:block">
      <header className="w-fit self-start md:pb-8 md:border-l-2 dark:md:border-white dark:text-white md:border-[var(--primary-color)] text-[var(--primary-color)] px-4 hover:bg-[var(--primary-color)] dark:hover:bg-white hover:text-white dark:hover:text-[var(--primary-color)] ease-in-out duration-700 md:hover:pt-4 md:hover:pb-4 mb-2">
        <SmartLink href='/'>
          <div className="flex flex-col items-start">
            <div className="font-bold text-4xl text-center" id="blog-name">
              {siteConfig('TYPOGRAPHY_BLOG_NAME')}
            </div>
            <div className="flex flex-col items-center gap-1 mt-2">
              {chars.map((ch, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center w-7 h-7 rounded-full border border-gray-400 dark:border-gray-500 text-inherit text-sm font-bold"
                >
                  {ch}
                </div>
              ))}
            </div>
          </div>
        </SmartLink>
      </header>
    </div>
  )
}

export function MenuCardRight(props) {
  return (
    <div className="fixed right-6 top-48 z-30 hidden md:block">
      <nav className="md:pt-4 z-20 flex-shrink-0 w-full">
        <div id="nav-bar-inner" className="text-sm md:text-md text-right">
          <MenuList {...props} />
        </div>
        <div className="mt-4 flex justify-end">
          <SocialButton />
        </div>
      </nav>
    </div>
  )
}

export function MenuCardLeft(props) {
  return (
    <div className="w-full">
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

export default function NavBar() {
  return null
}
