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
        if (bbox.top - 80 < 0) {
          currentSectionId = section.getAttribute('data-id')
        } else { break }
      }
      if (!currentSectionId && sections.length > 0) currentSectionId = sections[0].getAttribute('data-id')
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
    return () => content?.removeEventListener('scroll', actionSectionScrollSpy)
  }, [post, activeSection])

  if (!post || !post?.toc || post?.toc?.length < 1) return null

  return (
    <div key={post?.id} className='relative'>
      <style jsx global>{`
        /* 关键：只在包含 #article-wrapper（即文章页）时才执行以下样式 */
        @media (min-width: 1024px) {
          /* 1. 针对文章页容器的精准平移 */
          #article-wrapper {
            padding-left: 280px !important; /* 避开左侧目录 */
            padding-right: 0 !important;   /* 吞掉绿色截断区 */
            margin-left: 0 !important;    /* 靠左对齐 */
            margin-right: 0 !important;
            max-width: none !important;   /* 解除宽度限制 */
            width: auto !important;
          }

          /* 2. 这里的选择器利用层级关系，强行拉宽正文，同时不影响首页卡片 */
          #theme-typography #article-wrapper #notion-article {
            width: calc(100vw - 480px) !important; /* 屏宽 - 目录 - 侧边栏 */
            max-width: none !important;
            margin-left: 0 !important;
          }

          /* 3. 让 Notion 内部表格能够撑满 */
          .notion-viewport, .notion-page {
            width: 100% !important;
            max-width: 100% !important;
            padding-left: 0 !important;
            padding-right: 20px !important;
          }

          /* 4. 目录本身的定位保持不动 */
          .custom-toc-fixed-side {
            position: fixed !important;
            left: 20px !important;
            top: 180px !important;
            width: 240px !important;
            z-index: 100;
          }
        }
      `}</style>

      {/* 目录 UI 部分 */}
      <div className='custom-toc-fixed-side hidden lg:block'>
        <div className='px-2'>
          <div className='dark:text-white mb-2 text-sm font-bold flex items-center opacity-70'>
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
                    className={`block border-l-2 -ml-[1px] pl-3 py-1.5 transition-all duration-200 no-underline ${
                      isActive ? 'border-amber-500 text-amber-600 font-semibold bg-amber-50/30' : 'border-transparent text-gray-500'
                    }`}
                    style={{ marginLeft: (tocItem.indentLevel || 0) * 12 }}
                  >
                    <span className='truncate inline-block max-w-full'>{tocItem.text}</span>
                  </a>
                )
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Catalog
