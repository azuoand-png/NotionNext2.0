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
        @media (min-width: 1024px) {
          /* 1. 修正父级 Flex 布局：防止正文被侧边栏挤压 */
          #theme-typography .flex.flex-col.md\:flex-row {
            display: block !important; /* 强制改为块级，打破挤压 */
            position: relative;
          }

          /* 2. 目录定位：强制移出原有的占位栏，钉在最左侧 */
          .custom-toc-wrapper {
            position: fixed !important;
            left: 20px !important;
            top: 180px !important;
            width: 200px !important;
            height: fit-content;
            z-index: 90;
          }

          /* 3. 正文布局：彻底拉宽并避让两侧 */
          /* 针对文章页的特定容器进行扩容 */
          #theme-typography main .flex-1.xl\:max-w-4xl,
          #theme-typography main .flex-1.2xl\:max-w-6xl {
            max-width: 98vw !important; /* 几乎填满屏幕 */
            width: 100% !important;
            margin: 0 auto !important;
            padding-left: 240px !important;  /* 给左边目录留位置 */
            padding-right: 220px !important; /* 给右边卡片留位置 */
            flex: none !important;
          }

          /* 4. 解决首页被误伤的问题：确保首页列表依然是 Grid */
          #posts-wrapper {
            display: grid !important; 
            padding: 0 !important;
            max-width: 100% !important;
          }
          
          /* 隐藏原有的左侧占位容器的边距 */
          #theme-typography .md\:w-64.md\:mr-8 {
            width: 0 !important;
            margin-right: 0 !important;
          }
        }
      `}</style>

      <div className='custom-toc-wrapper hidden lg:block'>
        <div className='px-2'>
          <div className='dark:text-white mb-2 text-sm font-bold flex items-center'>
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
                    className={`block border-l-2 pl-3 py-1 transition-all duration-200 no-underline ${
                      isActive ? 'border-amber-500 text-amber-600 font-semibold' : 'border-gray-200 text-gray-500'
                    }`}
                    style={{ marginLeft: (tocItem.indentLevel || 0) * 12 }}
                  >
                    <span className='truncate inline-block max-w-full align-middle'>{tocItem.text}</span>
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
