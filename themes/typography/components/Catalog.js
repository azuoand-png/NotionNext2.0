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
        @media (min-width: 1024px) {
          /* 1. 强制目录父级容器放行，不裁剪固定定位的子元素 */
          #theme-typography .md\:w-64 {
            width: 0 !important; /* 宽度设为0，把空间还给正文 */
            margin-right: 0 !important;
            overflow: visible !important;
          }

          /* 2. 目录主体：钉在屏幕左侧 */
          .custom-toc-fixed {
            position: fixed !important;
            left: 20px;
            top: 150px;
            width: 200px;
            z-index: 100;
          }
          
          /* 3. 正文区域：横向扩容 */
          #article-wrapper .flex-1 {
            max-width: 85vw !important; /* 占据视口85%的宽度 */
            margin: 0 auto !important;
          }
        }
      `}</style>

      <div className='custom-toc-fixed hidden lg:block'>
        <div className='dark:text-white mb-2 text-sm font-semibold flex items-center'>
          <i className='mr-1 fas fa-stream' /> {locale.COMMON.TABLE_OF_CONTENTS || '目录'}
        </div>
        <div className='overflow-y-auto max-h-[calc(100vh-300px)] scroll-hidden' ref={tRef}>
          <nav className='text-sm space-y-1'>
            {post?.toc?.map(tocItem => {
              const id = uuidToId(tocItem.id)
              const isActive = activeSection === id
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`
                    block border-l-2 pl-3 py-1 transition-all duration-200 no-underline
                    ${isActive
                      ? 'border-amber-500 text-amber-600 dark:text-amber-400 font-semibold'
                      : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
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
