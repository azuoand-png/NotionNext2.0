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

    const content = document.querySelector('#container-inner') || window
    content.addEventListener('scroll', actionSectionScrollSpy)
    setTimeout(() => actionSectionScrollSpy(), 300)
    return () => content?.removeEventListener('scroll', actionSectionScrollSpy)
  }, [post, activeSection])

  if (!post || !post?.toc || post?.toc?.length < 1) return null

  return (
    <div key={post?.id} className='px-2'>
      <style jsx global>{`
        /* 只在桌面端生效 */
        @media (min-width: 1024px) {
          /* 1. 隐藏原本占位的左侧栏，防止它挤压正文 */
          #theme-typography .flex-col.md\:flex-row > .hidden.md\:block.md\:w-64 {
            display: none !important;
          }

          /* 2. 目录改为固定悬浮，贴左显示 */
          .custom-toc-fixed {
            position: fixed !important;
            left: 2rem;
            top: 180px; /* 避开头像标题区 */
            width: 220px;
            z-index: 50;
          }

          /* 3. 文章正文布局重置：通过 padding 留出左右护栏 */
          /* 这里精准打击文章页容器，不影响首页 posts-wrapper */
          #theme-typography .flex-col.md\:flex-row .flex-1.xl\:max-w-4xl,
          #theme-typography .flex-col.md\:flex-row .flex-1.2xl\:max-w-6xl {
            max-width: 96vw !important; /* 拉满宽度 */
            width: 100% !important;
            margin: 0 auto !important;
            padding-left: 260px !important;  /* 必须大于目录宽度+边距 */
            padding-right: 220px !important; /* 必须大于右侧卡片宽度+边距 */
            flex: none !important;
          }

          /* 4. 强制取消 Flex 挤压逻辑 */
          #theme-typography .flex-col.md\:flex-row {
            display: block !important;
          }
        }

        /* 移动端隐藏悬浮目录 */
        @media (max-width: 1023px) {
          .custom-toc-fixed {
            display: none;
          }
        }
      `}</style>

      {/* 目录主体结构 */}
      <div className='custom-toc-fixed'>
        <div className='dark:text-white mb-3 text-sm font-bold flex items-center opacity-80'>
          <i className='mr-1 fas fa-stream' /> {locale.COMMON.TABLE_OF_CONTENTS || '目录'}
        </div>
        <div className='overflow-y-auto max-h-[calc(100vh-300px)] scroll-hidden' ref={tRef}>
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
                      ? 'border-amber-500 text-amber-600 dark:text-amber-400 font-semibold bg-amber-50/30'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-amber-500 hover:bg-gray-50/50'
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
  )
}

export default Catalog
