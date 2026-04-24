import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'
import LazyImage from '@/components/LazyImage'
import { useRouter } from 'next/router'
import { MenuList } from './MenuList'
import SocialButton from './SocialButton'

export default function NavBar(props) {
  const { siteInfo } = useGlobal()
  const router = useRouter()

  return (
    <div className='flex flex-col justify-between md:mt-8 md:h-auto'>
      {/* 名片样式头部（替代原来的竖排标题） */}
      <div className='flex flex-col items-center md:items-start px-4 mb-6'>
        {/* 头像 */}
        <div
          className='cursor-pointer'
          onClick={() => router.push('/')}
        >
          <LazyImage
            src={siteInfo?.icon}
            className='rounded-full'
            width={80}
            height={80}
            alt={siteConfig('AUTHOR')}
          />
        </div>
        {/* 作者名（暗红色，暗色模式白色） */}
        <div
          className='font-bold text-xl text-center md:text-left mt-3'
          style={{ color: '#B22222' }}
        >
          {siteConfig('AUTHOR')}
        </div>
        {/* 简介 */}
        <div className='text-sm text-center md:text-left text-gray-600 dark:text-gray-400 mt-1'>
          {siteConfig('BIO')}
        </div>
      </div>

      {/* 菜单区域（保持原有样式和左移效果） */}
      <nav className='md:pt-0 z-20 flex-shrink-0 menu-custom md:-ml-8'>
        <div id='nav-bar-inner' className='text-sm md:text-md'>
          <MenuList {...props} />
        </div>
        <SocialButton />
      </nav>
    </div>
  )
}
