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
      {/* 只需要添加 z-10 确保 hover 区域覆盖，其他类保持不变 */}
      <header className='relative w-fit self-center md:self-start md:pb-8 md:border-l-2 dark:md:border-white dark:text-white md:border-[var(--primary-color)] text-[var(--primary-color)] md:[writing-mode:vertical-lr] px-4 hover:bg-[var(--primary-color)] dark:hover:bg-white hover:text-white dark:hover:text-[var(--primary-color)] ease-in-out duration-700 md:hover:pt-4 md:hover:pb-4 mb-2 md:ml-8 z-10'>
        <SmartLink href='/'>
          <div className='flex flex-col-reverse md:flex-col items-center md:items-start'>
            <div className='font-bold text-4xl text-center' id='blog-name'>
              {siteConfig('TYPOGRAPHY_BLOG_NAME')}
            </div>
            {/* 给绝对定位的英文名添加 pointer-events-none，避免干扰 */}
            <div
              className='font-bold text-xl text-center absolute pointer-events-none'
              style={{
                writingMode: 'vertical-lr',
                left: '-2rem',
                top: '0',
                bottom: 'auto'
              }}
              id='blog-name-en'
            >
              {siteConfig('TYPOGRAPHY_BLOG_NAME_EN')}
            </div>
          </div>
        </SmartLink>
      </header>
      <nav className='md:pt-0 z-20 flex-shrink-0 menu-custom'>
        <div id='nav-bar-inner' className='text-sm md:text-md'>
          <MenuList {...props} />
        </div>
        <SocialButton />
      </nav>
    </div>
  )
}
