import { siteConfig } from '@/lib/config'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSimpleGlobal } from '..'
import { MenuList } from './MenuList'
import SocialButton from './SocialButton'
import SmartLink from '@/components/SmartLink'

export default function NavBar(props) {
  return (
    <div className='flex flex-col justify-between md:mt-8 md:h-auto'>
      {/* 标题区域：整体缩放0.7倍，保持位置 */}
      <header className='relative w-fit self-center md:self-start md:pb-8 md:border-l-2 dark:md:border-white dark:text-white md:border-[var(--primary-color)] text-[var(--primary-color)] md:[writing-mode:vertical-lr] px-4 hover:bg-[var(--primary-color)] dark:hover:bg-white hover:text-white dark:hover:text-[var(--primary-color)] ease-in-out duration-700 md:hover:pt-4 md:hover:pb-4 mb-2 md:ml-8' style={{ transform: 'scale(0.7)', transformOrigin: 'left top' }}>
        <SmartLink href='/'>
          <div className='flex flex-col-reverse md:flex-col items-center md:items-start'>
            <div className='font-bold text-4xl text-center' id='blog-name'>
              {siteConfig('TYPOGRAPHY_BLOG_NAME')}
            </div>
            {/* 英文名单独控制颜色：暗红色，暗色模式白色，悬停不变色 */}
            <div
              className='font-bold text-xl text-center absolute'
              style={{
                writingMode: 'vertical-lr',
                left: '-2rem',
                top: '0',
                bottom: 'auto',
                color: '#B22222' // 暗红色（火砖色）
              }}
              id='blog-name-en'
            >
              {siteConfig('TYPOGRAPHY_BLOG_NAME_EN')}
            </div>
          </div>
        </SmartLink>
      </header>
      {/* 菜单整体向左移动 2rem（-ml-8） */}
      <nav className='md:pt-0 z-20 flex-shrink-0 menu-custom md:-ml-8'>
        <div id='nav-bar-inner' className='text-sm md:text-md'>
          <MenuList {...props} />
        </div>
        <SocialButton />
      </nav>
    </div>
  )
}
