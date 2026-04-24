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
      {/* 为 header 添加一个自定义类，便于 CSS 控制 hover 背景 */}
      <header className='relative w-fit self-center md:self-start md:pb-8 md:border-l-2 dark:md:border-white dark:text-white md:border-[var(--primary-color)] text-[var(--primary-color)] md:[writing-mode:vertical-lr] px-4 mb-2 md:ml-8 nav-header-hover'>
        <SmartLink href='/'>
          <div className='flex flex-col-reverse md:flex-col items-center md:items-start'>
            <div className='font-bold text-4xl text-center' id='blog-name'>
              {siteConfig('TYPOGRAPHY_BLOG_NAME')}
            </div>
            {/* 绝对定位，保持英文名在竖线左侧 */}
            <div
              className='font-bold text-xl text-center absolute'
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
