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
      {/* 这里的 style 标签是原生 CSS，专门针对电脑端 (min-width: 768px) 生效 */}
      <style jsx>{`
        .custom-navbar-container {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        @media (min-width: 768px) {
          .custom-navbar-container {
            margin-top: 5rem;
            height: 70vh;
            margin-right: -150px; /* 控制向右移动的距离，-150px 不够就改 -180px */
            padding-left: 15rem;  /* 控制与文章区的间隔，15rem */
          }
        }
      `}</style>

      <div className='custom-navbar-container'>
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
    </>
  )
}
