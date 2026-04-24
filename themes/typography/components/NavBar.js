import { siteConfig } from '@/lib/config'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSimpleGlobal } from '..'
import { MenuList } from './MenuList'
import SocialButton from './SocialButton'
import SmartLink from '@/components/SmartLink'

/**
 * 菜单导航
 * @param {*} props
 * @returns
 */
export default function NavBar(props) {
  return (
    // 外层容器：高度自适应，顶部外边距缩小，使菜单上移
    <div className='flex flex-col justify-between md:mt-8 md:h-auto'>
      {/* 标题区域：整体向右移动留出边距，并设为相对定位容器 */}
      <header className='relative w-fit self-center md:self-start md:pb-8 md:border-l-2 dark:md:border-white dark:text-white md:border-[var(--primary-color)] text-[var(--primary-color)] md:[writing-mode:vertical-lr] px-4 hover:bg-[var(--primary-color)] dark:hover:bg-white hover:text-white dark:hover:text-[var(--primary-color)] ease-in-out duration-700 md:hover:pt-4 md:hover:pb-4 mb-2 md:ml-8'>
        <SmartLink href='/'>
          <div className='flex flex-col-reverse md:flex-col items-center md:items-start'>
            <div className='font-bold text-4xl text-center' id='blog-name'>
              {siteConfig('TYPOGRAPHY_BLOG_NAME')}
            </div>
            {/* 英文名：使用绝对定位，使其位于竖线左侧（相对于 header） */}
            <div
              className='font-bold text-xl text-center absolute left-0 md:left-[-2rem] top-full md:top-auto md:bottom-auto'
              style={{ writingMode: 'horizontal-tb' }}
              id='blog-name-en'
            >
              {siteConfig('TYPOGRAPHY_BLOG_NAME_EN')}
            </div>
          </div>
        </SmartLink>
      </header>
      {/* 菜单容器：添加自定义类，便于全局样式控制 */}
      <nav className='md:pt-0 z-20 flex-shrink-0 menu-custom'>
        <div id='nav-bar-inner' className='text-sm md:text-md'>
          <MenuList {...props} />
        </div>
        <SocialButton />
      </nav>
    </div>
  )
}
