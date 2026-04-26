import { siteConfig } from '@/lib/config'
import { MenuList } from './MenuList'
import SocialButton from './SocialButton'
import SmartLink from '@/components/SmartLink'

export function NameCard() { ... }  // 保持不变

export function MenuCardRight(props) {
  return (
    <div className="fixed right-6 top-96 z-30 hidden md:block">
      <nav className="md:pt-4 z-20 flex-shrink-0 w-full">
        <div id="nav-bar-inner" className="text-sm md:text-md text-right">
          <MenuList {...props} menuAlign="right" />
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
          <MenuList {...props} menuAlign="left" />
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
