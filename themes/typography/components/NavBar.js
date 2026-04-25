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
    /* 1. md:-mr-[160px]: 将整个右侧区域（含文字和页脚）整体向右移动。
         数值从 -24 (96px) 增加到 -160px，大约向右多移动了 1.5 厘米。
      2. md:pl-[4rem]: 缩小中间间距。
         将原来的 pl-60 (240px) 缩小为 4rem (64px)，让文字更靠近文章区。
    */
    <div className='flex flex-col justify-between md:mt-20 md:h-[70vh] md:-mr-[160px] md:pl-[4rem]'>
      
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

      {/* 这里的 Footer 现在是外层 div 的子元素，会随之一起向右移动 */}
      <footer className='hidden md:block flex-shrink-0'>
        <div className="font-bold text-[var(--primary-color)] dark:text-white py-6 text-sm flex flex-col gap-1 items-start">
          <div>©{new Date().getFullYear()} {siteConfig('AUTHOR')}</div>
          <div className="text-[10px] opacity-50">All rights reserved.</div>
        </div>
      </footer>

    </div>
  )
}
