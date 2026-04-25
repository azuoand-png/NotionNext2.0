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
    /* md:-mr-[120px]: 整体往右挪，120px 大约就是你想要的额外 1 厘米
      md:pl-[3rem]: 这里的 3rem 极大地缩小了中间的空白间距（之前是 15rem，太夸张了）
    */
    <div className='flex flex-col justify-between md:mt-20 md:h-[70vh] md:-mr-[120px] md:pl-[3rem]'>
      
      {/* 上半部分：Logo 和 菜单 */}
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

      {/* 下半部分：页脚 Footer (现在它就在这个往右移的容器里，所以会完美对齐) */}
      <footer className='hidden md:block flex-shrink-0'>
        <div className="font-bold text-[var(--primary-color)] dark:text-white py-6 text-sm flex flex-col gap-1 items-start border-t border-gray-100 dark:border-gray-800 pt-4">
          <div>©{new Date().getFullYear()} {siteConfig('AUTHOR')}</div>
          <div className="text-[10px] opacity-50 uppercase tracking-tighter">All rights reserved.</div>
        </div>
      </footer>

    </div>
  )
}
