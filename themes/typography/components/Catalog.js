import { useGlobal } from '@/lib/global'
import throttle from 'lodash.throttle'
import { uuidToId } from 'notion-utils'
import { useEffect, useRef, useState } from 'react'

const Catalog = ({ post }) => {
  const { locale } = useGlobal()
  const tRef = useRef(null)
  const [activeSection, setActiveSection] = useState(null)

  useEffect(() => {
    if (!post || !post?.toc || post?.toc?.length < 1) return

    const throttleMs = 100
    const actionSectionScrollSpy = throttle(() => {
      const sections = document.getElementsByClassName('notion-h')
      if (!sections || sections.length === 0) return

      let currentSectionId = null
      for (let i = 0; i < sections.length; ++i) {
        const section = sections[i]
        if (!section || !(section instanceof Element)) continue
        const bbox = section.getBoundingClientRect()
        const offset = 80
        if (bbox.top - offset < 0) {
          currentSectionId = section.getAttribute('data-id')
        } else {
          break
        }
      }
      if (!currentSectionId && sections.length > 0) {
        currentSectionId = sections[0].getAttribute('data-id')
      }

      if (currentSectionId !== activeSection) {
        setActiveSection(currentSectionId)
        const index = post?.toc?.findIndex(obj => uuidToId(obj.id) === currentSectionId)
        if (index !== -1 && tRef?.current) {
          tRef.current.scrollTo({ top: 28 * index, behavior: 'smooth' })
        }
      }
    }, throttleMs)

    // 注意：Typography主题通常是在 window 或特定的 scroll 容器滚动
    const content = document.querySelector('#container-inner') || window
    content.addEventListener('scroll', actionSectionScrollSpy)
    setTimeout(() => actionSectionScrollSpy(), 300)
    return () => content?.removeEventListener('scroll', actionSectionScrollSpy)
  }, [post, activeSection])

  if (!post || !post?.toc || post?.toc?.length < 1) return null

  return (
    <>
      {/* 注入局部样式：将原本占位的父容器隐藏，或者直接使用 fixed 覆盖 */}
      <style jsx global>{`
        @media (min-width: 1024px) {
          /* 核心：将目录容器固定在左侧边缘 */
          .toc-fixed-container {
            position: fixed !important;
            left: 1.5rem; /* 距离左边缘的距离 */
            top: 8rem;    /* 距离顶部的距离，避开页眉 */
            width: 220px; /* 目录宽度 */
            z-index: 40;
          }
          
          /* 强制让正文页原本的侧边栏栏位消失，腾出空间 */
          #theme-typography .md\:w-64.md\:mr-8 {
             display: none !important;
          }

          /* 让正文内容向左移动，填补消失的侧边栏空隙，实现“最大距离” */
          #article-wrapper .flex-1 {
             margin-left: 0 !important;
             padding-left: 0 !important;
          }
        }
      `}</style>

      <div className='toc-fixed-container hidden lg:block'>
        <div className='px-2'>
          <div className='dark:text-white mb-3 text-sm font-bold flex items-center opacity-70'>
            <i className='mr-1 fas fa-stream' /> {locale.COMMON.TABLE_OF_CONTENTS || '目录'}
          </div>
          <div className='overflow-y-auto max-h-[calc(100vh-200px)] scroll-hidden' ref={tRef}>
            <nav className='text-sm space-y-1 border-l border-gray-100 dark:border-gray-800'>
              {post?.toc?.map(tocItem => {
                const id = uuidToId(tocItem.id)
                const isActive = activeSection === id
                return (
                  <a
                    key={id}
                    href={`#${id}`}
                    className={`
                      block border-l-2 -ml-[1px] pl-3 py-1.5 transition-all duration-200 no-underline
                      ${isActive
                        ? 'border-amber-500 text-amber-600 dark:text-amber-400 font-bold bg-amber-50/50 dark:bg-amber-900/20'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-amber-500'
                      }
                    `}
                    style={{ marginLeft: (tocItem.indentLevel || 0) * 12 }}
                  >
                    <span className='truncate inline-block max-w-full align-middle'>
                      {tocItem.text}
                    </span>
                  </a>
                )
              })}
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}

export default Catalog
