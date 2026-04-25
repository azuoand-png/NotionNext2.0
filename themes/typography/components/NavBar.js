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
    <>
      {/* 核心修复：强制让父级容器不裁剪超出部分，防止文字被“截断” */}
      <style jsx global>{`
        #container-inner, .overflow-hidden {
          overflow: visible !important;
        }
      `}</style>

      {/* md:pl-8: 极大缩小中间间距（从之前的 60 改为 8）。
        md:translate-x-24: 使用平移替代负边距，这样更不容易触发截断。
        min-w-max: 确保文字在一行显示，不被挤压。
      */}
      <div className='flex flex-col justify-between md:mt-20 md:h-[70vh] md:pl-8 md:translate-x-24 min-w-max'>
        
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

        {/* Footer 放在同一个 div 里，确保它跟着一起平移 */}
        <footer className='hidden md:block flex-shrink-0'>
          <div className="font-bold text-[var(--primary-color)] dark:text-white py-6 text-sm flex flex-col gap-1 items-start">
            <div>©{new Date().getFullYear()} {siteConfig('AUTHOR')}</div>
            <div className="text-[10px] opacity-50 uppercase">All rights reserved.</div>
          </div>
        </footer>

      </div>
    </>
  )
}
