import { siteConfig } from '@/lib/config'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSimpleGlobal } from '..'
import { MenuList } from './MenuList'
import SocialButton from './SocialButton'
import SmartLink from '@/components/SmartLink'

/**
 * 菜单导航 - 优化版
 * 解决了文字截断、右侧对齐以及页脚重复问题
 */
export default function NavBar(props) {
  return (
    <>
      {/* 1. 核心修复：强制取消父容器的溢出隐藏，防止文字被截断 */}
      <style jsx global>{`
        #container-inner, 
        .overflow-hidden {
          overflow: visible !important;
        }
        /* 隐藏掉布局文件中可能自带的旧页脚（如果它在侧边栏容器内） */
        .sticky > footer {
          display: none !important;
        }
      `}</style>

      {/* 2. 容器调整：
          md:ml-auto: 确保容器在右侧。
          md:pr-10: 增加右边距，防止文字紧贴屏幕边缘。
          w-48: 给侧边栏一个固定宽度，防止它忽宽忽窄。
      */}
      <div className='flex flex-col justify-between md:mt-20 md:h-[70vh] md:ml-auto md:pr-10 w-48 min-w-max'>
        
        <div className='flex flex-col'>
          {/* 标题部分 */}
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

          {/* 菜单部分 */}
          <nav className='md:pt-0 z-20 flex-shrink-0'>
            <div id='nav-bar-inner' className='text-sm md:text-md'>
              <MenuList {...props} />
            </div>
            <SocialButton />
          </nav>
        </div>

        {/* 3. 唯一的页脚：统一格式，且只显示在侧边栏底部 */}
        <footer className='hidden md:block flex-shrink-0 mt-8'>
          <div className="font-bold text-[var(--primary-color)] dark:text-white py-6 text-sm flex flex-col gap-1 items-start border-t border-gray-100 dark:border-gray-800 pt-4">
            <div>©{new Date().getFullYear()} {siteConfig('AUTHOR')}</div>
            <div className="text-[10px] opacity-50 uppercase tracking-tighter">All rights reserved.</div>
          </div>
        </footer>

      </div>
    </>
  )
}
