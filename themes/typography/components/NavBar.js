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
    /* 1. md:-mr-[140px]: 将整个右侧区域（含导航和页脚）整体再向右移动约 1 厘米。
      2. md:pl-[6rem]: 缩小中间间距，现在设定为 6rem（约 96px），比之前窄了一半多。
    */
    <div className='flex flex-col justify-between md:mt-20 md:h-[70vh] md:-mr-[140px] md:pl-[6rem]'>
      <div className='flex flex-col'>
        <header className='w-fit self-center md:self-start md:pb-8 md:border-l-2 dark:md:border-white dark:text-white md:border-[var(--primary-color)] text-[var(--primary-color)] md:[writing-mode:vertical-lr] px-4 hover:bg-[var(--primary-color)] dark:hover:bg-white hover:text-white dark:hover:text-[var(--primary-color)] ease-in-out duration-700 md:hover:pt-4 md:hover:pb-4 mb-2'>
          <SmartLink href='/'>
            <div className='flex flex-col-reverse md:flex-col items-center md:items-start'>
              <div className='font-bold text-4xl text-center' id='blog-name'>
                {siteConfig('TYPOGRAPHY_BLOG_NAME')}
              </div>
              <div className='font-bold text-xl text-center' id='blog-name-en'>
                {siteConfig('TYPOGRAPHY_BLOG_NAME_EN')}
              </div>
            </div>
          </SmartLink>
        </header>
        <nav className='md:pt-0 z-20 flex-shrink-0'>
          <div id='nav-bar-inner' className='text-sm md:text-md'>
            <MenuList {...props} />
          </div>
          <SocialButton />
        </nav>
      </div>

      {/* 将 Footer 移入这个容器内，确保它跟着导航一起平移 */}
      <footer className='hidden md:block'>
        <div className="pt-4 flex justify-center md:justify-start dark:text-gray-200 text-gray-800">
           {/* 这里可以放你的 dark mode 按钮或其他内容 */}
        </div>
        <div className="font-bold text-[var(--primary-color)] dark:text-white py-6 text-sm flex flex-col gap-2 items-start">
          <div>©{new Date().getFullYear()} {siteConfig('AUTHOR')}.</div>
          <div>All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}
